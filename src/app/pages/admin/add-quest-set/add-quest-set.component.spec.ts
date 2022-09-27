import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestSetComponent } from './add-quest-set.component';

describe('AddQuestSetComponent', () => {
  let component: AddQuestSetComponent;
  let fixture: ComponentFixture<AddQuestSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
