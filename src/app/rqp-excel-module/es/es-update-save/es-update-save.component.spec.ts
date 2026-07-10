import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsUpdateSaveComponent } from './es-update-save.component';

describe('EsUpdateSaveComponent', () => {
  let component: EsUpdateSaveComponent;
  let fixture: ComponentFixture<EsUpdateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsUpdateSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsUpdateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
