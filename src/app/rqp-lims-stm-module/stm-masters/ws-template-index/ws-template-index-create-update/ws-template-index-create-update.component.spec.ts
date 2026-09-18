import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsTemplateIndexCreateUpdateComponent } from './ws-template-index-create-update.component';

describe('WsTemplateIndexCreateUpdateComponent', () => {
  let component: WsTemplateIndexCreateUpdateComponent;
  let fixture: ComponentFixture<WsTemplateIndexCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WsTemplateIndexCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsTemplateIndexCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
