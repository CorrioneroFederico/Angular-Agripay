import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private urlEndPoint:string = 'http://localhost:8081/auth';

  constructor(private http:HttpClient) { }

  getToken():Observable<any>{
    return this.http.post(this.urlEndPoint, {'username':"sarah", 'password':"connor"}) as Observable<any>;
  }
}
