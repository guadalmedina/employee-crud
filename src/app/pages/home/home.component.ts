import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, EmployeeService } from '../../services/employees.service';

@Component({
  selector: 'app-home',
  template: `
    <h2 class="mb-4">Our People</h2>
    <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mb-3">
      <app-employee-card
        *ngFor="let e of service.employees$ | async"
        [data]="e"
        (delete)="confirmDelete($event)">
      </app-employee-card>
    </div>
    <button class="btn btn-primary" (click)="goToAddPage()">Add a new employee</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  deletingEmployee: Employee | undefined;

  constructor(private router: Router, readonly service: EmployeeService) {}

  goToAddPage() {
    this.router.navigateByUrl('/add');
  }

  confirmDelete(e: Employee) {
    this.service.delete(e.id);
  }
}
