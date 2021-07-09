import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  public host:string ="http://localhost:8080";

  constructor(public http:HttpClient) { }


  public getVilles(){
    console.log(this.host);
    return this.http.get(this.host+"/villes");
  }

  getCinemas(v: { _links: { cinemas: { href: string; }; }; }){
    return this.http.get(v._links.cinemas.href);

  }

  getSalles(c: { _links: { salles: { href: string; }; }; }) {
    return this.http.get(c._links.salles.href);

  }

  getProjections(salle: any) {
    let url=salle._links.projections.href.replace("{?projection}","");
    return this.http.get(url+"?projection=p1");

  }

  getTicketsPlaces(p: { _links: { tickets: { href: string; }; }; }) {
    let url=p._links.tickets.href.replace("{?projection}","");
    return this.http.get(url+"?projection=ticketProj");
  }

  payerTickets(dataform: any) {
    return this.http.post(this.host+"/payerTickets",dataform)
  }
}
