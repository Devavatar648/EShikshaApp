import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledCourses } from './enrolled-courses';

describe('EnrolledCourses', () => {
  let component: EnrolledCourses;
  let fixture: ComponentFixture<EnrolledCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrolledCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrolledCourses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
