import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeeDto } from 'src/app/types/Employee/EmployeeDto';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent {

  employeeId?: number;

   constructor(private employeesService: EmployeesService,
    private router:Router,
    private activatedRoute:ActivatedRoute
    ){}
  
  ngOnInit(): void {
    
      this.activatedRoute.paramMap.subscribe({
        next:(map)=> {
          this.employeeId=+map.get('id')!;
          this.employeesService.getById(this.employeeId).subscribe({
            next:(employee)=> {
              this.form.patchValue(employee);
            },
            error:(error)=> {
              console.error('Calling API failed',error);
            },
          })
        },
        error:(error)=> {
          console.error('This employee was not found',error);
        },
      });
  }
   
    form = new FormGroup({
      firstName: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      position: new FormControl<string>('', [
        Validators.required,
      ]),
  
    });
    
    Editemployee(e:Event):void
    {
      e.preventDefault();
      if(this.form.invalid) return;
      const employee:EmployeeDto=
      {
        id: this.employeeId!,
        firstName:  this.form.value.firstName!,
        lastName:  this.form.value.lastName!,
        email:  this.form.value.email!,
        position:  this.form.value.position!
      };

      this.employeesService.update(employee).subscribe({
        next:()=> {
          alert("Updated successfully");
    
            this.router.navigateByUrl("/");
          
        },
        error:()=> {
          alert("Update failed");
    
        },
      })
    }
}
