import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Article } from '../Models/Article.model';
import { NewsAPIService } from '../Services/NewsAPI.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  private articleList: Article[];

  constructor(private newsService: NewsAPIService, public navCtrl: NavController) {}

  async ngOnInit(){
    this.articleList = await (await this.newsService.getArticlesfromDB()).articles;
  }

  async ionViewWillEnter(){
    this.articleList = await (await this.newsService.getArticlesfromDB()).articles;
  }

  articleSelected(article){
    this.newsService.setFocusArticle(article);
    this.navCtrl.navigateForward('/detail-view');
  }

}
