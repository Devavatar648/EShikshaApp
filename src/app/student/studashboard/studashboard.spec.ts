import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Studashboard } from './studashboard';

describe('Studashboard', () => {
  let component: Studashboard;
  let fixture: ComponentFixture<Studashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Studashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Studashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
