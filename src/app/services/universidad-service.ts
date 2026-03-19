import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Universidad } from '../models/universidad';

@Injectable({
  providedIn: 'root',
})
export class UniversidadService {
  private apiUrl = 'http://localhost:1337/universidades';

  constructor(private http: HttpClient) {}

  getUniversidades(): Observable<Universidad[]> {
    return this.http.get<Universidad[]>(this.apiUrl);
  }

  getUniversidad(id: string): Observable<Universidad> {
    return this.http.get<Universidad>(`${this.apiUrl}/${id}`);
  }

  createUniversidad(universidad: Universidad): Observable<Universidad> {
    return this.http.post<Universidad>(this.apiUrl, universidad);
  }

  updateUniversidad(id: string, universidad: Universidad): Observable<Universidad> {
    return this.http.put<Universidad>(`${this.apiUrl}/${id}`, universidad);
  }

  deleteUniversidad(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
