import { Article } from './Article.model';

export interface SearchResult {
    query: string;
    date: number;
    articles: Article[];
}