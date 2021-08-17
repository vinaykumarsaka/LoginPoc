import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthServiceService, private router: Router, public sharedService: SharedService) { }

  showFiller = false;
  selectedTheme = 'purple';
  ngOnInit(): void {
    
    if(!this.authService.isLoggedIn())
    {
    this.router.navigate(['/signin']);
    }
  }
  changeTheme(data){
    this.sharedService.setTheme(data);
  }

}
