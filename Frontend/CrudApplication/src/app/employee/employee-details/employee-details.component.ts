import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeeDto } from 'src/app/types/Employee/EmployeeDto';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employee?:EmployeeDto;

 constructor(private EmployeesService:EmployeesService,
  private activatedRoute:ActivatedRoute)
  {}

 ngOnInit(): void {
   this.activatedRoute.paramMap.subscribe({
     next:(map)=> {
       const employeeId=+map.get("id")!;
       this.EmployeesService.getById(employeeId).subscribe(
         {
           next:(employee)=> {
             this.employee=employee;
           },
           error:(error)=> {
             console.error('Calling API failed',error);
           },
         })
     },
     error:(error)=> {
       console.error('This employee is not found',error);
     }, 
   })
 }

}
