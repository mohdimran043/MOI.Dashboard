import { Injectable } from '@angular/core';
import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import { Observable, Subject, of } from 'rxjs';


@Injectable()
export class AppTranslationService {

  readonly defaultLanguage = "ar";
  private onLanguageChanged = new Subject<string>();
  languageChanged$ = this.onLanguageChanged.asObservable();

  constructor(private translate: TranslateService) {

    this.setDefaultLanguage(this.defaultLanguage);
  }

  addLanguages(lang: string[]) {
    this.translate.addLangs(lang);
  }

  setDefaultLanguage(lang: string) {
    this.translate.setDefaultLang(lang);
  }

  getDefaultLanguage() {
    return this.translate.defaultLang;
  }

  getBrowserLanguage() {
    return this.translate.getBrowserLang();
  }

  useBrowserLanguage(): string | void {
    let browserLang = this.getDefaultLanguage();

    if (browserLang.match(/ar|en|pt/)) {
      this.changeLanguage(browserLang);
      return browserLang;
    }
  }

  changeLanguage(language: string = "ar") {

    if (!language)
      language = this.translate.defaultLang;

    if (language != this.translate.currentLang) {
      setTimeout(() => {
        this.translate.use(language);
        this.onLanguageChanged.next(language);
      });
    }

    return language;
  }

  getTranslation(key: string | Array<string>, interpolateParams?: Object): string | any {
    return this.translate.instant(key, interpolateParams);
  }

  getTranslationAsync(key: string | Array<string>, interpolateParams?: Object): Observable<string | any> {
    return this.translate.get(key, interpolateParams);
  }

  getCurrentLanguage() {
    return this.translate.currentLang;
  }

}

export class TranslateLanguageLoader implements TranslateLoader {

  public getTranslation(lang: string): any {
    // var require: any;
    switch (lang) {
      case "en":
        return of(require("../../assets/locale/en.json"));
      case "ar":
        return of(require("../../assets/locale/ar.json"));

      default:
    }
  }
}
