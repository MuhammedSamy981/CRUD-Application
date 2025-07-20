import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDto } from '../types/Employee/EmployeeDto';
import { EmployeeAddDto } from '../types/Employee/EmployeeAddDto';
import { EmployeeUpdateDto } from '../types/Employee/EmployeeUpdateDto';
import { Filters } from '../types/Employee/Filters';

@Injectable({
  providedIn: 'root'
})

export class EmployeesService {

  apiUrl:string="http://localhost:5259/api";
  
  constructor(private client:HttpClient) 
  { }

  public getAll():Observable<EmployeeDto[]>
  {
    return this.client.get<EmployeeDto[]>(this.apiUrl+"/Employees");
  }

  public getAllFiltered(filters:Filters):Observable<EmployeeDto[]>
  {
    let params = new HttpParams();
   
    if(filters.firstName!="undefined")
      {
 params= params.append('FirstName', filters.firstName);  
}
  if(filters.lastName!="undefined" ){

 params= params.append('LastName', filters.lastName);
}
  if(filters.email!="undefined"){ 

 params= params.append('Email', filters.email);
}
  if(filters.position!="undefined"){
    
params=  params.append('Position',filters.position);
}

    return this.client.get<EmployeeDto[]>
    (this.apiUrl+"/Employees/Filtered",{params});
  }

  public getById(id:number):Observable<EmployeeDto>
  {
    return this.client.get<EmployeeDto>(this.apiUrl+"/Employees/"+id);
  }

  public add(employee:EmployeeAddDto):Observable<object>
  {
    return this.client.post(this.apiUrl+"/Employees",employee);
  }

  public update(employee:EmployeeUpdateDto):Observable<object>
  {
    return this.client.put(this.apiUrl+"/Employees",employee);
  }

  public delete(id:number):Observable<object>
  {
    return this.client.delete(this.apiUrl+"/Employees/"+id); 
  }
  
}
