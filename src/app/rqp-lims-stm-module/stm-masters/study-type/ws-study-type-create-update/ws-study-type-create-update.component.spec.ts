import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsStudyTypeCreateUpdateComponent } from './ws-study-type-create-update.component';

describe('WsStudyTypeCreateUpdateComponent', () => {
  let component: WsStudyTypeCreateUpdateComponent;
  let fixture: ComponentFixture<WsStudyTypeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WsStudyTypeCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsStudyTypeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
