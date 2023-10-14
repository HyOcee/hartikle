import { createFeature, createReducer, on } from '@ngrx/store';
import { IArticle } from '../models';
import { ArticlesActions } from './actions';

export const ARTICLES_KEY = 'ARTICLES_KEY';

export interface IArticlesState {
  articles: IArticle[] | null;
  loading: boolean;
  showingBookmarked: boolean;
}

export const initialState: IArticlesState = {
  articles: null,
  loading: false,
  showingBookmarked: false,
};

export const articleFeature = createFeature({
  name: ARTICLES_KEY,
  reducer: createReducer(
    initialState,
    on(ArticlesActions.getarticles, (state, { pageIndex }) => ({
      ...state,
      loading: true,
      showingBookmarked: false,
      page: pageIndex,
    })),
    on(ArticlesActions.getarticleserror, (state) => ({
      ...state,
      loading: false,
    })),
    on(ArticlesActions.getarticlessuccess, (state, { articles }) => {
      return {
        ...state,
        loading: false,
        articles: !state.articles
          ? articles
          : (state?.articles ?? []).concat(articles),
      };
    }),
    on(ArticlesActions.getbookmarkedarticles, (state) => {
      // replace articles in the state with only those that are bookmarked
      return {
        ...state,
        loading: false,
        articles: (state.articles as IArticle[]).filter(
          (article) => article.isBookmarked
        ),
        showingBookmarked: true,
      };
    }),
    on(ArticlesActions.togglebookmarkarticle, (state, { title }) => {
      const articles = (state.articles as IArticle[]).map((article) => {
        // Find the article with the title
        if (article.title === title) {
          // Update the isBookmarked property of the found article
          return { ...article, isBookmarked: !article.isBookmarked };
        }
        // For other articles, return them unchanged
        return article;
      });

      // Return the updated state with the new articles array
      return {
        ...state,
        articles,
      };
    })
  ),
});
