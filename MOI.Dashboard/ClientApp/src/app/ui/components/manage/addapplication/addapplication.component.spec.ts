import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddapplicationComponent } from './addapplication.component';

describe('AddapplicationComponent', () => {
  let component: AddapplicationComponent;
  let fixture: ComponentFixture<AddapplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
