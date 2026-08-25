import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WsMasterCreateUpdateComponent } from './ws-master-create-update.component';

describe('WsMasterCreateUpdateComponent', () => {
  let component: WsMasterCreateUpdateComponent;
  let fixture: ComponentFixture<WsMasterCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WsMasterCreateUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WsMasterCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
