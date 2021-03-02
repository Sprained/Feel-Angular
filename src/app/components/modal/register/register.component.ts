import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../services/user.service';
import { UserRegister } from '../../../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userRegister = {} as UserRegister;
  registerForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private userService: UserService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation()
  }

  saveCar() {
    this.userService.registerUser(this.userRegister).subscribe(() => {
      this.toastr.success("Usuário cadastrado com sucesso!");
      this.activeModal.close();
    }, (err) => {
      this.toastr.error(err);
    });
  }

  validation() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['']
    })
  }
}
