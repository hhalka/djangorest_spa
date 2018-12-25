import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  API_URL = 'http://127.0.0.1:8000/api';

  constructor(private httpClient: HttpClient) {}

  getEmployees(pageNum, userName) {
    return this.httpClient.get(`${this.API_URL}/employees/?page=${pageNum}&username=${userName}`);
  }

  deleteEmployee(empId) {
    return this.httpClient.delete(`${this.API_URL}/employees/${empId}/`);
  }

  getDepartments() {
    return this.httpClient.get(`${this.API_URL}/departments/`);
  }

  editEmployee(emp) {
    console.log('service', emp);
    return this.httpClient.put(`${this.API_URL}/employees/${emp.id}/`, emp);
  }
}
