import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class BaseApiService {
  protected readonly baseUrl = environment.apiUrl;

  constructor(protected http: HttpClient) { }
}
