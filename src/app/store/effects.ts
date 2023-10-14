import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArticlesActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { ArticlesService } from '../services/articles.service';

@Injectable()
export class ArticlesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly articlesService: ArticlesService
  ) {}

  getArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticlesActions.getarticles),
      switchMap(({ pageIndex }) =>
        this.articlesService.getArticles(pageIndex).pipe(
          map((res) => {
            if (res.status !== 'ok') {
              return ArticlesActions.getarticleserror({
                error: 'Error retrieving articles',
              });
            }

            return ArticlesActions.getarticlessuccess({
              articles: res.articles.map((x) => ({
                ...x,
                isBookmarked: false, // as the api does not give any bookmarking functionality
              })),
            });
          }),
          catchError((error) =>
            of(
              ArticlesActions.getarticleserror({
                error,
              })
            )
          )
        )
      )
    )
  );
}
