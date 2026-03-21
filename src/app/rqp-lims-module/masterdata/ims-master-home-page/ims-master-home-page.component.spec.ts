import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsMasterHomePageComponent } from './ims-master-home-page.component';

describe('ImsMasterHomePageComponent', () => {
  let component: ImsMasterHomePageComponent;
  let fixture: ComponentFixture<ImsMasterHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImsMasterHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImsMasterHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
