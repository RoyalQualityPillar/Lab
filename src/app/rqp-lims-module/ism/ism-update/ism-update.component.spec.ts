import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsmUpdateComponent } from './ism-update.component';

describe('IsmUpdateComponent', () => {
  let component: IsmUpdateComponent;
  let fixture: ComponentFixture<IsmUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsmUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsmUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
