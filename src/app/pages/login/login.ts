import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData,LoginRegistrationService,UtilityService } from '../../providers/index';
import { UserOptions } from '../../interfaces/user-options';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
    public loginService: LoginRegistrationService,
    public router: Router,
    public util: UtilityService,
    public loadingController: LoadingController,
    public storage: Storage
  ) { }

  async onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.util.showLoader("Logging  in...").then(() => {
        this.loginService.loginUser(this.login)
        .subscribe(
          data => {
            this.loginService.login(this.login.username);
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
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
