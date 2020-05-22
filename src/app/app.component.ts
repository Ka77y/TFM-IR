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
  viewColumns: string[] = ['id','name','topics0','topics1','topics2','rank'];
  documentArray: Document[] = [
    {id: "jrc31998F0428-en", 
    name: "98/428/JHA: Joint Action of 29 June 1998 adopted by the Council on the basis of Article K.3 of the Treaty on European Union on the creation of a European Judicial Network",
    topics0:"1422",
    topics1:"8473",
    topics2:"524",
    text:"test1",
    rank:"1"},
    {id: "jrc31998F04282-en", 
    name: "98/428/JHA: Joint Action of 29 June 1998 adopted by the Council on the basis of Article K.3 of the Treaty on European Union on the creation of a European Judicial Network",
    topics0:"1422",
    topics1:"8473",
    topics2:"524",
    text:"test2",
    rank:"1"},
    {id: "jrc31998F04283-en", 
    name: "98/428/JHA: Joint Action of 29 June 1998 adopted by the Council on the basis of Article K.3 of the Treaty on European Union on the creation of a European Judicial Network",
    topics0:"1422",
    topics1:"8473",
    topics2:"524",
    text:"test3",
    rank:"1"},
  ];

  numero: any;
  documentoId: any;
  model:any;
  docs: any;
  
  

  constructor(private docservice: DocumentService){
    this.dsDocument = new MatTableDataSource<Document>();
    this.getDocuments();
    this.rankOfDocument = "";
    this.rankValues =['1','2','3','4','5','6','7','8','9','10']
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
