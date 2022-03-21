import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalOptionComponent } from './journal-option.component';

describe('JournalOptionComponent', () => {
  let component: JournalOptionComponent;
  let fixture: ComponentFixture<JournalOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
