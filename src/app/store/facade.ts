import { Injectable } from '@angular/core';
import { ScannedActionsSubject, select, Store } from '@ngrx/store';

import * as _selectors from './selectors';
import { ArticlesActions } from './actions';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticlesFacade {
  selectArticles$ = this.store.pipe(select(_selectors.selectArticles));

  selectLoading$ = this.store.pipe(select(_selectors.selectLoading));

  isShowingBookmarked$ = this.store.pipe(
    select(_selectors.selectShowingBookmarked)
  );

  selectBookmarkedArticles$ = this.store.pipe(
    select(_selectors.selectArticles),
    map((x) => x?.filter((article) => article.isBookmarked))
  );

  constructor(
    private readonly store: Store,
    private readonly actionsListener$: ScannedActionsSubject
  ) {}

  getArticles(pageIndex: number) {
    this.store.dispatch(ArticlesActions.getarticles({ pageIndex }));
  }

  toggleBookmarkArticle(title: string) {
    this.store.dispatch(ArticlesActions.togglebookmarkarticle({ title }));
  }

  getBookmarkedArticles() {
    this.store.dispatch(ArticlesActions.getbookmarkedarticles());
  }
}
