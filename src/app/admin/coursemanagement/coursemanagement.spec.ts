import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Coursemanagement } from './coursemanagement';

describe('Coursemanagement', () => {
  let component: Coursemanagement;
  let fixture: ComponentFixture<Coursemanagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Coursemanagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Coursemanagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
