import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private service: AuthService
  ) {
    sessionStorage.clear();
  }

  loginForm = this.builder.group({
    id: ['', Validators.required],
    password: ['', Validators.required],
  });

  proceedlogin() {
    this.service.getbyCode(this.loginForm.value.id).subscribe((res: any) => {
      if (res.password === this.loginForm.value.password) {
        if (res.isactive) {
          sessionStorage.setItem('username', res.id);
          sessionStorage.setItem('role', res.role);
          this.toastr.success('User successfully logged in');
          this.router.navigate(['']);
        } else {
          this.toastr.error('Please contact Admin', 'InActive User');
        }
      } else {
        this.toastr.error('Invalid credentials');
      }
    });
  }
}
