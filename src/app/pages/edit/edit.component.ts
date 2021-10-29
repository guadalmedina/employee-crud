import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee, EmployeeService } from '../../services/employees.service';

@Component({
  selector: 'app-edit',
  template: `
    <div class="row justify-content-center" *ngIf="currentEmployee">
      <div class="col-xl-6">
        <h2>Edit {{ currentEmployee.name }}'s Profile</h2>
        <app-employee-form [employee]="currentEmployee" (submit)="service.edit($event)"></app-employee-form>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditComponent {
  currentEmployee: Employee | undefined;

  constructor(private route: ActivatedRoute, readonly service: EmployeeService) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.service.employees$.subscribe(list => {
      this.currentEmployee = list.find(e => e.id === Number(id));
    });
  }
}
