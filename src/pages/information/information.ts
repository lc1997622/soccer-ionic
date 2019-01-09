import { Component } from '@angular/core'
import { ViewController, NavParams } from 'ionic-angular'
import { WebApi } from '../providers/web_api.service';
import { NavController } from 'ionic-angular/navigation/nav-controller';
@Component({
    selector: 'information',
    templateUrl: 'information.html'
})
export class InformationPage {
    constructor(
        public viewCtrl: ViewController,
        public params: NavParams,
        private webApi: WebApi,
        private navCtrl: NavController
    ) {
        console.log(params.get('id'));
    }
    private item: any = {
        director: {},
        actors: [],
        video:{},
        stageImg:{
            list:[]
        },
    };
    ionViewDidLoad() {
        this.webApi.get1(this.params.get('cityid'), this.params.get('movieid')).then((data) => {
            this.item = data.data.basic;
        })
    }
    popView() {
        this.navCtrl.pop();
    }
}