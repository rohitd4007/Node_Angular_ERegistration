import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RegisterServiceService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get("http://localhost:3000/api/v1/users/");
  }
  createUser(user: any): any {
    return this.http.post("http://localhost:3000/api/v1/users/", user);
  }
}
