import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsmInitiatorComponent } from './ism-initiator.component';

describe('IsmInitiatorComponent', () => {
  let component: IsmInitiatorComponent;
  let fixture: ComponentFixture<IsmInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsmInitiatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsmInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
