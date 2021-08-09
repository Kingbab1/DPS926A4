import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Article } from '../Models/Article.model';
import { NewsAPIService } from '../Services/NewsAPI.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  private regionOptions: string[];
  private selectedRegion: string;

  private topicOptions: string[];
  private selectedTopic: string;

  private articleList: Article[];
  constructor(private newsAPIService: NewsAPIService, public navCtrl: NavController) {}

  ngOnInit() {
    this.regionOptions = this.newsAPIService.getAllRegions();

    this.topicOptions = this.newsAPIService.getAllCAtegories();
  }

  regionChange(evt) {
    console.log(
      'RegionChange: (changing selected region to [ ' +
        evt +
        ' ])\n{ Verification: ' +
        this.selectedRegion +
        ' }'
    );
    this.newsAPIService.switchRegion(this.selectedRegion);
    this.getNews();
  }

  topicChange(evt) {
    console.log(
      'TopicChange: (changing selected topic to [ ' +
        evt +
        ' ])\n{ Verification: ' +
        this.selectedTopic +
        ' }'
    );
    this.newsAPIService.switchCategory(this.selectedTopic);
    this.getNews();
  }

  getNews() {
    if (this.selectedRegion !== undefined && this.selectedTopic !== undefined) {
      const temp = this.newsAPIService.fetchHeadlines(
        this.newsAPIService.getCategory(),
        this.newsAPIService.getRegion()
      );
      temp
        .then((res) => {
          console.log('Called: ');
          console.log(res);
          const extract = this.newsAPIService.getresult();
          console.log(extract);
          this.articleList = extract.articles;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('Not Called!');
    }
  }

  articleSelected(article){
    this.newsAPIService.setFocusArticle(article);
    //this.router.navigate(['/detail-view']);
    this.navCtrl.navigateForward('/detail-view');
  }
}
