import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private service: AuthService
  ) {}

  registerform = this.builder.group({
    id: ['', [Validators.required, Validators.minLength(5)]],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required,
      Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
      )],
    ],
    gender: ['male'],
    role: [''],
    isActive: [false],
  });

  proceedregister() {
    if (this.registerform.valid) {
      this.service.registerUser(this.registerform.value).subscribe((result) => {
        this.toastr.success(
          'Please contact admin for enable access.',
          'Registered successfully'
        );
        this.router.navigate(['login']);
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
