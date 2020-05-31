import { Component, OnInit} from '@angular/core';
import { DocumentComponent } from './document/document.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  
  constructor(public document: DocumentComponent){}
  
  ngOnInit(): void {}
}
