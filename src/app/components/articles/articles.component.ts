import { Component, OnInit } from '@angular/core';
import { IArticle } from 'src/app/models';
import { ArticlesFacade } from 'src/app/store/facade';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  articles$ = this.articlesFacade.selectArticles$;
  bookmarkedArticles$ = this.articlesFacade.selectBookmarkedArticles$;
  loading$ = this.articlesFacade.selectLoading$;
  showBookmarked = false;

  page = 1;

  constructor(private articlesFacade: ArticlesFacade) {}

  ngOnInit(): void {
    this.getArticles();
    this.articlesFacade.isShowingBookmarked$.subscribe((res) => {
      if (res) {
        this.showBookmarked = true;
      } else {
        this.showBookmarked = false;
      }
    });
  }

  getArticles() {
    this.articlesFacade.getArticles(this.page);
  }

  loadMore() {
    this.page++;
    this.getArticles();
  }

  showBookmarkedArticles() {
    this.articlesFacade.getBookmarkedArticles();
  }

  showAll() {
    // this.page = 1;
    this.getArticles();
  }
}
