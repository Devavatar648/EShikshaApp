import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { adminAuthGuard } from './admin-auth-guard';

describe('adminAuthGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
