import { Component } from '@angular/core'
import { AuthenticationService,IdeaDetails} from '../authentication.service'
import { Router } from '@angular/router'
import { db } from '../../../../database/db';
@Component({
    templateUrl: './deleteIdea.component.html'
})
export class deleteIdeaComponent {
    credentials: IdeaDetails = {
        id: 0,
        name: '',
        description: ''
    }
    constructor(private auth: AuthenticationService, private router: Router) { }
    deleteIdea() {
        this.auth.deleteIdea(this.credentials).subscribe(
            idea => {
                alert('idea đã được xóa')
                this.router.navigateByUrl('/listIdea')
            },
            err => {
                console.error(err)    
            }
        )
    }
}