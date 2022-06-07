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

  httpOptions = {
    headers: new HttpHeaders()
  }
  authToken!: string;

  constructor(private http: HttpClient) { 
    super();
  }

  private buildRequestHeaders(): void {
    this.getAuthToken();
		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${this.authToken}`
		});
		this.httpOptions.headers = headers;
	}

  getCurrentUser(): Observable<IUserApiResponse> {
    this.buildRequestHeaders();
    return this.http.get<IUserApiResponse>(
      `${this.BASE_URL}/users/me`,
        this.httpOptions
    );
  }

  getCurrentHousehold(id: string): Observable<IHouseholdApiResponse> {
    this.buildRequestHeaders();
    return this.http.get<IHouseholdApiResponse>(
      `${this.BASE_URL}/households/${id}`,
      this.httpOptions
    );
  }

  getAuthToken() {
    this.authToken = environment.authToken;
    return this.authToken;
  }
}
