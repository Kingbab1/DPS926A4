import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Article } from '../Models/Article.model';
import { NewsAPIService } from '../Services/NewsAPI.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  private searchTerm: string;
  private serachList: Article[];
  private searchText: string;
  private searchable: boolean;
  constructor(private newsAPIService: NewsAPIService, public navCtrl: NavController) {}

  ngOnInit(){
    this.searchable = false;
    this.searchText = '';
  }

  runTimeChange(evt){
    console.log('Test: ' + this.searchText);
    if( this.searchText.length > 0){
      this.searchable = true;
    }
    else{
      this.searchable = false;
    }

    console.log('Searchable: ' + this.searchable);

  }

  searchClicked(){
      const temp = this.newsAPIService.getnews(this.searchText);
      temp
        .then((res) => {
          console.log('Called: ');
          console.log(res);
          const extract = this.newsAPIService.getSearchResult();
          console.log(extract);
          this.serachList = extract.articles;
        })
        .catch((err) => {
          console.log(err);
        });
  }

  articleSelected(article){
    this.newsAPIService.setFocusArticle(article);
    this.navCtrl.navigateForward('/detail-view');
  }

}
