import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegistrationService, UtilityService } from '../../providers/index';
import { UserOptions } from '../../interfaces/user-options';
// import { LoadingController } from '@ionic/angular';
// import { Storage } from '@ionic/storage';

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
    public util: UtilityService,
    // public storage: Storage,
    public router: Router,
  ) { }

  async onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.util.showLoader("Logging  in...").then(() => {
        this.loginService.loginUser(this.login)
          .subscribe(
            data => {
              if (data.success) {
                this.loginService.login(this.login.username);
                this.router.navigateByUrl('/app/tabs/(schedule:schedule)');
              } else {
                this.resetForm();
              }
              this.util.showToaster(data.message)
              this.util.hideLoader();
            },
            error => {
              this.resetForm();
              console.log("Error", error);
              this.util.hideLoader();
              this.util.errorHandler(error);
            }
          )
      });
    }
  }

  resetForm() {
    this.login = { username: '', password: '' };
    this.submitted = false;
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
