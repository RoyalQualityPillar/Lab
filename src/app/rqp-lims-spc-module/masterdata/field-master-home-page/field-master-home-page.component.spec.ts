import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldMasterHomePageComponent } from './field-master-home-page.component';

describe('FieldMasterHomePageComponent', () => {
  let component: FieldMasterHomePageComponent;
  let fixture: ComponentFixture<FieldMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
