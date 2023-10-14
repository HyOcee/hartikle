import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArticle } from 'src/app/models';
import { ArticlesFacade } from 'src/app/store/facade';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() article!: IArticle;

  constructor(private articlesFacade: ArticlesFacade) {}

  bookmarkArticle() {
    this.articlesFacade.toggleBookmarkArticle(this.article.title);
  }
}
