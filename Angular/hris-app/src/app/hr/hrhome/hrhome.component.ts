import { Component, inject } from '@angular/core';
import {
  NgbCalendar,
  NgbDatepickerModule,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hrhome',
  templateUrl: './hrhome.component.html',

  styleUrls: ['./hrhome.component.css'],
})
export class HrhomeComponent {
  today = inject(NgbCalendar).getToday();

  model: NgbDateStruct | undefined=this.today;
  date: { year: number; month: number } | undefined;


}
