import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AVAILABLE_LANGUAGES, PAGES_LIST } from './navbar.constants';

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
    MatMenuModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    TranslatePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
  private translateService = inject(TranslateService);

  protected AVAILABLE_LANGUAGES = AVAILABLE_LANGUAGES;
  protected PAGES_LIST = PAGES_LIST;

  protected currentLanguage$: Observable<string>;

  protected isHandset$: Observable<boolean>;

  constructor() {
    this.currentLanguage$ = this.initCurrentLanguage();
    this.isHandset$ = this.initIsHandset();
  }

  private initCurrentLanguage(): Observable<string> {
    return this.translateService.onLangChange.pipe(
      map((mapChangeEvent) => mapChangeEvent.lang),
      map((lang) =>
        AVAILABLE_LANGUAGES.find(
          (availableLanguage) => availableLanguage.languageCode === lang,
        ),
      ),
      map((selectableLanguage) => selectableLanguage?.translation || ''),
    );
  }

  private initIsHandset(): Observable<boolean> {
    return this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay(),
    );
  }

  protected changeLanguage(languageCode: string): void {
    this.translateService.use(languageCode); // "pl" or "en"
  }
}
