import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajout-revenue',
  templateUrl: './ajout-revenue.component.html',
  styleUrls: ['./ajout-revenue.component.css']
})
export class AjoutRevenueComponent implements OnInit {
[x: string]: any;
selectedType: any;
Type: any;

  constructor() { }

  ngOnInit(): void {
  }

}
