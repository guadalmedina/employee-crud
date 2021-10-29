import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <header class="bg-dark px-4 py-3 mb-5">
        <a routerLink=""><h1 class="m-0 fs-3">Employees Management</h1></a>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
    a {
      text-decoration: none;
      color: white;
    }
  `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
