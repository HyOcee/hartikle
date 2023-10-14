import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IArticle } from '../models';

export const ArticlesActions = createActionGroup({
  source: 'Articles',
  events: {
    getArticles: props<{ pageIndex: number }>(),
    getArticlesSuccess: props<{ articles: IArticle[] }>(),
    getArticlesError: props<{ error: string }>(),
    toggleBookmarkArticle: props<{ title: string }>(),
    getBookmarkedArticles: emptyProps(),
  },
});
