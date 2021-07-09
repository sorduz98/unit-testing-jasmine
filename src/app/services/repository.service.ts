import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import * as env from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { PINS } from './mocks/pins';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private _environment = env.environment;
  get environment() { return this._environment };
  constructor(private api: ApiService) {}

  public getPins() {
    if (this.environment.mocks) {
      return of(PINS);
    } else {
      return this.api.get('');
    }
  }

  public savePins(body) {
    if (this.environment.mocks) {
      return of(body);
    } else {
      return this.api.post('', body);
    }
  }

  public updatePin(id, body) {
    if (this.environment.mocks) {
      return of(body);
    } else {
      return this.api.put('/' + id, body);
    }
  }
}
