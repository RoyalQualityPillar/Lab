import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpmUpdateSaveComponent } from './ipm-update-save.component';

describe('IpmUpdateSaveComponent', () => {
  let component: IpmUpdateSaveComponent;
  let fixture: ComponentFixture<IpmUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IpmUpdateSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpmUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
