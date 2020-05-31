import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const DOCUMENT_URL = "http://localhost:8983/solr/documents";
const RANK_URL = "http://localhost:8081";
const headers = new HttpHeaders();

@Injectable()
export class DocumentService {

  constructor(private http: HttpClient) { 
    console.log("entrooooooooooooooooooo")
  }

  createHeader() {
    var header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json');
    header = header.set("Access-Control-Allow-Origin", "*");
    header = header.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    return header
  }

  getAllDocuments(searchParameter: String){
    return new Promise((resolve, reject) => {
      let url = DOCUMENT_URL + "/select?q=" + searchParameter;
      this.http.get(url).subscribe(
        data => {
          resolve(data)
        }, error => {
          reject(error)
          console.log(error);
        })
      })
  }
  
  getDocumentRank(bodyJson){
    return new Promise((resolve, reject) => {
      let url = RANK_URL + "/ranks";
      this.http.post(url, bodyJson, { headers: this.createHeader()}).subscribe(
        data => {
          resolve(data)
        }, err => {
          reject(err)
        })
      })
  }
}