import { Article } from './Article.model';

export interface StoredArticles {
    id: number;
    articles: Article[];
}