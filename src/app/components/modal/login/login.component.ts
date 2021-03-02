import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session.service';
import { UserService } from 'src/app/services/user.service';
import { Session } from '../../../models/session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  session = {} as Session;
  user = {} as UserInfo;

  constructor(public activeModal: NgbActiveModal, private sessionSevice: SessionService, private toastr: ToastrService, private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.autoLogin();
    this.validation();
  }

  autoLogin() {
    this.userService.getInfo().subscribe((user: UserInfo) => {
      this.user = user;
      // this.router.navigate(['/dash']);
      console.log(this.user);
    })
  }

  login() {
    this.sessionSevice.login(this.session).subscribe(() => {
      this.activeModal.close();
    }, (err) => {
      this.toastr.error(err);
    });
  }

  validation() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
}
