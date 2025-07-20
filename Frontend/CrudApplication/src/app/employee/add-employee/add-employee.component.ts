import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import { EmployeeAddDto } from 'src/app/types/Employee/EmployeeAddDto';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  
  constructor(private employeesService: EmployeesService,
  private router:Router) { }

  
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


  AddEmployee(e: Event): void {
    e.preventDefault();
    if (this.form.invalid) return;
    const employee: EmployeeAddDto =
    {
      firstName: this.form.value.firstName!,
      lastName: this.form.value.lastName!,
      email: this.form.value.email!,
      position: this.form.value.position!,
    };
 
    this.employeesService.add(employee).subscribe({
      next: () => {
          alert("Added successfully");
        this.router.navigateByUrl("/");
      },
      error: () => {
        alert("Addition failed");

      },
    })
  }
}
