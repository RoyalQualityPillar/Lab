import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsmHomeComponent } from './ism-home.component';

describe('IsmHomeComponent', () => {
  let component: IsmHomeComponent;
  let fixture: ComponentFixture<IsmHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsmHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
