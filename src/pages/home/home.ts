import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Slides, Platform, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { WebApi } from '../providers/web_api.service';
import { ModalController, NavParams, ViewController, Content } from 'ionic-angular'
import { Item } from 'ionic-angular/components/item/item';
import { AppMinimize } from '@ionic-native/app-minimize'
import { InformationPage } from '../information/information'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private list: any = [];
  private list1: any = [];
  private list2: any = [];
  private listnew: any = [];
  private listnew1: any = [];
  private listnew2: any = [];
  private listfist: any = [];
  private string1 = '/Showtime/LocationMovies.api?locationId=';
  private string2 = '/Movie/MovieComingNew.api?locationId=';
  private city = '/Showtime/HotCitiesByCinema.api'
  private cityname = '';
  private now: String[] = ['author', 'collect'];
  private type: String = this.now[0];
  public cityid = '290';


  constructor(
    private platform: Platform,
    private appMinimize: AppMinimize,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private webApi: WebApi,
    public modalCtrl: ModalController
  ) { }

  @ViewChild(Slides) slides: Slides;

  ionViewDidLoad() {
    this.type = 'author';
    this.webApi.getList(this.string1, '290').then((data) => {
      this.list = data.ms;
      this.cityname = '北京';
      this.list=[
        {"img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546950652220&di=b3f08867f30098b6791bddb84be52ffe&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ffront%2F456%2Fw633h623%2F20190107%2FEPRO-hrfcctn8272960.jpg",
        "title": "哈萨克斯坦门将乌龙球",
        "time":"2019年1月7日",
        "downloadcount":"0"},
        {"img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546950676958&di=9fa26a97b8263d2515207002a2a6d682&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fnews%2Fcrawl%2F116%2Fw550h366%2F20190107%2FyblH-hrfcctn8376552.jpg",
        "title": "于大宝进球反超",
        "time":"2019年1月7日",
        "downloadcount":"0"},
        {"img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546950713444&di=fed8f264b3f27cc06eb0d5d57e6025c3&imgtype=0&src=http%3A%2F%2F03imgmini.eastday.com%2Fmobile%2F20190108%2F20190108145834_57eaa4cb3130f15cbac1808e1e3c585f_1.jpeg",
        "title": "亚洲杯 中国-哈萨克斯坦 进球集锦",
        "time":"2019年1月7日",
        "downloadcount":"1"},
      ];
      let j=0;
      for(let i=0;i<this.list.length;i+=2){
        this.list1[j++]=this.list[i];
      }
      j=0;
      for(let i=1;i<this.list.length;i+=2){
        this.list2[j++]=this.list[i];
      }
    })
    this.webApi.getList(this.string2, '290').then((data) => {
      this.listnew = data.attention;
      let j=0;
      for(let i=0;i<this.listnew.length;i+=2){
        this.listnew1[j]=this.listnew[i];
        j++
      }
      j=0;
      for(let i=1;i<this.listnew.length;i+=2){
        this.listnew2[j]=this.listnew[i];
        j++;
      }
    })
  }

  private pushPage(item) {
    this.navCtrl.push(InformationPage, {
      cityid: this.cityid,
      movieid: item.id
    })
  }

  private chooseCity(item) {
    let cityModal = this.modalCtrl.create(CityPage, { id: item });
    cityModal.onDidDismiss(data => {
      this.type = 'author';
      this.cityname = data.cn;
      this.cityid = data.info;
      this.webApi.getList(this.string1, data.info).then((data) => {
        this.list = data.ms;
      })
      this.webApi.getList(this.string2, data.info).then((data) => {
        this.listnew = data.attention;
      })
    });
    cityModal.present();
  }
}

@Component({
  selector: 'city',
  templateUrl: 'city.html'
})
export class CityPage {
  @ViewChild(Content) content: Content;
  searchInput: String;
  searchingItems = []; //搜索显示的数组
  isSearching = false;
  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public params: NavParams,
    private webApi: WebApi,
    public elementRef: ElementRef
  ) { }
  private list = [];
  private i = 0;
  ionViewDidLoad() {                        //页面启动
    this.webApi.getList(this.params.get('id'), '').then((data) => {
      this.list = data.p;
      for (let i = 0; i < this.list.length - 1; i++) {     //对城市排序
        for (let j = 0; j < this.list.length - i - 1; j++) {
          if (this.list[j].pinyinFull > this.list[j + 1].pinyinFull) {
            let temp = this.list[j + 1];
            this.list[j + 1] = this.list[j];
            this.list[j] = temp;
          }
        }
      }
    })
  }
  myHeaderFn(record, recordIndex, records) {  //分组依据
    if (recordIndex == 0) {
      return record.pinyinFull[0];
    }
    else if (record.pinyinFull[0] != records[recordIndex - 1].pinyinFull[0]) {
      return record.pinyinFull[0];
    }
    return null;
  }

  /**
   * 取消结果触发的值
   */
  onCancelSearch(event) {
    this.isSearching = false;
    this.searchingItems = [];
  }
  /**
   * 通过关键字查询搜索的结果
   */
  goSearchResult(ev: any) {
    this.isSearching = true;
    let val = ev.target.value;
    this.searchInput = val;
    let length = this.list.length;
    let valpin = val.toUpperCase();
    this.searchingItems = [];
    let j = 0;
    if (val && val.trim() != '') {
      for (let i = 0; i < length; i++) {
        if (this.list[i].pinyinFull.toUpperCase().indexOf(valpin, 0) != -1 || this.list[i].n.indexOf(val) != -1) {
          this.searchingItems[j++] = this.list[i];
        }
      }
    } else {
      this.isSearching = false;
    }
  }
  dismiss(item?) {                        //在home函数中调用onDidMiss时 返回data对象
    let data;
    if (item == null) {
      data = { 'info': '290', 'cn': '北京' };
    } else {
      data = { 'info': item.id, 'cn': item.n };
    }
    this.toastCtrl.create({
      message: '已切换到' + data.cn,
      duration: 1300
    }).present();
    this.viewCtrl.dismiss(data);
  }
}
