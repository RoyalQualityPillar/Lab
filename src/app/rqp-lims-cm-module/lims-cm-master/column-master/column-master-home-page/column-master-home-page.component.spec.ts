import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnMasterHomePageComponent } from './column-master-home-page.component';

describe('ColumnMasterHomePageComponent', () => {
  let component: ColumnMasterHomePageComponent;
  let fixture: ComponentFixture<ColumnMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
