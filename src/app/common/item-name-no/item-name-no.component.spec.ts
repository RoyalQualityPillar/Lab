import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNameNoComponent } from './item-name-no.component';

describe('ItemNameNoComponent', () => {
  let component: ItemNameNoComponent;
  let fixture: ComponentFixture<ItemNameNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemNameNoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemNameNoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
