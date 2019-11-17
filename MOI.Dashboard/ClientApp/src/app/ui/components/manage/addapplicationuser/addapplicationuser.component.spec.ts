import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddapplicationuserComponent } from './addapplicationuser.component';

describe('AddapplicationuserComponent', () => {
  let component: AddapplicationuserComponent;
  let fixture: ComponentFixture<AddapplicationuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddapplicationuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddapplicationuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
