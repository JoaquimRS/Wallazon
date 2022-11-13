import { HttpHeaders, HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
    ) { }

  private formatErrors(error: any) {
    return throwError(error.error)
  }

  get(path: string, params: HttpParams = new HttpParams() || null ):Observable<any>{           
    return this.http.get(`${environment.api_url}${path}`, {params})
      .pipe(catchError(this.formatErrors))
  }


  // put


  post(path: string, body: any): Observable<any> {    
    return this.http.post(
      `${environment.api_url}${path}`,body
    ).pipe(catchError(this.formatErrors));
  }


  postFormData(path: string, formData: FormData): Observable<any> {     
    let token = this.jwtService.getToken()    
    return this.http.post(
      `${environment.api_url}${path}`,
      formData,
      {headers:{skip:"true",Authorization:`Token ${token}`}}
      ).pipe(catchError(this.formatErrors));
  }

  // delete

}

