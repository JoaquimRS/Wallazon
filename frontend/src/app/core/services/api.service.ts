import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(error.error)
  }

  get(path: string, params: HttpParams = new HttpParams() || null ):Observable<any>{           
    return this.http.get(`${environment.api_url}${path}`, {params})
      .pipe(catchError(this.formatErrors))
  }


  // put


  post(path: string, body: Object = {}): Observable<any> {    
    return this.http.post(
      `${environment.api_url}${path}`,body
    ).pipe(catchError(this.formatErrors));
  }


  // delete

}

