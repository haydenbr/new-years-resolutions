import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { StorageService } from './storage.service'

@Injectable()
export class SettingsService {

  constructor(storage: StorageService) {}
}