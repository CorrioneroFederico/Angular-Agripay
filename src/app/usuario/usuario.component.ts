import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { UsuarioService } from '../services/usuario.service';
import swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {
  //*Atributos
  public usuarios: any[];
  public form: FormGroup;

  //*Constructor
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _tokenService: TokenService,
    private _usuarioService: UsuarioService
  ) {
    this.usuarios = [];
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      ssn: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{3}[-][0-9]{2}[-][0-9]{4}'),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.getToken();
    this.getUsuarios();
  }

  getToken() {
    if(localStorage.getItem('token')){
      this._tokenService.getToken().subscribe((res: any) => {
      localStorage.setItem('token', res.token);
    });
    }
  }

  getUsuarios(){
    this._usuarioService.getUsuarios().subscribe((res:any[])=>{
      console.log(res);
      res.forEach(r=>{
        this.usuarios.push(r);
      });
    });
  }

  public create(event: Event): void {
    event.defaultPrevented;
    if (this.form.valid) {
      this.usuarios.push(this.form.value);
      this._usuarioService.create(this.form.value).subscribe((usuario) => {
        this.router.navigate(['/usuario']);
        swal.fire(
          'Cliente guardado',
          `Usuario ${usuario.nombre} ${usuario.apellido} creado exitosamente`,
          'success'
        );
      });
    }
  }

  get ssnValidation() {
    return this.form.get('ssn');
  }
}
