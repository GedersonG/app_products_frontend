import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from '../models/login-user';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUser: LoginUser = new LoginUser('', '');
  username: string = '';
  password: string = '';
  role: string[] = [];

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.role = this.tokenService.getAuthorities();
    }
  }

  onLogin() {
    this.loginUser = new LoginUser(this.username, this.password);
    this.authService.login(this.loginUser).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUsername(data.username);
        this.tokenService.setAuthorities(data.authorities);
        this.role = data.authorities;
        this.toastr.success('Welcome ' + data.username, 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
        this.router.navigate(["/"]);
      },
      err => {
        this.isLogged = false;
        this.isLoginFail = true;
      }
    )
  }
}
