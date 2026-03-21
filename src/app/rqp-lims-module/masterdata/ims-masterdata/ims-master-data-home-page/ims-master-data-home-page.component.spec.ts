import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImsMasterDataHomePageComponent } from './ims-master-data-home-page.component';

describe('ImsMasterDataHomePageComponent', () => {
  let component: ImsMasterDataHomePageComponent;
  let fixture: ComponentFixture<ImsMasterDataHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImsMasterDataHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImsMasterDataHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
