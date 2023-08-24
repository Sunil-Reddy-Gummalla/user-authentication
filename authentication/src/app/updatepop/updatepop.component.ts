import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepop',
  templateUrl: './updatepop.component.html',
  styleUrls: ['./updatepop.component.scss'],
})
export class UpdatepopComponent {
  userData: any;
  rolelist: any;
  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private service: AuthService,
    private dialogRef: MatDialogRef<UpdatepopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.service.getallUserRoles().subscribe((res) => {
      this.rolelist = res;
    });
  }

  updateform = this.builder.group({
    id: [''],
    name: [''],
    email: [''],
    password: [''],
    gender: ['male'],
    role: ['', Validators.required],
    isactive: [false],
  });

  ngOnInit() {
    this.service.getbyCode(this.data.id).subscribe((res) => {
      this.userData = res;
      this.updateform.setValue({
        id: this.userData.id,
        name: this.userData.name,
        email: this.userData.email,
        password: this.userData.password,
        gender: this.userData.gender,
        role: '',
        isactive: false,
      });
    });
  }

  updateUser() {
    this.service
      .updateUser(this.updateform.value.id, this.updateform.value)
      .subscribe((res) => {
        if (res) {
          this.toastr.success('User Updated');
          this.dialogRef.close();
        }
      });
  }
}
