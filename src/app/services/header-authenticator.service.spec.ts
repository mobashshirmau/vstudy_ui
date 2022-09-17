import { TestBed } from '@angular/core/testing';

import { HeaderAuthenticatorService } from './header-authenticator.service';

describe('HeaderAuthenticatorService', () => {
  let service: HeaderAuthenticatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderAuthenticatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
