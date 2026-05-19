import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CluHomePageComponent } from './clu-home-page.component';

describe('CluHomePageComponent', () => {
  let component: CluHomePageComponent;
  let fixture: ComponentFixture<CluHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CluHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CluHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
