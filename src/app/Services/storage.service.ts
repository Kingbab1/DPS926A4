/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage  } from '@ionic/storage-angular';
import { Article } from '../Models/Article.model';
import { StoredArticles } from '../Models/storedArticles.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private storedArticles: StoredArticles;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  addToDb(key: string, value: StoredArticles) {
    this._storage?.set(key, value);
  }

  async clearDb() {
    await this.storage.clear();
  }

  async getAllArticles(){
    const articles = await this.storage.get('article');
    this.storedArticles = articles;
    return this.storedArticles;
  }

  async getSize(){
    return await this.storage.length();
  }

}
