import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dept } from 'src/app/shared/interfaces/departments.interface';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  departments!: dept[];
  constructor(
    
    private router: Router,
    private userService: UsersService
  
  ) {}
  ngOnInit(): void {

    this.userService.fetchDepts().subscribe((data) => {
      this.departments = data;
      console.log(data);
    });
  }
}
