import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Article } from '../Models/Article.model';
import { NewsAPIService } from '../Services/NewsAPI.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.page.html',
  styleUrls: ['./detail-view.page.scss'],
})
export class DetailViewPage implements OnInit {

  private consumptionArticle: Article;
  private buttonText: string;

  constructor( private newsAPIService: NewsAPIService, public navCtrl: NavController ) { }

  ngOnInit() {
    this.consumptionArticle = this.newsAPIService.getFocusArticle();
    this.newsAPIService.clearFocusArticle();
    if(this.consumptionArticle.saved){
      this.buttonText = 'Saved';
    }
    else{
      this.buttonText = 'Save';
    }
  }

  async saveClicked(){
    if(this.buttonText === 'Save'){
      this.consumptionArticle.saved = true;
      this.buttonText = 'Saved';
      this .consumptionArticle.id = await this.newsAPIService.storeArticleInDB(this.consumptionArticle);
    }
    else{
      this.newsAPIService.deleteArticlefromDB(this.consumptionArticle);
      this.consumptionArticle.saved = false;
      this.buttonText = 'Save';
    }
  }

  //onclick="window.open('{{consumptionArticle.url}}')"

}
