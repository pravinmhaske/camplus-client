import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegistrationService, UtilityService } from '../../providers/index';
import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupPage {
  signup: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public router: Router,
    // public userData: UserData,
    public registrationService: LoginRegistrationService,
    public util: UtilityService,
  ) { }

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.util.showLoader("Logging  in...").then(() => {
        this.registrationService.registerUser(this.signup)
          .subscribe(
            data => {

              if (data.success) {
                this.registrationService.login(this.signup.username);
                if(data.rowsInserted){
                  this.router.navigateByUrl('/login');
                }

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
  resetForm(){
    this.signup={ username: '', password: '' };
    this.submitted=false;
  }
}
