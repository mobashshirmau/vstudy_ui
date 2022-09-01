import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAnsComponent } from './view-ans.component';

describe('ViewAnsComponent', () => {
  let component: ViewAnsComponent;
  let fixture: ComponentFixture<ViewAnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
