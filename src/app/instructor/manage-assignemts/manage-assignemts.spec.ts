import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAssignemts } from './manage-assignemts';

describe('ManageAssignemts', () => {
  let component: ManageAssignemts;
  let fixture: ComponentFixture<ManageAssignemts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAssignemts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAssignemts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
