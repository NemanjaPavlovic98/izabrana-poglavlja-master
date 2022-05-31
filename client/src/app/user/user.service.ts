import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHistory(id: string) {
    return this.http.get(`${this.API_URL}/history/${id}`);
  }
}
