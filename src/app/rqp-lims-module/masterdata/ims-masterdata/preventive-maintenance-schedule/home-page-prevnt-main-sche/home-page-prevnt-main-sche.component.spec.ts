import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePagePrevntMainScheComponent } from './home-page-prevnt-main-sche.component';

describe('HomePagePrevntMainScheComponent', () => {
  let component: HomePagePrevntMainScheComponent;
  let fixture: ComponentFixture<HomePagePrevntMainScheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePagePrevntMainScheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePagePrevntMainScheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
