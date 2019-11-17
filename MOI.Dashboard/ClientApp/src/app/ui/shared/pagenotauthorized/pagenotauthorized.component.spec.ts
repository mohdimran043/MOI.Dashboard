import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenotauthorizedComponent } from './pagenotauthorized.component';

describe('PagenotauthorizedComponent', () => {
  let component: PagenotauthorizedComponent;
  let fixture: ComponentFixture<PagenotauthorizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagenotauthorizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagenotauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
