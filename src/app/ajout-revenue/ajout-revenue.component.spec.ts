import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRevenueComponent } from './ajout-revenue.component';

describe('AjoutRevenueComponent', () => {
  let component: AjoutRevenueComponent;
  let fixture: ComponentFixture<AjoutRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutRevenueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
