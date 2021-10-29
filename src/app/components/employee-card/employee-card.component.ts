import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../services/employees.service';

@Component({
  selector: 'app-employee-card',
  template: `
    <div class="card text-dark bg-light">
      <div class="card-body">
        <h5 class="card-title name-and-position">
          {{ e.name }} {{ e.surname }}
          <span class="badge rounded-pill bg-info text-dark position">{{ e.position }}</span>
        </h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ e.birthDate | date }}</h6>
      </div>
      <div class="btn-group">
      <a class="btn btn-secondary btn-sm" [routerLink]="['edit', e.id]">
          <i class="fas fa-user-edit"></i>
          Edit
        </a>
        <button class="btn btn-secondary btn-sm" *ngIf="!deleting" (click)="deleting = true">
          <i class="fas fa-user-minus"></i>
          Delete
        </button>
        <button class="btn btn-sm btn-danger" *ngIf="deleting" (click)="confirmDelete(e)">
          <i class="fas fa-user-minus"></i>
          Click again to delete {{ e.name }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .name-and-position {
      display: flex;
      justify-content: space-between;
    }
    .position {
      font-size: 12px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeCardComponent {
  @Input('data') e: Employee;
  @Output() delete = new EventEmitter<Employee>();

  deleting = false;

  confirmDelete(e: Employee) {
    this.delete.emit(e);
    this.deleting = false;
  }
}
