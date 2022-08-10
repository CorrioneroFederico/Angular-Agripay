import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../services/token.service';
import { UsuarioService } from '../services/usuario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {

  public usuarios: any[];
  public form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private _tokenService: TokenService,
    private _usuarioService: UsuarioService
  ) {
    this.usuarios = [];
    this.form = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      address: ['',Validators.required],
      ssn: ['',[Validators.required, Validators.pattern('^[0-9]{3}[-][0-9]{2}[-][0-9]{4}')]],
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
      );
      this.form.reset();
    }else{
      swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El SSN ingresado ya se encuentra registrado'
      })
    }
  }
}
