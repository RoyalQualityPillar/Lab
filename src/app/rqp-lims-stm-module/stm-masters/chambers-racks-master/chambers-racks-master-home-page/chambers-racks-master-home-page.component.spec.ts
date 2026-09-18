import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambersRacksMasterHomePageComponent } from './chambers-racks-master-home-page.component';

describe('ChambersRacksMasterHomePageComponent', () => {
  let component: ChambersRacksMasterHomePageComponent;
  let fixture: ComponentFixture<ChambersRacksMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChambersRacksMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChambersRacksMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
