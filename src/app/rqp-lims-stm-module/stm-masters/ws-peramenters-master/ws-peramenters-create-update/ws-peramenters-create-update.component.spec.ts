import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsPeramentersCreateUpdateComponent } from './ws-peramenters-create-update.component';

describe('WsPeramentersCreateUpdateComponent', () => {
  let component: WsPeramentersCreateUpdateComponent;
  let fixture: ComponentFixture<WsPeramentersCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WsPeramentersCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsPeramentersCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
