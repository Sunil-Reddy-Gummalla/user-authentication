import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://localhost:3000/user';
  getAll() {
    return this.http.get(this.apiUrl);
  }
  getbyCode(code: any) {
    return this.http.get(this.apiUrl + '/' + code);
  }
  registerUser(data: any) {
    return this.http.post(this.apiUrl, data);
  }
  updateUser(code: any, data: any) {
    return this.http.put(this.apiUrl + '/' + code, data);
  }

  isLoggedIn() { 
    return sessionStorage.getItem('username')!== null;
  }

  GetUserRole() {
    return sessionStorage.getItem('role')!== null? sessionStorage.getItem('role') : '';
  }

  getallUserRoles() {
    return this.http.get('http://localhost:3000/role');
  }
}
