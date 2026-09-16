import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTypeCreateUpdateComponent } from './material-type-create-update.component';

describe('MaterialTypeCreateUpdateComponent', () => {
  let component: MaterialTypeCreateUpdateComponent;
  let fixture: ComponentFixture<MaterialTypeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTypeCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialTypeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
