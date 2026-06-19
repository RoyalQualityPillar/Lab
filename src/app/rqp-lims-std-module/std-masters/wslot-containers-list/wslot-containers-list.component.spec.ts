import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WslotContainersListComponent } from './wslot-containers-list.component';

describe('WslotContainersListComponent', () => {
  let component: WslotContainersListComponent;
  let fixture: ComponentFixture<WslotContainersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WslotContainersListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WslotContainersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
