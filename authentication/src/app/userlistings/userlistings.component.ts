import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopComponent } from '../updatepop/updatepop.component';

@Component({
  selector: 'app-userlistings',
  templateUrl: './userlistings.component.html',
  styleUrls: ['./userlistings.component.scss']
})
export class UserlistingsComponent {
  displayedColumns: string[] = ['username', 'name', 'email', 'status', 'role', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private service: AuthService,
    private dialogService: MatDialog) {
    this.loadUserList();
  }

  userList: any;

  loadUserList() {
    this.service.getAll().subscribe(data => {
      this.userList = data;
      this.dataSource = new MatTableDataSource(this.userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateAction(id: string) {
    const dialogRef = this.dialogService.open(UpdatepopComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      data: { id: id },
      width: '30%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadUserList();
    });
  }

}
