import { Component } from '@angular/core'
import { AuthenticationService, IdeaDetails } from '../authentication.service'

@Component({
    templateUrl: './listIdea.component.html'
})
export class listIdeaComponent {
    items: IdeaDetails
    constructor(private auth: AuthenticationService) { }
    ngOnInit() {
        this.auth.getAllIdea().subscribe(
            idea => {
               /*  idea.forEach(idea,function(value,key){
                    
                }); */
                this.items = idea['idea']
                /* console.log(`list idea: ${idea['idea'][0]['id']}`) */
            },
            err => {
                console.error(err)
            }
        )
    }
}