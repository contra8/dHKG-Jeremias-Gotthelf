import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getTitlesAndUrlsOfAllDocuments(): Observable<any> {
    return this.http.get(endpoint + '/hkgcode/routines/getters/getTitlesAndUrlsOfAllXmlFiles.xqy').pipe(map(this.extractData));
  }

  getDocument(index): Observable<any> {
    return this.http.get(endpoint + '/hkgcode/routines/getters/getXMLDocumentAsJSON.xqy').pipe(map(this.extractData));
  }

  getDocumentParagraphs(index): Observable<any> {
    //return this.http.get(endpoint + '/hkgcode/routines/test_json.xql').pipe(
    //return this.http.get(endpoint + '/hkgcode/routines/getAllIdsOfG_Korrespondenz.xqm?coll=/db/data/Handschriften/G_Korrespondenz').pipe(
    //return this.http.get(endpoint + '/hkgcode/routines/getAllIdsOfG_Korrespondenz.xqm?coll=/db/data/Handschriften/G_Korrespondenz/Drittbriefe').pipe(

    console.log("index = " + index);
    // Call http://hkgb.germ.unibe.ch:8080/exist/rest/db/hkgcode/getXMLDocumentAsJSON.xql?pindex=20
    return this.http.get(endpoint + '/hkgcode/routines/getters/getXMLDocumentParagraphsAsJSON.xqy?pindex=' + index).pipe(map(this.extractData));
  }

  /*
  getProduct(id): Observable<any> {
    return this.http.get(endpoint + 'products/' + id).pipe(
      map(this.extractData));
  }

  addProduct (product): Observable<any> {
    console.log(product);
    return this.http.post<any>(endpoint + 'products', JSON.stringify(product), httpOptions).pipe(
      tap((product) => console.log(`added product w/ id=${product.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  updateProduct (id, product): Observable<any> {
    return this.http.put(endpoint + 'products/' + id, JSON.stringify(product), httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct (id): Observable<any> {
    return this.http.delete<any>(endpoint + 'products/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }
*/
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

const endpoint = 'http://hkgb.germ.unibe.ch:8080/exist/rest/db';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
};
/*
const endpoint = 'http://localhost:3000/api/v1/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
*/