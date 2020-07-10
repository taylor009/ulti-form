import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  setUser(user) {
    const userId = user.id;
    delete user.id;
    return this.http.post('https://jsonplaceholder.typicode.com/users/${user.id}', user);
  }

  getImages() {
    return this.http.get('https://jsonplaceholder.typicode.com/photos?albumId=1');
  }

}
