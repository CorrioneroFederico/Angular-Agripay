import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { UsuarioService } from '../services/usuario.service';
import swal from "sweetalert2";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
})
export class UsuarioComponent implements OnInit {

  //*Atributos
  public usuarios:any[];
  form: FormGroup;

  //*Constructor
  constructor(
    private fb:FormBuilder,
    private router:Router,
    private _tokenService:TokenService,
    private _usuarioService:UsuarioService
    ) {
      this.usuarios=[];
      this.form = this.fb.group({
        firstName:[''],
        lastName:[''],
        address:[''],
        ssn:['',[Validators.required, Validators.pattern('^[0-9]{3}[-][0-9]{2}[-][0-9]{4}')]],
      });
  }

  ngOnInit(): void {
    this._usuarioService.getUsuario().subscribe(
      usuarios => { this.usuarios = usuarios; },
      error => { let msjDerror = <any>error; console.log(msjDerror);
      }
    );
  }


  public create(event:Event):void{
    event.defaultPrevented;
    if(this.form.valid){
      this.usuarios.push(this.form.value);
      this.router.navigate(['/usuario']);
      swal.fire('Usuario creado',`Usuario ${this.form.get('firstName')?.value} ${this.form.get('lastName')?.value} agregado exitosamente.`, 'success');

      console.log("El valor es:\n"+this.usuarios[0].firstName);
    }
    /*this.usuarioService.create(this.usuario).subscribe(
      usuario => {
      this.router.navigate(['/usuario']);
      swal.fire('Cliente guardado',`Usuario ${usuario.nombre} ${usuario.apellido} creado exitosamente`, 'success');
    }
    )*/
  }



  get ssnValidation(){
    return this.form.get('ssn');
  }
}
