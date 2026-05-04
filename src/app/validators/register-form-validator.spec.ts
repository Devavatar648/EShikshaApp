import { TestBed } from '@angular/core/testing';

import { RegisterFormValidator } from './register-form-validator';

describe('RegisterFormValidator', () => {
  let service: RegisterFormValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterFormValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
