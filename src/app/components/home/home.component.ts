import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { LoginComponent } from '../modal/login/login.component';
import { RegisterComponent } from '../modal/register/register.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openRegister() {
    this.modalService.open(RegisterComponent, { centered: true });
  }

  openLogin() {
    this.modalService.open(LoginComponent, { centered: true });
  }
}
