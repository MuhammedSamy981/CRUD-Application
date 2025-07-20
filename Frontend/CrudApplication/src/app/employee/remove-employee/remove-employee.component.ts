import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeeDto } from 'src/app/types/Employee/EmployeeDto';

@Component({
  selector: 'app-remove-employee',
  templateUrl: './remove-employee.component.html',
  styleUrls: ['./remove-employee.component.css']
})
export class RemoveEmployeeComponent {

  employeeId?:number;
  employee?:EmployeeDto;
  constructor(private employeesService:EmployeesService,
   private activatedRoute:ActivatedRoute,
   private router:Router){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(map)=> {
        this.employeeId=+map.get('id')!;
        this.employeesService.getById(this.employeeId).subscribe({
          next:(Employee)=> {
            this.employee=Employee;
          },
          error:(error)=> {
            console.error('Calling API failed',error);
          },
        })
      },
      error:(error)=> {
        console.error('This employee was not found',error);
      },
    })
  }

  DeleteEmployee(e:Event):void
  {
    e.preventDefault();
    this.employeesService.delete(this.employeeId!).subscribe({
      next: () => {
        alert("Deleted successfully");
      this.router.navigateByUrl("/");
    },
    error: () => {
      alert("Deletion failed");

    },
    })
  }
}
