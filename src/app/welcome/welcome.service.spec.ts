import { TestBed } from '@angular/core/testing';

import { WelcomeService } from './welcome.service';

describe('WelcomeService', () => {
  let service: WelcomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelcomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check', () => {
    // Initial value should be false
    let testValue = true;
    service.checked.subscribe((value) => testValue = value);
    expect(testValue).toBeFalse();
    // Check should switch to true
    service.check();
    expect(testValue).toBeTrue();
  });
});
