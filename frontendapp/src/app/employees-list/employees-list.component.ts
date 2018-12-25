import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ApiService } from '../api.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  private employees: Array<object> = [];
  private departments: Array<object> = [];
  private currentPage: Number = 0;
  private totalItems: Number = 0;
  private itemsPerPage = 20;
  private filterUserName = '';
  constructor(private apiService: ApiService, public ngxSmartModalService: NgxSmartModalService) { }

  ngOnInit() {
    this.getEmployees();
    this.getDepartments();
  }

  filterUsers(searchEvent) {
    this.filterUserName = searchEvent.srcElement.value;
    this.getEmployees(1);
  }

  public getEmployees(pageNum=1) {
    this.apiService.getEmployees(pageNum, this.filterUserName).subscribe((data: Array<object>) => {
      this.employees = data['results'];
      this.currentPage = data['page_number'];
      this.totalItems = data['count'];
      console.log(data);
    })
  }

  public getDepartments() {
    this.apiService.getDepartments().subscribe((data: Array<object>) => {
      this.departments = data['results'];
      console.log(data);
    })
  }

  public enableEditEmployee(e, emp) {
    e.preventDefault();
    console.log(emp);
    let data = {
      departments: this.departments,
      employee: emp
    }
    this.ngxSmartModalService.resetModalData('editEmpModal');
    this.ngxSmartModalService.setModalData(data, 'editEmpModal');
    this.ngxSmartModalService.getModal('editEmpModal').open();
  }

  public editEmployee(emp) {
    emp.empDepId = Number(emp.empDepId);
    console.log('Edit', emp);
    this.apiService.editEmployee(emp).subscribe(
      data => {
        console.log(data);
        let index = this.employees.findIndex(x => x['id'] === data['id']);
        this.employees[index] = data;
      },
      error => {
        console.warn("Error", error);
      });
    this.ngxSmartModalService.getModal('editEmpModal').close();
  }

  public confirmDeleteEmployee (e, emp) {
    console.log(emp)
    e.preventDefault();
    this.ngxSmartModalService.resetModalData('deleteEmpModal');
    this.ngxSmartModalService.setModalData(emp, 'deleteEmpModal');
    this.ngxSmartModalService.getModal('deleteEmpModal').open();
  }

  public deleteEmployee(empId) {
    console.log(empId);
    this.apiService.deleteEmployee(empId).subscribe(
    data => {
      this.employees = this.employees.filter(emp => emp['id'] !== empId);
      this.ngxSmartModalService.getModal('deleteEmpModal').close();
      console.log(data);
    },
    error => {
      console.warn("Error", error);
    })
  }
}
