import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorPage } from './instructor-page';

describe('InstructorPage', () => {
  let component: InstructorPage;
  let fixture: ComponentFixture<InstructorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
