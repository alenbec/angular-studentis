import { Component, OnInit } from '@angular/core';
import { State } from '../_store';
import { Store } from '@ngrx/store';
import { BaseComponent } from '../_models/component-models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  ngOnInit() {
  }
}
