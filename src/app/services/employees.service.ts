import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

type Position = 'full-stack developer'
  | 'front-end developer'
  | 'sw admin'
  | 'help desk'
  | 'scrum master'
  | 'product manager';

export interface Employee {
  id: number;
  name: string;
  surname: string;
  position: Position;
  birthDate: Date;
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private list: Employee[] = [
    {
      id: 1,
      name: 'John',
      surname: 'Johnson',
      position: 'full-stack developer',
      birthDate: new Date('07/11/1984')
    },
    {
      id: 2,
      name: 'Alice',
      surname: 'Adams',
      position: 'front-end developer',
      birthDate: new Date()
    },
    {
      id: 3,
      name: 'Bob',
      surname: 'Baker',
      position: 'help desk',
      birthDate: new Date()
    }
  ];

  private sub = new BehaviorSubject<Employee[]>(this.list);
  private update() {
    this.sub.next(this.list);
  }

  private findIndexById(id: number) {
    const index = this.list.findIndex(listItem => listItem.id === id);
    return index;
  }

  employees$ = this.sub.asObservable();
  // https://ibillboard.com/api/positions had a CORS issue, so I hosted the positions JSON elsewhere
  // positions$ = this.http
  //   .get<{ positions: Position[] }>('https://api.jsonbin.io/b/616c9a31aa02be1d445acec9', {
  //     headers: { 'secret-key': environment.jsonBinKey }
  //   })
  //   .pipe(
  //     map(res => res.positions),
  //     shareReplay(1));
  
  // used not to waste fetches while developing
  positions$ = of([
    "full-stack developer",
    "front-end developer",
    "sw admin",
    "help desk",
    "scrum master",
    "product manager"
  ]);

  constructor(private http: HttpClient) {}

  // employee CRUD
  add(e: Employee) {
    this.list = [ ...this.list, e ];
    this.update();
  };

  edit(e: Employee) {
    const index = this.findIndexById(e.id);
    this.list[index] = { ...e };
    this.update();
  }

  delete(id: number) {
    const index = this.findIndexById(id);
    this.list.splice(index, 1);
    this.update();
  }
}
