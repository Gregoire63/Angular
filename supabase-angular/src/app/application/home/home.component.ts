import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
  
})
export class HomeComponent {
  users: User[] = [];

  constructor(private ApiService: ApiService) { }

  ngOnInit() {
    this.ApiService.getUsers().subscribe(users => {
      this.users = users;
      console.log(this.users)
    });
  }
}
