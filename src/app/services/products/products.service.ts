import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../types/products';
import { 
  collection, 
  collectionData,
  deleteDoc, 
  doc, 
  docData, 
  Firestore, 
  getDocs, 
  setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private firestore: Firestore) { }

  getProducts(): Observable<Product[]> {
    // return this.http.get<Product[]>(this.url);
    const productsRef = collection(this.firestore, "products");
    return collectionData(productsRef) as Observable<Product[]>;
  }

  getProduct(id: number): Observable<Product> {
    // return this.http.get<Product>(`${this.url}/${id}`);
    const productRef = doc(this.firestore, "products", id.toString());
    return docData(productRef) as Observable<Product>;
  }

  addProduct(product: Product) {
    const productsRef = collection(this.firestore, "products");
    return getDocs(productsRef).then(snapshot => {
      const maxId = snapshot.docs.reduce((max, product) => Math.max(max, Number(product.id)), 0);
      product.id = maxId + 1;
      return this.updateProduct(product);
    });
  }

  updateProduct(product: Product){
    const productRef = doc(this.firestore, "products", product.id.toString());
    return setDoc(productRef, product, {merge: true});
  }

  deleteProduct(id: number) {
    const productRef = doc(this.firestore, "products", id.toString());
    return deleteDoc(productRef);
  }

  loadProductstoFirebase() {
    this.getProducts().subscribe(products => {
      products.forEach(product => {
        const productRef = doc(this.firestore, "products", product.id.toString());
        setDoc(productRef, product);
      })
    });
  }
}
