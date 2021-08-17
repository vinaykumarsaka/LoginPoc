import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  theme: string
  themeChange: Subject<string> = new Subject<string>();
  constructor() { 
    this.themeChange.subscribe((value) => {
      this.theme = value
      debugger;
    })
  }

  
  setTheme(data){
    this.themeChange.next(data);
  }
}
