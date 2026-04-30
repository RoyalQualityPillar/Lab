import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonESignatureComponent } from './common-e-signature.component';

describe('CommonESignatureComponent', () => {
  let component: CommonESignatureComponent;
  let fixture: ComponentFixture<CommonESignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonESignatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonESignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
