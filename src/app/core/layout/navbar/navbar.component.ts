import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

interface NavigablePage {
  path: string;
  translation: string;
}

@Component({
  selector: 'pgd-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    TranslatePipe,
  ],
})
export class NavbarComponent {
  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  private translateService = inject(TranslateService);

  protected pagesList: NavigablePage[] = [
    {
      path: 'register',
      translation: 'navbar.menu.registerPage',
    },
    { path: 'login', translation: 'navbar.menu.loginPage' },
    { path: '', translation: 'navbar.menu.homePage' },
  ];

  protected isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  protected changeLanguage(languageCode: string): void {
    this.translateService.use(languageCode); // "pl" or "en"
  }
}
