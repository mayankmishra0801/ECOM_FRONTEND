import { TestBed } from '@angular/core/testing';

import { WishlistCartService } from './wishlist-cart.service';

describe('WishlistCartService', () => {
  let service: WishlistCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
