import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = environment.apiUrl;
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

  getAllDocuments(){
    return new Promise((resolve, reject) => {
      console.log(API_URL)
      console.log(headers)
      this.http.get("http://127.0.0.1:8983/solr/documents/select?q=*:*&rows=10", { headers: this.createHeader() }).subscribe(
        data => {
          resolve(data)
        }, error => {
          reject(error)
        })
      })
  } 
}