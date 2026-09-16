import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTypeHomePageComponent } from './material-type-home-page.component';

describe('MaterialTypeHomePageComponent', () => {
  let component: MaterialTypeHomePageComponent;
  let fixture: ComponentFixture<MaterialTypeHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTypeHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialTypeHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
