import { Component, OnInit } from '@angular/core';
import{FormGroup, FormBuilder} from "@angular/forms";
import {DashboardModel} from "../dashboard.model";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formvalue!: FormGroup;
  dashboardModelObj: DashboardModel = new DashboardModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  Today=new Date();
  employee='';
  SearchEmployee='';

  constructor(private formBuilder: FormBuilder,
              private api: ApiService) {
  }

  ngOnInit(): void {
    this.formvalue = this.formBuilder.group({
      fname: [''],
      lname: [''],
      email: [''],
      phoneNo: [''],
      idNo: [''],
      salary: ['']
    })
    this.getEmployeeDetails();
  }
clickAddEmployee(){
    this.formvalue.reset();
    this.showAdd=true;
    this.showUpdate= false;
}
  postEmployeeDetails() {
    this.dashboardModelObj.fname = this.formvalue.value.fname;
    this.dashboardModelObj.lname = this.formvalue.value.lname;
    this.dashboardModelObj.email = this.formvalue.value.email;
    this.dashboardModelObj.phoneNo = this.formvalue.value.phoneNo;
    this.dashboardModelObj.idNo = this.formvalue.value.idNo;
    this.dashboardModelObj.salary = this.formvalue.value.salary;


    this.api.postEmployee(this.dashboardModelObj)
      .subscribe((res: any) => {
          console.log(res);
          alert("Employee Added Successfully")
          let ref = document.getElementById('close')
          ref?.click();
          this.formvalue.reset();
          this.getEmployeeDetails();
        },
        (_err: any) => {
          alert("Something Went Wrong")
        })


  }

  getEmployeeDetails() {
    this.api.getEmployee()
      .subscribe((res: any) => {
        this.employeeData = res;
      })
  }

  deleteEmployeeDetails(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(_res => {
        alert("Employee Details Deleted")
        this.getEmployeeDetails();
      })
  }
  OnUpdate(row: any) {
    this.showAdd=false;
    this.showUpdate= true;
    this.dashboardModelObj.id = row.id;
    this.formvalue.controls['fname'].setValue(row.fname)
    this.formvalue.controls['lname'].setValue(row.lname)
    this.formvalue.controls['email'].setValue(row.email)
    this.formvalue.controls['phoneNo'].setValue(row.phoneNo)
    this.formvalue.controls['idNo'].setValue(row.idNo)
    this.formvalue.controls['salary'].setValue(row.salary)
  }
  updateEmployeeDetails() {
    this.dashboardModelObj.fname = this.formvalue.value.fname;
    this.dashboardModelObj.lname = this.formvalue.value.lname;
    this.dashboardModelObj.email = this.formvalue.value.email;
    this.dashboardModelObj.phoneNo = this.formvalue.value.phoneNo;
    this.dashboardModelObj.idNo = this.formvalue.value.idNo;
    this.dashboardModelObj.salary = this.formvalue.value.salary;

    this.api.updateEmployee(this.dashboardModelObj, this.dashboardModelObj.id)
      .subscribe((_res: any) => {
        alert("Updated Successfully");
        let ref = document.getElementById('close')
        ref?.click();
        this.formvalue.reset();
        this.getEmployeeDetails()
      })
  }
  onEmployeeFilter(){
    this.SearchEmployee=this.employee;
  }
}
