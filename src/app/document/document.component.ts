import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Document } from '../models/document';
import { DocumentRank } from '../models/document-rank';
import { DocumentService } from '../services/document.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import *  as  rankJsonTemplate from './template_rank_service.json';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  flagButtonToggle: string;
  mainDocumentId: string;
  documentInfo: string;
  visibleRelevance: boolean;
  visiblePosition: boolean;
  visibleDocument: boolean;
  visibleRank: boolean;
  searchParameter = new FormControl();
  searchValue = new FormControl();
  dsDocument: MatTableDataSource<Document>;
  dsDocumentRank: MatTableDataSource<DocumentRank>;
  relevanceValues: any = [{ codigo: "1", desc: "high" }, { codigo: "2", desc: "medium" }, { codigo: "3", desc: "low" }, { codigo: "0", desc: "none" }];
  positionValues: any = [{ codigo: "1"}, { codigo: "2"}, { codigo: "3"}, { codigo: "4"}, { codigo: "5"}, { codigo: "6"}, { codigo: "7"}, { codigo: "8"}, { codigo: "9"}, { codigo: "10"}, { codigo: "0"}];
  //positionValues: any = [{ codigo: "1", selected: "false" }, { codigo: "2", selected: "true" }, { codigo: "3", selected: "true" }, { codigo: "4", selected: "true" }, { codigo: "5", selected: "true" }, { codigo: "6", selected: "true" }, { codigo: "7", selected: "true" }, { codigo: "8", selected: "true" }, { codigo: "9", selected: "true" }, { codigo: "10", selected: "true" }, { codigo: "0", selected: "0" }];
  searchOptions: any = [{ codigo: "id", desc: "Id" }, { codigo: "name", desc: "Name" }];;
  viewDocumentColumns: string[] = ['id', 'name_s', 'topics0_t'];
  viewDocumentRankColumns: string[];

  select(rankSelected: any, documentId: any){
    const rankSelectedList: Array<any> = this.dsDocumentRank.data.map(data => data.rank)
              .filter(rank => rank !== "0");
    const docDataRankTmp: Array<DocumentRank> = this.dsDocumentRank.data.filter(data => data.id !== documentId);
    docDataRankTmp.forEach(dataTmp => {
      dataTmp.rankOptions = dataTmp.rankOptions.filter(opt => !rankSelectedList.includes(opt.codigo));
      if(dataTmp.rank !== "0") {
        dataTmp.rankOptions = [{codigo: dataTmp.rank}, ...dataTmp.rankOptions];
      }
    });
    //let listPosition = this.positionValues.findIndex(obj => obj.codigo == rankSelected)
    console.log('rankSelected', rankSelected)
    //console.log('rankSelected.codigo', rankSelected.selected)
    //console.log('el valor de la lista', this.positionValues[this.positionValues.findIndex(obj => obj.codigo == rankSelected)].selected)
    // let positionSelectedState = this.positionValues[this.positionValues.findIndex(obj => obj.codigo == rankSelected)].selected;
    // this.positionValues[listPosition].selected = false
  }  
  constructor(private docservice: DocumentService, private changeDetectorRefs: ChangeDetectorRef) {
    console.log('visibleDocument', this.visibleDocument)
    this.dsDocument = new MatTableDataSource<Document>();
    this.dsDocumentRank = new MatTableDataSource<DocumentRank>();

  }

  ngOnInit(): void {
    this.getAllDocuments();
    this.flagButtonToggle = 'position';
    this.viewDocumentRankColumns = ['id', 'name_s', 'topics0_t', 'rank_position']
  }

  getAllDocuments() {
    this.docservice.getAllDocuments("*:*").then(
      (result: any) => {
        if (result) {
          this.dsDocument.data = result.response.docs;
          this.changeDetectorRefs.detectChanges();
        }
      }, error => {
        console.log(JSON.stringify(error));
      });
  }

  getSpecificDocuments() {
    let value = this.searchValue + ":" + this.searchParameter;
    this.docservice.getAllDocuments(value).then(
      (result: any) => {
        if (result) {
          this.dsDocument.data = result.response.docs;
          this.changeDetectorRefs.detectChanges();
        }
      }, error => {
        console.log(JSON.stringify(error));
      });
  }

  //funcion que obtiene el rank de documentos a partir del documento principal
  getDocumentRank(id, name) {
    this.mainDocumentId = id;
    this.documentInfo = id + " : " + name;
    this.visibleRank = true;
    this.visibleDocument = true;
    this.docservice.getDocumentRank(this.createBodyDocumentRank(id)).then(
      (result: any) => {
        if (result) {
          this.dsDocumentRank.data = result.response.docs;
          for (var value of this.dsDocumentRank.data) {
            value.rank = '0';
            value.rankOptions = [...this.positionValues];
          }
          console.log(JSON.stringify(this.dsDocumentRank.data));
          this.changeDetectorRefs.detectChanges();
        }
      }, error => {
        console.log(JSON.stringify(error));
      });
  }

  createBodyDocumentRank(id) {
    rankJsonTemplate.reference.document.id = id;
    console.log('rankJsonTemplate', JSON.stringify(rankJsonTemplate))
    let bodyJson: any = (rankJsonTemplate as any).default;

    return bodyJson
  }

  reRankDocument(document) {

    let resultRankJson = { "Model":"ranking-model","DocPrincipal": "id-principal-doc;", "Rank": "document-rank-respose" };
    resultRankJson.Rank = document.data;
    resultRankJson.DocPrincipal = this.mainDocumentId;
    resultRankJson.Model = this.flagButtonToggle;
    console.log("modelo", JSON.stringify(resultRankJson));
    this.docservice.sendRankFeedback(resultRankJson).then(
      (result: any) => {
        if (result) {
          console.log(result)
        }
      }, error => {
        console.log(error);
      });
  }

  onValChange(val: string) {
    this.visiblePosition = false;
    this.flagButtonToggle = val;
    console.log(this.flagButtonToggle)
    if (this.flagButtonToggle == 'position') {
      this.viewDocumentRankColumns = ['id', 'name_s', 'topics0_t', 'rank_position']
    } else {
      this.viewDocumentRankColumns = ['id', 'name_s', 'topics0_t', 'rank_relevance']
    }
  }

  backToDocuments() {
    this.visibleRank = false;
    this.visibleDocument = false;
  }
}
