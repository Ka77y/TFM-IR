import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Document } from '../models/document';
import { DocumentRank } from '../models/document-rank';
import { DocumentService } from '../services/document.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import  *  as  rankJsonTemplate  from  './template_rank_service.json';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  mainDocumentId: string;
  documentInfo: string;
  visibleDocument: boolean;
  visibleRank: boolean;
  searchParameter = new FormControl();
  searchValue = new FormControl();
  dsDocument: MatTableDataSource<Document>;
  dsDocumentRank: MatTableDataSource<DocumentRank>;
  rankValues:any =[{codigo:"1", desc:"high"},{codigo:"2", desc:"medium"},{codigo:"3", desc:"low"},{codigo:"0", desc:"none"}];
  searchOptions:any =[{codigo:"id", desc:"Id"},{codigo:"name", desc:"Name"}];;
  viewDocumentColumns: string[] = ['id','name_s','topics0_t'];
  viewDocumentRankColumns: string[] = ['id','name_s','topics0_t','rank'];
  

  constructor(private docservice: DocumentService, private changeDetectorRefs: ChangeDetectorRef){
    console.log('visibleDocument', this.visibleDocument)
    this.dsDocument = new MatTableDataSource<Document>();
    this.dsDocumentRank = new MatTableDataSource<DocumentRank>();
  }

  ngOnInit(): void {
    this.getAllDocuments();
  }

  getAllDocuments(){
    this.docservice.getAllDocuments("*:*").then(
      (result:any) => {
        if(result){
          this.dsDocument.data = result.response.docs;
          this.changeDetectorRefs.detectChanges();
        }
    }, error => {
      console.log(JSON.stringify(error));
    });
  }

  getSpecificDocuments(){
    let value = this.searchValue + ":" + this.searchParameter;
    this.docservice.getAllDocuments(value).then(
      (result:any) => {
        if(result){
          this.dsDocument.data = result.response.docs;
          this.changeDetectorRefs.detectChanges();
        }
    }, error => {
      console.log(JSON.stringify(error));
    });
  }

  //funcion que obtiene el rank de documentos a partir del documento principal
  getDocumentRank(id, name){
    this.mainDocumentId = id;
    this.documentInfo = id + " : " + name;
    this.visibleRank = true;
    this.visibleDocument = true;
    this.docservice.getDocumentRank(this.createBodyDocumentRank(id)).then(
      (result:any) => {
        if(result){
          this.dsDocumentRank.data = result.response.docs;
          for (var value of this.dsDocumentRank.data) {
            value.rank = '0';
          }
          console.log(JSON.stringify(this.dsDocumentRank.data));
          this.changeDetectorRefs.detectChanges();
        }
    }, error => {
      console.log(JSON.stringify(error));
    });
  }

  createBodyDocumentRank(id){
    rankJsonTemplate.reference.document.id = id;
    console.log('rankJsonTemplate', JSON.stringify(rankJsonTemplate))
    let bodyJson:  any  = (rankJsonTemplate  as  any).default;

    return bodyJson
  }

  reRankDocument(document){

    let resultRankJson = {"DocPrincipal":"id-principal-doc;","Rank":"document-rank-respose"};
    resultRankJson.Rank = document.data;
    resultRankJson.DocPrincipal = this.mainDocumentId;
    console.log("modelo",JSON.stringify(resultRankJson));
  }

  backToDocuments(){
    this.visibleRank = false;
    this.visibleDocument = false;
  }
}
