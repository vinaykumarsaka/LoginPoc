import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    
    if(!this.authService.isLoggedIn())
    {
    this.router.navigate(['/signin']);
    }
  }

}
