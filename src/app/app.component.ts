import { Component, OnInit } from '@angular/core';
import {Document} from './models/document';
import {DocumentService} from './services/document.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  rankValues:any ;
  rankOfDocument:any;
  title = 'tfm-ir';
  dsDocument: MatTableDataSource<Document>;
  viewColumns: string[] = ['id','name_s','lang_s','source_s','topics0_t','score','rank'];
  documentArray: Document[] = [
    {
      "id":"ocds-0c46vo-0007-40540587_40540587",
      "name_s":"WP 213 Piling at CREWD for Tideway Central",
      "lang_s":"en",
      "source_s":"tbfy",
      "topics0_t":"3879",
      "score":1758.2242,
      "rank":"4"
   },
   {
      "id":"ocds-0c46vo-0020-english-heritage_1064_english-heritage_1064",
      "name_s":"Dymchurch Martello Tower 24 Conservation Repair Work 2019",
      "lang_s":"en",
      "source_s":"tbfy",
      "topics0_t":"3879",
      "score":1758.2242,
      "rank":"3"
   },
   {
      "id":"ocds-0c46vo-0022-FEB285743_FEB285743",
      "name_s":"Inspection Testing and Logging of Fire / Smoke Dampers Surveys",
      "lang_s":"en",
      "source_s":"tbfy",
      "topics0_t":"3879",
      "score":1758.2242,
      "rank":"2"
   },
   {
      "id":"ocds-0c46vo-0022-FEB344827_FEB344827",
      "name_s":"Civil Engineering Works, Bridge Maintenance, General Building Works, and Concrete Repairs",
      "lang_s":"en",
      "source_s":"tbfy",
      "topics0_t":"3879",
      "score":1758.2242,
      "rank":"1"
   }
  ];

  numero: any;
  documentoId: any;
  model:any;
  docs: any;
  
  

  constructor(private docservice: DocumentService){
    this.dsDocument = new MatTableDataSource<Document>();
    this.getDocuments();
    this.rankOfDocument = "";
    this.rankValues =[{codigo:"1", desc:"high"},{codigo:"2", desc:"medium"},{codigo:"3", desc:"low"}];
    this.model = {}
  }
  ngOnInit(): void {
    this.dsDocument.data = this.documentArray;
  }

  seleccionados:string[]=[];

  retrieveEntireDocument(document: Document){
     
  }

  getDocuments(){
    this.docservice.getAllDocuments().then(
      (result:any) => {
        if(result){
          console.log(result);  
        }
    }, error => {
      console.log(JSON.stringify(error));
    });
  }

  getRankDocument(documentooo){
    console.log("modelo", documentooo.data);
    //console.log(this.dsDocument.filteredData);
  }

}
