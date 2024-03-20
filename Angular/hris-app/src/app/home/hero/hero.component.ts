import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  text: string = 'SGT';
  texts: string[] = ['Code', 'Build', 'Create', 'Design', 'Teach'];
  colors: string[] = [
    'text-danger',
    'text-primary',
    'text-success',
    'text-warning',
  ];
  i: number = 0;
  color!: string;
  ngOnInit(): void {
    this.textchange();
  }

  createForm = new FormGroup({
    search: new FormControl(),
  });

  textchange() {
    setInterval(() => {
      this.text = this.texts[this.i % 5];
      this.color = this.colors[this.i % 4];
      this.i = this.i + 1;
    }, 1000);
  }
  search() {}
}
