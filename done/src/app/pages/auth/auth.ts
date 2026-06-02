import { Component, input } from '@angular/core';
import { Container } from '../../components/container/container';
import { LoginForm } from '../../components/login-form/login-form';
import { RegistrationForm } from '../../components/registration-form/registration-form';
import { Button } from "../../components/button/button";

type formType = 'login' | 'registration';
@Component({
  selector: 'app-auth',
  imports: [Container, LoginForm, RegistrationForm, Button],
  templateUrl: './auth.html',
  styles: ``,
})
export class Auth {
  formType = input.required<formType>();
}
