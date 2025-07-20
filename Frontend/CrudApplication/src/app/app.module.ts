import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{ HttpClientModule } from'@angular/common/http';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { EmployeesManagementComponent } from './employee/employees-management/employees-management.component';
import { RemoveEmployeeComponent } from './employee/remove-employee/remove-employee.component';
import { SearchEmployeeComponent } from './employee/search-employee/search-employee.component';
import { DatePipe } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({ 
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    EmployeeDetailsComponent,
    EmployeesManagementComponent,
    RemoveEmployeeComponent,
    SearchEmployeeComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path:"",
        component:EmployeesManagementComponent,
      },
      {
        path:"search/:firstName/:lastName/:email/:position",
        component:SearchEmployeeComponent,
     },
      {
        path:"employee/add",
        component:AddEmployeeComponent,
      },
      {
        path:"employee/edit/:id",
        component:EditEmployeeComponent,
      },
      {
        path:"employee/delete/:id",
        component:RemoveEmployeeComponent,
      },
      {
        path:"employee/:id",
        component:EmployeeDetailsComponent,
      },

    ]),
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
