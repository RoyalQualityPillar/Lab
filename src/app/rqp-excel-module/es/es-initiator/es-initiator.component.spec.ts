import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsInitiatorComponent } from './es-initiator.component';

describe('EsInitiatorComponent', () => {
  let component: EsInitiatorComponent;
  let fixture: ComponentFixture<EsInitiatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsInitiatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsInitiatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
