import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeeDto } from 'src/app/types/Employee/EmployeeDto';
import { Filters } from 'src/app/types/Employee/Filters';

@Component({
  selector: 'app-employees-management',
  templateUrl: './employees-management.component.html',
  styleUrls: ['./employees-management.component.css']
})
export class EmployeesManagementComponent implements OnInit,AfterContentInit 
{
 employees?:EmployeeDto[];
 totalRatings:number=0;
 currentPage:number = 1;
 sizeOfPage:number = 3;
 paginatedEmployees: EmployeeDto[] = [];  

 
 constructor(private employeesService:EmployeesService,private router:Router) {}

 ngOnInit(): void {
  
  if( 
    (sessionStorage.getItem("firstName")==null
      || sessionStorage.getItem("firstName")=="") 
    && 
      ( sessionStorage.getItem("lastName")==null
      || sessionStorage.getItem("lastName")=="")
    &&
      (sessionStorage.getItem("email")==null
      || sessionStorage.getItem("email")=="") 
    && 
      ( sessionStorage.getItem("position")==null
      || sessionStorage.getItem("position")=="")
    )
    {
    this.employeesService.getAll().subscribe({
      next:(employees)=> {
        this.employees=employees;
      },
      error:(err)=>{
        console.error('Calling API failed',err);
      },
    });
  }
    
  else
  {
    const filters: Filters=
    {
      firstName: sessionStorage.getItem("firstName")!,
      lastName: sessionStorage.getItem("lastName")!,
      email: sessionStorage.getItem("email")!,
      position: sessionStorage.getItem("position")!
    };

    this.employeesService.getAllFiltered(filters).subscribe(
      {
        next:(employees)=> {
          this.employees=employees;
          console.log(this.employees);
        },
        error:(error)=>{
          console.error('Calling API failed',error);
        },
      });
  }
  
 }

 
 ngAfterContentInit(): void {
  sessionStorage.setItem("firstName","");
  sessionStorage.setItem("lastName","");
  sessionStorage.setItem("email","");
  sessionStorage.setItem("position","");
}


GetData(paginatedData:any[])
{
  this.paginatedEmployees=paginatedData;
}



search(firstName:string,lastName:string,email:string,position:string): void 
{
 
console.log(firstName+"/"+lastName+"/"+email+"/"+position);

   this.router.navigateByUrl("/search/"+
    ((firstName=="")?"undefined":firstName)
    +"/"+
    ((lastName=="")?"undefined":lastName)
    +"/"+
    ((email=="")?"undefined":email)
    +"/"+
    ((position=="")?"undefined":position));
}

}



