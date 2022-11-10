import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comment } from '../models';


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private _apiService : ApiService,
  ) { }

  getProduct(slug: any): Observable<Comment[]> {
    return this._apiService.get('/comments/'+slug)
  }
  
  addProduct(comment: any): Observable<any>{        
    return this._apiService.post('/comments/',comment)
  }
}
