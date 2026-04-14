import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Objetivo, Fita } from '../models/objetivo';
import { environment } from '../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ObjetivoService {
    private baseUrl = environment.apiUrl;
    private apiUrl = this.baseUrl + '/objetivos';

    constructor(private http: HttpClient) { }

    getObjetivos(): Observable<Objetivo[]> {
        return this.http.get<Objetivo[]>(this.apiUrl);
    }

    getObjetivo(id: string): Observable<Objetivo> {
        return this.http.get<Objetivo>(`${this.apiUrl}/${id}`);
    }

    createObjetivo(objetivo: any): Observable<Objetivo> {
        return this.http.post<Objetivo>(this.apiUrl, objetivo);
    }

    updateObjetivo(id: string, objetivo: any): Observable<Objetivo> {
        return this.http.patch<Objetivo>(`${this.apiUrl}/${id}`, objetivo);
    }

    deleteObjetivo(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }


    addFita(objetivoId: string, fita: any): Observable<Objetivo> {
        return this.http.patch<Objetivo>(`${this.apiUrl}/add/${objetivoId}`, fita);
    }

    deleteFita(objetivoId: string, fitaId: string): Observable<Objetivo> {
        return this.http.patch<Objetivo>(`${this.apiUrl}/delete/${objetivoId}/${fitaId}`, {});
    }

    updateFita(objetivoId: string, fitaId: string, fita: any): Observable<Objetivo> {
        return this.http.patch<Objetivo>(`${this.apiUrl}/update/${objetivoId}/${fitaId}`, fita);
    }
}