import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  selectedTheme: string = 'blue';
  constructor(private authService: AuthServiceService, private router: Router, public sharedService: SharedService) { 
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.sharedService.themeChange.subscribe(thm => this.selectedTheme = thm);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/signin']);
  }
  
}
