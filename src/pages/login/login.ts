import { Component } from '@angular/core';
import { NavController,ModalController, ToastController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import { HomePage } from '../home/home';
import{RegisterPage} from '../register/register';
import { WebApi } from '../providers/web_api.service';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public isRemember: boolean = false;
  public isShow: boolean = false;

  iconStyle: object = {'color':'#488aff','font-size':'1.4em'};

  constructor(public modalCtrl: ModalController,
              public toastCtrl: ToastController,
              private webApi: WebApi,
              private navCtrl: NavController,
              ) {
  }
  private item: any = {
    userid: '',
};
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  _login(username: HTMLInputElement, password: HTMLInputElement){

    if (username.value.length === 0){
      this.showToast("bottom", "请输入");
      return false;
    }

    if (password.value.length === 0){
      this.showToast("bottom", "请输入密码");
      return false;
    }

    let data = {userid: username.value, password: password.value};

    //this.webApi.post('http://192.168.43.78:8080/dologin', data).then((result) => {
     // this.item = result.userid;
      //console.log(result);
 // });
  
    if(this.item.userid.length===-1){
      this.showToast("bottom", "密码错误！");
      return false;
    }
    // 界面跳转
    //let modal = this.modalCtrl.create(HomePage, data);
    //modal.present();
    this.navCtrl.push(HomePage, data);
    this.navCtrl.setRoot(HomePage);
    
    
  }

  pushRegisterPage(){
    let modal=this.modalCtrl.create(RegisterPage);
    modal.present();
  }


  showToast(position: string, message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: position
    });

    toast.present(toast);
  }
}
