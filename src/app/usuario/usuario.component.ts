import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../services/token.service';
import { UsuarioService } from '../services/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit, OnDestroy {

  public usuarios: any[];
  public form: FormGroup;
  public tokenSuscribe: any;
  public interval:any;


  constructor(
    private fb: FormBuilder,
    private _tokenService: TokenService,
    private _usuarioService: UsuarioService
  ) {
    this.usuarios = [];
    this.form = this.fb.group({
      firstName: ['',[Validators.required,Validators.min(1)]],
      lastName: ['',[Validators.required,Validators.min(1)]],
      address: ['',[Validators.required,Validators.min(1)]],
      ssn: ['',[Validators.required, Validators.pattern('^[0-9]{3}[-][0-9]{2}[-][0-9]{4}')]],
    });
  }

  ngOnInit(): void {
    this.getToken();
    this.getUsuarios();
    this.timer();
  }

  ngOnDestroy(): void {
    this.tokenSuscribe.unsubscribe;
    clearInterval(this.interval);
  }

  getToken(): void {
    if(localStorage.getItem('token')){
      this.tokenSuscribe=this._tokenService.getToken().subscribe((res: any) => {
      localStorage.setItem('token', res.token);
    });
    }
  }

  getUsuarios(): void {
    this._usuarioService.getUsuarios().subscribe((res:any[])=>{
      this.usuarios=[];
      res.forEach(u=>{
        this.usuarios.push(u);
      });
    }).unsubscribe;
  }

  public create(event: Event): void {
    event.defaultPrevented;
    let repetido=false;
    this.usuarios.forEach( p => p.ssn == this.form.value.ssn? repetido=true:false);

    if (this.form.valid && !repetido) {
      this.usuarios.push(this.form.value);
      this._usuarioService.create(this.form.value).subscribe(
        usuario => {
          swal.fire(
            'Usuario guardado',
            `Usuario ${usuario.firstName} ${usuario.lastName} creado exitosamente`,
            'success'
          );
        }
      );       //Agrego un "unsubscribe" al final?
    }else{
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El SSN ingresado ya se encuentra registrado'
      })
    }
    clearInterval(this.interval);
    this.timer();
  }

  public timer(): void {
    this.interval= setInterval(() =>{
      this.getUsuarios();
    }, 120*1000);
  }
}
