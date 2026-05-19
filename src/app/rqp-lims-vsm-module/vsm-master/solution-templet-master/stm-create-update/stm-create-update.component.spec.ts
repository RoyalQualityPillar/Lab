import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StmCreateUpdateComponent } from './stm-create-update.component';

describe('StmCreateUpdateComponent', () => {
  let component: StmCreateUpdateComponent;
  let fixture: ComponentFixture<StmCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StmCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StmCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
