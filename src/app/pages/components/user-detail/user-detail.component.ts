import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { TOASTR_DURATION } from '../../constants';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userData: any;
  page = 1;
  totalRec = 20;
  config;
  pagination = {
    itemsPerPage: 10,
    currentPage: this.page,
    totalItems: this.totalRec
  }
  constructor(private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private service: CommonService) { }

  ngOnInit(): void { }
  userDetailForm = this.formBuilder.group({
    dateRange: [null, [Validators.required]],
  });
  get userDetailFormControl() {
    return this.userDetailForm.controls;
  }
  onSubmit() {
    const params = {
      created_from: moment((this.userDetailForm.get('dateRange').value).startDate).format('YYYY-MM-DD'),
      created_till: moment((this.userDetailForm.get('dateRange').value).endDate).format('YYYY-MM-DD'),
    };
    const observer = this.service.getUserDetails(params).subscribe(
      (response: any) => {
        this.userData = response.body.users;
        this.totalRec = this.userData.length;
        this.config = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.totalRec
        };
        this.pagination = {
          itemsPerPage: 10,
          currentPage: this.page,
          totalItems: this.totalRec
        }
        this.service.updateUserDetails(this.userData)
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error[0], 'Error', {
          timeOut: TOASTR_DURATION,
        });
      },
    );
    // this.subscriptions.add(observer);
  }
  pageChanged(event) {
    console.log(event);

    this.page = event;
  }
}
