import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent  implements OnInit {
  constructor(
      private router:Router
    ,private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
 
    this.activatedRoute.params.subscribe((params)=>
    { 
      sessionStorage.setItem("firstName",params['firstName']);
      sessionStorage.setItem("lastName",params['lastName']);
      sessionStorage.setItem("email",params['email']);
      sessionStorage.setItem("position",params['position']);
      this.router.navigateByUrl("/");
    });
  }  
}