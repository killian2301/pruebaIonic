import {
  ComponentFixture,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginPage],
        imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule],
      }).compileComponents();

      fixture = TestBed.createComponent(LoginPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  const VALID_EMAIL = 'user@user.com';
  const INVALID_EMAIL = 'user@use';
  const VALID_PASSWORD = '123456';
  const INVALID_PASSWORD = '123';

  const updateLoginFormFields = (email: string, password: string) => {
    component.loginForm.get('email').setValue(email);
    component.loginForm.get('password').setValue(password);
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('components initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.isFormSubmitted).toBeFalsy();
  });

  it('isFormSubmitted should be true when onSubmit()', () => {
    component.onSubmit();
    fixture.detectChanges();

    expect(component.isFormSubmitted).toBeTruthy();
  });

  it('form values get updated when user changes input', () => {
    updateLoginFormFields(VALID_EMAIL, VALID_PASSWORD);
    fixture.detectChanges();

    expect(component.loginForm.value.email).toBe(VALID_EMAIL);
    expect(component.loginForm.value.password).toBe(VALID_PASSWORD);
  });

  it('form should be invalid when email/password is invalid', () => {
    updateLoginFormFields(INVALID_EMAIL, INVALID_PASSWORD);
    fixture.detectChanges();
    expect(component.loginForm.status).toBe('INVALID');
  });

  it('password must be at least 5 characters long', () => {
    updateLoginFormFields(VALID_EMAIL, INVALID_PASSWORD);
    fixture.detectChanges();
    expect(component.loginForm.get('password').invalid).toBeTruthy();
  });

  it('The toggle should be able to switch from off to on', () => {
    component.loginForm.get('remember').setValue(true);

    fixture.detectChanges();
    expect(component.loginForm.value.remember).toBeTruthy();
  });
  it('Should display email required error message when email is blank', () => {
    updateLoginFormFields('', VALID_PASSWORD);
    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    const errorMessage =
      fixture.debugElement.nativeElement.querySelector('#email-required');
    expect(errorMessage.innerHTML).toContain('requerido');
  });

  it('Should display email error message when email is invalid', () => {
    updateLoginFormFields(INVALID_EMAIL, VALID_PASSWORD);
    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    const errorMessage =
      fixture.debugElement.nativeElement.querySelector('#email-invalid');

    expect(errorMessage.innerHTML).toBe('El email no tiene un formato válido');
  });

  it('Should display password required error message when password is blank', () => {
    updateLoginFormFields(VALID_EMAIL, INVALID_PASSWORD);
    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    const errorMessage =
      fixture.debugElement.nativeElement.querySelector('#password-invalid');

    expect(errorMessage.innerHTML).toContain('5 caracteres');
  });

  it('Should display password error message when password is less than 5 chars', () => {
    updateLoginFormFields(VALID_EMAIL, INVALID_PASSWORD);
    fixture.detectChanges();

    component.onSubmit();
    fixture.detectChanges();

    const errorMessage =
      fixture.debugElement.nativeElement.querySelector('#password-invalid');

    expect(errorMessage.innerHTML).toContain('5 caracteres');
  });
});
