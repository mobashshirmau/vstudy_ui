import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestSetComponent } from './quest-set.component';

describe('QuestSetComponent', () => {
  let component: QuestSetComponent;
  let fixture: ComponentFixture<QuestSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
