import { Article } from './Article.model';

export interface HeadlineSearchResult {
    category: string;
    region: string;
    date: number;
    articles: Article[];
}