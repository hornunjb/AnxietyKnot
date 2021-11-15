import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptedEntryComponent } from './prompted-entry.component';

describe('PromptedEntryComponent', () => {
  let component: PromptedEntryComponent;
  let fixture: ComponentFixture<PromptedEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromptedEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromptedEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
