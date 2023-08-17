import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './develop-lab/home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IconModule } from './icon.module';
import { NavMenuComponent } from './develop-lab/nav-menu/nav-menu.component';
import { RouterModule } from '@angular/router';
import { TemplateFieldWriteComponent } from './web/template-field/write/template-field.write.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { UofxTranslateLoader } from './translate-loader';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  NgModule,
} from '@angular/core';
import {
  MenuModule,
  SidebarModule,
  ToolbarModule,
} from '@syncfusion/ej2-angular-navigations';

// #region i18n services
export function I18nHttpLoaderFactory(http: HttpClient) {
  return new UofxTranslateLoader(http);
}

const I18NSERVICE_MODULES = [
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: I18nHttpLoaderFactory,
      deps: [HttpClient],
    },
    defaultLanguage: 'zh-TW',
    useDefaultLang: true,
  }),
];

//#endregion

const EJS_MODULES = [MenuModule, SidebarModule, ToolbarModule];

/*修改*/
/*新增RouterModule.forRoot的path，並在裡面import module的路徑和載入的mocule className*/
@NgModule({
  declarations: [AppComponent, NavMenuComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: TemplateFieldWriteComponent, pathMatch: 'full' },
      {
        path: 'template-field',
        loadChildren: () => import('./web/template-field/template-field.module').then((m) => m.TemplateFieldModule)
      }
    ]),
    ...I18NSERVICE_MODULES,
    ...EJS_MODULES,
    IconModule.forRoot(),
  ],
  providers: [{ provide: 'BASE_HREF', useFactory: Helper.getBaseHref }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule {}
