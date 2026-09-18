import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtMasterHomePageComponent } from './ut-master-home-page.component';

describe('UtMasterHomePageComponent', () => {
  let component: UtMasterHomePageComponent;
  let fixture: ComponentFixture<UtMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtMasterHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
