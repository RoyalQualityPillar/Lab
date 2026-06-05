import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdatePrevntMainScheComponent } from './create-update-prevnt-main-sche.component';

describe('CreateUpdatePrevntMainScheComponent', () => {
  let component: CreateUpdatePrevntMainScheComponent;
  let fixture: ComponentFixture<CreateUpdatePrevntMainScheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdatePrevntMainScheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdatePrevntMainScheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
