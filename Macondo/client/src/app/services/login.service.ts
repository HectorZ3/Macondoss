import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URI= 'http://localhost:3000/api'; //Backend
  constructor(private http:HttpClient) { }
  login(usrDataLogin:LoginModel){
    return this.http.post(`${this.API_URI}/login/login/`,usrDataLogin)
  }
}
