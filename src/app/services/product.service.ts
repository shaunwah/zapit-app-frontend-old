import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import {ProductCategory} from "../interfaces/product-category";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  readonly httpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json',
  );
  readonly apiUrl = '/api';

  getProductCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/product-count`, {
      headers: this.httpHeaders,
    });
  }

  getProducts(
    like?: string | null,
    page?: number | null,
    size?: number | null,
    sortColumn?: string | null,
    sortDirection?: number | null,
  ): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
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

  getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/product/${productId}`, {
      headers: this.httpHeaders,
    });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product, {
      headers: this.httpHeaders,
    });
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products`, product, {
      headers: this.httpHeaders,
    });
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/product/${productId}`, {
      headers: this.httpHeaders,
    });
  }

  getProductCategories(
    page?: number | null,
    size?: number | null,
    sortColumn?: string | null,
    sortDirection?: number | null,
  ): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.apiUrl}/product-categories`, {
      headers: this.httpHeaders,
      params: {
        page: page ?? [],
        size: size ?? [],
        sortColumn: sortColumn ?? [],
        sortDirection: sortDirection ?? [],
      },
    });
  }

  getProductCategoriesByMerchantId(merchantId: number): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.apiUrl}/merchant/${merchantId}/product-categories`, {
      headers: this.httpHeaders,
    });
  }

  getProductCategoryById(productCategoryId: number): Observable<ProductCategory> {
    return this.http.get<ProductCategory>(`${this.apiUrl}/product-category/${productCategoryId}`, {
      headers: this.httpHeaders,
    });
  }

  createProductCategory(productCategory: ProductCategory): Observable<ProductCategory> {
    return this.http.post<ProductCategory>(`${this.apiUrl}/product-categories`, productCategory, {
      headers: this.httpHeaders,
    });
  }

  updateProductCategory(productCategory: ProductCategory): Observable<ProductCategory> {
    return this.http.put<ProductCategory>(`${this.apiUrl}/product-categories`, productCategory, {
      headers: this.httpHeaders,
    });
  }

  deleteProductCategory(productCategoryId: number): Observable<ProductCategory> {
    return this.http.delete<ProductCategory>(`${this.apiUrl}/product-category/${productCategoryId}`, {
      headers: this.httpHeaders,
    });
  }
}
