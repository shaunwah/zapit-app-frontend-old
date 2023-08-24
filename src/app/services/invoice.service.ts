import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invoice} from "../interfaces/invoice";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private http = inject(HttpClient);
  readonly httpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json',
  );
  readonly apiUrl = '/api';

  getInvoices(
    like?: string | null,
    page?: number | null,
    size?: number | null,
    sortColumn?: string | null,
    sortDirection?: number | null,
  ): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/invoices`, {
      headers: this.httpHeaders,
      params: {
        like: like ?? [],
        page: page ?? [],
        size: size ?? [],
        sortColumn: sortColumn ?? [],
        sortDirection: sortDirection ?? [],
      },
    });
  }

  getInvoiceById(invoiceId: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/invoice/${invoiceId}`, {
      headers: this.httpHeaders,
    });
  }

  createInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}/invoices`, invoice, {
      headers: this.httpHeaders,
    });
  }

  updateInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.apiUrl}/invoices`, invoice, {
      headers: this.httpHeaders,
    });
  }

  deleteInvoice(invoiceId: number): Observable<Invoice> {
    return this.http.delete<Invoice>(`${this.apiUrl}/invoice/${invoiceId}`, {
      headers: this.httpHeaders,
    });
  }
}
