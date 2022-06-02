import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseUrl } from '../base-url';
import { IHouseholdApiResponse } from '../models/household.model';
import { IUserApiResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseUrl {

  constructor(private http: HttpClient) { 
    super();
  }

  getCurrentUser(authToken: string): Observable<IUserApiResponse> {
    return this.http.get<IUserApiResponse>(
      `${this.BASE_URL}/users/me`,

      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }),
      }
    );
  }

  getCurrentHousehold(id: string, authToken: string): Observable<IHouseholdApiResponse> {
    return this.http.get<IHouseholdApiResponse>(
      `${this.BASE_URL}/households/${id}`,

      {
        headers: new HttpHeaders({
          'content-type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }),
      }
    );
  }

  getAuthToken() {
    return environment.authToken;
  }
}
