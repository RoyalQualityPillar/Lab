import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambersMasterHomePageComponent } from './chambers-master-home-page.component';

describe('ChambersMasterHomePageComponent', () => {
  let component: ChambersMasterHomePageComponent;
  let fixture: ComponentFixture<ChambersMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChambersMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChambersMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
