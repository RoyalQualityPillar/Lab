import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambersShellMasterHomePageComponent } from './chambers-shell-master-home-page.component';

describe('ChambersShellMasterHomePageComponent', () => {
  let component: ChambersShellMasterHomePageComponent;
  let fixture: ComponentFixture<ChambersShellMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChambersShellMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChambersShellMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
