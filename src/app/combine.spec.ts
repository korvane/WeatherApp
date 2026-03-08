import { TestBed } from '@angular/core/testing';

import { Combine } from './combine';

describe('Combine', () => {
  let service: Combine;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Combine);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
