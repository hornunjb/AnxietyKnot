import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Component} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggle } from '@angular/material/button-toggle';
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
