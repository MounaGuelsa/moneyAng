import { Component } from '@angular/core';
import { RevenueService } from '../revenue/revenue.service';
import { Revenue } from '../revenue/Revenue';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  revenues: Revenue[] = [];

  constructor(private revenueService: RevenueService) {}

  ngOnInit(): void {
    this.getRevenues();
  }

  getRevenues(): void {
    this.revenueService.obtenirRevenues().subscribe(revenues => this.revenues = revenues);
  }
}
