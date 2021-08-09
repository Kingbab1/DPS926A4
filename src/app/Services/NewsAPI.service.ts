/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-var */
import { HttpClient } from '@angular/common/http';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { Article } from '../Models/Article.model';
import { HeadlineSearchResult } from '../Models/HeadlineSearchResult.model';
import { SearchResult } from '../Models/SearchResult.model';
import { StorageService } from './storage.service';
import { StoredArticles } from '../Models/storedArticles.model';
@Injectable({
  providedIn: 'root',
})

// Keys
// K9Babken@gmail.com: f775ade9473b474f8d00a6d7363f1bd5
// babkenn@gmail.com: 6ff243602bf240ca945f5417329fd272
export class NewsAPIService {
  // Country Options
  private countries = ['ca', 'us', 'ru', 'de', 'mx', 'au'];
  private selectedCountry = this.countries[0];
  private activeResultforHeadlines: HeadlineSearchResult;
  private searchResult: SearchResult;

  private focusArticle: Article;

  private lastVisited: string;

  private storedArticles: StoredArticles;
  // Category Options
  private categories = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];

  private queryResults: SearchResult;
  private selectedCategory = this.categories[0];

  private Stored;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  async fetchHeadlines(lCategory, country) {
    this.activeResultforHeadlines = null;
    const url =
      'https://newsapi.org/v2/top-headlines?country=' +
      country +
      '&category=' +
      lCategory +
      '&apiKey=03b39e1327a241529ffa91e43166650a';
    await this.http
      .get(url)
      .toPromise()
      .then((data: any) => {
        const result: HeadlineSearchResult = {
          category: lCategory,
          region: country,
          date: Date.now(),
          articles: data.articles,
        };
        console.log('Printing result: ' + result);
        this.activeResultforHeadlines = result;
        return result;
      })
      .catch((err) => {
        console.log('Error', err);
        return err;
      });
  }
  getresult() {
    if (
      this.activeResultforHeadlines &&
      this.activeResultforHeadlines !== null
    ) {
      return this.activeResultforHeadlines;
    }
  }

  async getnews(topic) {
    this.searchResult = undefined;
    const url =
      'https://newsapi.org/v2/everything?q=' +
      topic +
      '&apiKey=03b39e1327a241529ffa91e43166650a';
    await this.http
      .get(url)
      .toPromise()
      .then((data: any) => {
        console.log('PRINTING: \n' + '[ ' + JSON.stringify(data) + '] \n');
        const result: SearchResult = {
          query: topic,
          date: Date.now(),
          articles: data.articles,
        };
        console.log('Printing result: ' + result);
        this.searchResult = result;
        return result;
      })
      .catch((err) => {
        console.log('Error', err);
        return err;
      });
  }

  switchCategory(category) {
    category = category.substring(1, category.length - 1);
    for (var i = 0; i < this.categories.length; i++) {
      if (this.categories[i] === category) {
        this.selectedCategory = this.categories[i];
      }
    }
  }

  switchRegion(country) {
    country = country.substring(1, country.length - 1);
    for (var i = 0; i < this.countries.length; i++) {
      if (this.countries[i] === country) {
        this.selectedCountry = this.countries[i];
      }
    }
  }

  getCategory() {
    return this.selectedCategory;
  }

  getRegion() {
    return this.selectedCountry;
  }

  getAllRegions() {
    return this.countries;
  }

  getAllCAtegories() {
    return this.categories;
  }

  setFocusArticle(article) {
    this.focusArticle = article;
  }

  clearFocusArticle() {
    this.focusArticle = undefined;
  }

  getFocusArticle() {
    return this.focusArticle;
  }

  getSearchResult() {
    if (this.searchResult && this.searchResult !== undefined) {
      return this.searchResult;
    }
  }

  setLastVisited(page) {
    this.lastVisited = page;
  }

  getLastVisited() {
    return this.lastVisited;
  }

  async storeArticleInDB(article) {
    var temp = await this.getArticlesfromDB();
    article.id = temp.id++;
    temp.articles.push(article);
    this.storedArticles = temp;
    this.storageService.clearDb();
    this.storageService.addToDb('article', this.storedArticles);
    return temp.id;
  }

  async getArticlesfromDB() {
    const length = await this.storageService.getSize();
    if (length < 1) {
      const initial: StoredArticles = {
        id: 0,
        articles: [],
      };
      this.storedArticles = initial;
      this.storageService.addToDb('article', this.storedArticles);
    }
    this.storedArticles = await this.storageService.getAllArticles();;
    return this.storedArticles;
  }

  async deleteArticlefromDB(article) {
    const index = this.storedArticles.articles.indexOf(article);
    this.storedArticles.articles.splice(index, 1);
    this.storeArticleInDB(this.storedArticles);

   //this.storageService.clearDb();
  }
}
