import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';
import { LoginRegistrationService } from '../../providers/login.registration.service';
import { UtilityService } from '../../providers/utility.service';

import { UserOptions } from '../../interfaces/user-options';
import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: LoginRegistrationService,
    public router: Router,
    public util: UtilityService,
    public loadingController: LoadingController,
  ) { }

  async onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.util.showLoader("Logging  in...").then(() => {
        this.userData.loginUser(this.login)
        // .finally(() => this.toggleLoading())
        .subscribe(
          data => {
           this.util.showToaster(data.message)
            this.util.hideLoader();
            this.router.navigateByUrl('/app/tabs/(schedule:schedule)');
          },
          error => {
            console.log("Error", error);
            this.util.hideLoader();
            this.util.errorHandler(error);
           }
        )
      });
      // 
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
