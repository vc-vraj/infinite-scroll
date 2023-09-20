import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iuser } from '../models/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  userUrl = 'https://jsonplaceholder.typicode.com/users'

  constructor(private http: HttpClient) { }

  getUserData(pageNumber: number, pageSize: number): Observable<Iuser[]> {
    return this.http.get<Iuser[]>(`https://jsonplaceholder.typicode.com/photos?_start=${pageNumber}&_limit=${pageSize}`);
  }
}
