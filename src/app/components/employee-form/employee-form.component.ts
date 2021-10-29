import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employees.service';

@Component({
  selector: 'app-employee-form',
  template: `
    <form #employeeForm="ngForm">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" name="name" required [(ngModel)]="localEmployee.name">
      </div>
      
      <div class="mb-3">
        <label for="surname" class="form-label">Surname</label>
        <input type="text" class="form-control" id="surname" name="surname" required [(ngModel)]="localEmployee.surname">
      </div>

      <div class="mb-3">
        <label for="position" class="form-label">Position</label>
        <select class="form-select" id="position" name="position" required [(ngModel)]="localEmployee.position">
          <option selected>Open this select menu</option>
          <option *ngFor="let p of service.positions$ | async">
            {{ p }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="birth" class="form-label">Date of birth</label>
        <input type="date" class="form-control" id="birth" name="birth" required [(ngModel)]="localEmployee.birthDate">
      </div>

      <div class="d-flex gap-2">
        <input type="submit" class="btn btn-primary" value="Submit" [disabled]="!employeeForm.form.valid" (click)="employeeForm.valid && onSubmit()">
        <button class="btn btn-secondary" (click)="employeeForm.reset(); submitted=false">Reset form</button>
      </div>
    </form>

    <div class="alert alert-success mt-2" role="alert" *ngIf="submitted">
      Success! <a routerLink="/">Go back to users</a>
    </div>
  `,
  styles: [`
    input.ng-invalid:not(.ng-pristine):not(:focus) {
      border-color: red;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit {

  @Input() employee: Employee;
  @Output() submit = new EventEmitter<Employee>();

  localEmployee: Partial<Employee> = {};
  submitted = false;

  constructor(readonly service: EmployeeService) {}

  onSubmit() {
    const id = Date.now();
    // we can assert localEmployee is completely defined because Angular wouldn't let us submit the form otherwise
    const newEmployee = { ...this.localEmployee as Employee, id };
    this.submit.emit(newEmployee);
    this.submitted = true;
    return false; // prevent default form submission since we're using our own "submit" output
  }

  ngOnInit() {
    // if an employee has been passed, we should populate the form with it
    if(this.employee) {
      this.localEmployee = { ...this.employee };
    }
  }
}
