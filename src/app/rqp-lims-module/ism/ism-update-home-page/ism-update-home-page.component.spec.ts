import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsmUpdateHomePageComponent } from './ism-update-home-page.component';

describe('IsmUpdateHomePageComponent', () => {
  let component: IsmUpdateHomePageComponent;
  let fixture: ComponentFixture<IsmUpdateHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IsmUpdateHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsmUpdateHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
