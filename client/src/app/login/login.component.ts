import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../authentication.service'
import { Router } from '@angular/router'

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent {
    credentials: TokenPayload = {
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    }
    constructor(private auth: AuthenticationService, private router: Router) { }
    login() {
        this.auth.login(this.credentials).subscribe(
            () => {

                this.router.navigateByUrl('/profile')
            },
            err => {
                if ((this.credentials.email.length === 0) )
                    alert('ko được để trống email ')
                else if ((this.credentials.password.length) === 0)
                    alert('ko được để trống mật khẩu')
                else
                    alert('email hoặc mật khẩu ko đúng, xin thử lại!')
                console.error("err")
            }
        )
    }
}