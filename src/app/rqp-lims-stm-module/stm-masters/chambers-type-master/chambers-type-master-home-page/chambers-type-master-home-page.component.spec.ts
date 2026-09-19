import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambersTypeMasterHomePageComponent } from './chambers-type-master-home-page.component';

describe('ChambersTypeMasterHomePageComponent', () => {
  let component: ChambersTypeMasterHomePageComponent;
  let fixture: ComponentFixture<ChambersTypeMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChambersTypeMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChambersTypeMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
