import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalHistoryComponent } from './journal-history.component';

describe('JournalHistoryComponent', () => {
  let component: JournalHistoryComponent;
  let fixture: ComponentFixture<JournalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
