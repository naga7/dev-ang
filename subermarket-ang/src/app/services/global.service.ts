import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http : HttpClient) 
  {}
    getallproducts():Observable<any>{
      return this.http.get("http://localhost:3000/api/product")
    }
   getSingleproduct(productid:any):Observable<any>{
    return this.http.get(`http://localhost:3000/api/product/single/${productid}`)
   }
   login(obj : any):Observable<any>{
    return this.http.post("http://localhost:3000/api/user/login_account",obj)
  }
  authUser():Observable<any>{
    return this.http.get("http://localhost:3000/api/user/profile")
  }
}
