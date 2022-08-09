import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string = 'http://localhost:8081/api/members';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }

  getUsuario():Observable<any>{
    return this.http.get<any>(this.url);
  }

  create(usuario:any):Observable<any>{
    return this.http.post<any>(this.url,usuario,{headers:this.httpHeaders});
  }
}
