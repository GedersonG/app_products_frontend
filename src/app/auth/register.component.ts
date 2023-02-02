import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewUser } from '../models/new-user';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  isLogged = false;
  newUser: NewUser = new NewUser('','','','');
  name: string = '';
  email: string = '';
  username: string = '';
  password: string = '';
  errMsg: string = '';

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }

  onRegister() {
    this.newUser = new NewUser(this.name, this.username, this.email,  this.password);
    this.authService.new(this.newUser).subscribe(
      data => {
        this.toastr.success('Account created!', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
        this.router.navigate(["/login"]);
      },
      err => {
        this.errMsg = err.error.message;
        this.toastr.error(err.error.message, 'FAIL', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        })
      }
    )
  }
}