import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNameNoComponent } from './item-name-no.component';

describe('ItemNameNoComponent', () => {
  let component: ItemNameNoComponent;
  let fixture: ComponentFixture<ItemNameNoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [ ItemNameNoComponent ]
=======
      declarations: [ItemNameNoComponent]
>>>>>>> c1dd0cab77d773e794ac76c4925113411d037d5c
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
