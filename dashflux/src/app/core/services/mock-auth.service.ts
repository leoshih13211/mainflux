/*
 * Copyright (c) 2018
 * Mainflux
 *
 * SPDX-License-Identifier: Apache-2.0
 */
 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../store/models';

// export const MOCK_USER = {
//   email: 'asdf@asdf.com',
//   password: 'asdf'
// };
//
// export const EXISTING_USER = {
//   email: '1234@1234.com',
//   password: '1234'
// };
//
// export const INVALID_CREDENTIALS_USER = {
//   email: 'pera@pera.com',
//   password: 'pera'
// };

@Injectable()
export class MockAuthService {
  public signup(user: User): Observable<User> {
    return Observable.of(user).delay(5000);
  }

  public login(user: User): Observable<User> {
    return Observable.of(user).delay(1000);
  }
}
