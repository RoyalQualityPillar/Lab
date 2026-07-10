import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MrsssHomeComponent } from './mrsss-home.component';

describe('MrsssHomeComponent', () => {
  let component: MrsssHomeComponent;
  let fixture: ComponentFixture<MrsssHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MrsssHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MrsssHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
