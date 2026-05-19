import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CluCreateUpdateComponent } from './clu-create-update.component';

describe('CluCreateUpdateComponent', () => {
  let component: CluCreateUpdateComponent;
  let fixture: ComponentFixture<CluCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CluCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CluCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
