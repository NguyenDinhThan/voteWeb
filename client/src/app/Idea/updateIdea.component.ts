import { Component } from '@angular/core'
import { AuthenticationService, Idea } from '../authentication.service'
import { Router } from '@angular/router'
import { db } from '../../../../database/db';


@Component({
    templateUrl: './createIdea.component.html'
})
export class updateIdeaComponent {
    credentials: Idea = {
        id: 0,
        name: '',
        description: ''
    }
    constructor(private auth: AuthenticationService, private router: Router) { }
    updateIdea() {
        this.auth.updateIdea(this.credentials).subscribe(
            () => {
                alert('idea đã được cập nhật')
                this.router.navigateByUrl('/listIdea')
            },
            err => {
                console.error(err)
            }
        )
    }
    /*   register(){
          var name= document.getElementById("first_name") as HTMLInputElement;
          //alert(name.value);
          //this.router.navigateByUrl ('/profile') 
      } */

}