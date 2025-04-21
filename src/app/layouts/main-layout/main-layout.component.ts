import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-main-layout',
  imports: [ButtonModule, RouterLink],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
