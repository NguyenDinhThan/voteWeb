import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../authentication.service'
import { Router } from '@angular/router'
import { db } from '../../../../database/db';


@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    credentials: TokenPayload = {
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    }
    constructor(private auth: AuthenticationService, private router: Router) { }
    register() {
        this.auth.register(this.credentials).subscribe(
            () => {

                this.router.navigateByUrl('/login')
            },
            err => {
                if ((this.credentials.email.length === 0))
                    alert('ko được để trống email ')
                else if ((this.credentials.password.length) === 0)
                    alert('ko được để trống mật khẩu')
                else console.error(err)
            }
        )
    }
    /*   register(){
          var name= document.getElementById("first_name") as HTMLInputElement;
          //alert(name.value);
          //this.router.navigateByUrl ('/profile') 
      } */

}