import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistortionDialogComponent } from './distortion-dialog.component';

describe('DistortionDialogComponent', () => {
  let component: DistortionDialogComponent;
  let fixture: ComponentFixture<DistortionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistortionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistortionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
