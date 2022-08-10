import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string = 'http://localhost:8081/api/members';

  private httpHeaders = new HttpHeaders({
    'Content-Type':'application/json',
    'Accept':'application/json',
    'Authorization':`Bearer ${localStorage.getItem('token')}`
  });

  constructor(private http:HttpClient) { }

  getUsuarios():Observable<any[]>{
    return this.http.get<any>(this.url, {headers: this.httpHeaders}) as Observable<any[]>;
  }

  create(usuario:any):Observable<any>{
    return this.http.post<any>(this.url,usuario,{headers:this.httpHeaders});
  }
}
