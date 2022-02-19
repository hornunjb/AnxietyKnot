import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalDisplayComponent } from './journal-display.component';

describe('JournalDisplayComponent', () => {
  let component: JournalDisplayComponent;
  let fixture: ComponentFixture<JournalDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
