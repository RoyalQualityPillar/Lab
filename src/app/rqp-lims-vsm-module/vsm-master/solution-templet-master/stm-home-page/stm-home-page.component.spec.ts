import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StmHomePageComponent } from './stm-home-page.component';

describe('StmHomePageComponent', () => {
  let component: StmHomePageComponent;
  let fixture: ComponentFixture<StmHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StmHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StmHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
