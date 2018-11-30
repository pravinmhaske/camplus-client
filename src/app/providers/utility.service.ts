import { Injectable } from '@angular/core';
import {  LoadingController, ToastController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  // _favorites: string[] = [];
  // HAS_LOGGED_IN = 'hasLoggedIn';
  // HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  loading:any;

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) { }

  async showToaster(message,duration=3000) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration
    });
    await toast.present();
}

 async showLoader(message="Please wait...") {
  this.loading = await this.loadingCtrl.create({
    message: message
  });
  return await this.loading.present();
}

 hideLoader() {
  this.loading.dismiss();
}

errorHandler(error){
  this.showToaster("Unexpected error occured.Please try again later.\n Error Details:"+error.message);
}

  // async submit() {
  //     const toast = await this.toastCtrl.create({
  //       message: 'Your support request has been sent.',
  //       duration: 3000
  //     });
  //     await toast.present();
    
  // }
  // hasFavorite(sessionName: string): boolean {
  //   return (this._favorites.indexOf(sessionName) > -1);
  // }

  // addFavorite(sessionName: string): void {
  //   this._favorites.push(sessionName);
  // }

  // removeFavorite(sessionName: string): void {
  //   const index = this._favorites.indexOf(sessionName);
  //   if (index > -1) {
  //     this._favorites.splice(index, 1);
  //   }
  // }

  // login(username: string): Promise<any> {

  //   return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
  //     this.setUsername(username);
  //     return this.events.publish('user:login');
  //   });
    
  // }

  // signup(username: string): Promise<any> {
  //   return this.storage.set(this.HAS_LOGGED_IN, true).then(() => {
  //     this.setUsername(username);
  //     return this.events.publish('user:signup');
  //   });
  // }

  // logout(): Promise<any> {
  //   return this.storage.remove(this.HAS_LOGGED_IN).then(() => {
  //     return this.storage.remove('username');
  //   }).then(() => {
  //     this.events.publish('user:logout');
  //   });
  // }

  // setUsername(username: string): Promise<any> {
  //   return this.storage.set('username', username);
  // }

  // getUsername(): Promise<string> {
  //   return this.storage.get('username').then((value) => {
  //     return value;
  //   });
  // }

  // isLoggedIn(): Promise<boolean> {
  //   return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
  //     return value === true;
  //   });
  // }

  // checkHasSeenTutorial(): Promise<string> {
  //   return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
  //     return value;
  //   });
  // }
}
