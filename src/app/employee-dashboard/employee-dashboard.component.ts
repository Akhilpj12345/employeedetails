import { Component, ErrorHandler, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { subscribeOn } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {



  
   
  formValue ! : FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeedata !:any;
  constructor(private formbuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : ['',Validators.required],
      address : ['',Validators.required],
      Dob : ['',Validators.required],
      mobile : ['',Validators.required],
      role : ['',Validators.required],
      gender:[''],

    })
    console.log(this.employeedata);
    
    this.getAllEmployee();
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.address = this.formValue.value.address;
    this.employeeModelObj.Dob  = this.formValue.value.Dob;
    this.employeeModelObj. role = this.formValue.value.role;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.gender=this.formValue.value.gender;


   this.api.postEmployee(this.employeeModelObj)
   .subscribe(res=>{
    console.log(res);
    alert("employee added sucessfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee();

   },
   
  err=>{
    alert('something went wrong')
  } )

  } 

  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
     this.employeedata= res;
    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
     alert('employee deleted');
     this.getAllEmployee();
    })
  }

 
  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.address = this.formValue.value.address;
    this.employeeModelObj.Dob = this.formValue.value.Dob;
    this.employeeModelObj. role = this.formValue.value.role;
    this.employeeModelObj.mobile = this.formValue.value.mobile; 
    this.employeeModelObj.gender=this.formValue.value.gender;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("updated sucess")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
  
    })

    
  }
}
