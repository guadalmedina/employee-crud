import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmployeeService } from '../../services/employees.service';

@Component({
  selector: 'app-add',
  template: `
    <div class="row justify-content-center">
      <div class="col-xl-6">
        <h2>Add A New Employee</h2>
        <app-employee-form (submit)="service.add($event)"></app-employee-form>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent {
  constructor(readonly service: EmployeeService) {}
}
