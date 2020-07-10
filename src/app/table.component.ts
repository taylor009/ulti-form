import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { merge } from 'rxjs';

import { UserService } from './user.service';

export interface User {
  name: string;
  email: string;
  phone: string;
  website: string;
  id: number;
  username: string;
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  };
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  };
}

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styles: [
    `
      table {
        width: 100%;
      }

      mat-icon {
        cursor: pointer;
      }

      th.mat-sort-header-sorted {
        color: black;
      }

    `
  ]
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'website', 'action'];
  dataSource;
  user;

  users: User[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: User[]) => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.sort = this.sort;
      });
  }

  addItem() {
    this.users.push({
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496'
        }
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
      }
    });
    this.dataSource = new MatTableDataSource(this.users);
  }

  editUser(user) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = user;
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
