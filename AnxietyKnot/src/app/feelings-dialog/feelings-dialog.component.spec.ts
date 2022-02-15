import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeelingsDialogComponent } from './feelings-dialog.component';

describe('FeelingsDialogComponent', () => {
  let component: FeelingsDialogComponent;
  let fixture: ComponentFixture<FeelingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeelingsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeelingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
