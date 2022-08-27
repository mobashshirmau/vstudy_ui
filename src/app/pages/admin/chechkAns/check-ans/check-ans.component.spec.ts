import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAnsComponent } from './check-ans.component';

describe('CheckAnsComponent', () => {
  let component: CheckAnsComponent;
  let fixture: ComponentFixture<CheckAnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckAnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckAnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
