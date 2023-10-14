export interface IArticle {
  source: {
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  isBookmarked: boolean;
}

export interface ArticlesResponse {
  status: string;
  totalResults: number;
  articles: IArticle[];
}
