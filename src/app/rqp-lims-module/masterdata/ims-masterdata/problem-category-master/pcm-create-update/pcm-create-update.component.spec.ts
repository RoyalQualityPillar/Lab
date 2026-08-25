import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcmCreateUpdateComponent } from './pcm-create-update.component';

describe('PcmCreateUpdateComponent', () => {
  let component: PcmCreateUpdateComponent;
  let fixture: ComponentFixture<PcmCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PcmCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcmCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
