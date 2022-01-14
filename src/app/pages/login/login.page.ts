import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isFormSubmitted = false;
  constructor(private fb: FormBuilder) {}

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('email');
  }

  ngOnInit() {
    this.loginForm = this.getLoginForm();
  }

  getLoginForm() {
    return this.fb.group(
      {
        email: this.fb.control('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        remember: this.fb.control(false),
      }
    );
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (this.loginForm.valid) {
      console.log('OK');
      this.loginForm.reset();
      this.isFormSubmitted = false;
    }
  }
}
