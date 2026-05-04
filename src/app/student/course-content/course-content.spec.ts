import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseContent } from './course-content';

describe('CourseContent', () => {
  let component: CourseContent;
  let fixture: ComponentFixture<CourseContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
