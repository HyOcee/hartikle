import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ArticlesResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getArticles(page = 1) {
    return this.http.get<ArticlesResponse>(
      `${environment.newsApi}/top-headlines`,
      {
        params: {
          apiKey: environment.apikey,
          country: 'ng',
          page,
          pageSize: 8,
        },
      }
    );
  }
}
