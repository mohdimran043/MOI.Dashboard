import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CustomRequestInterceptor } from './services/custom.request.interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {
  DxTreeViewModule, DxListModule, DxTreeListModule, DxScrollViewModule, DxValidatorModule,
  DxValidationSummaryModule, DxTextBoxModule, DxTextAreaModule
} from '../../node_modules/devextreme-angular';
import {
  DxLookupModule, DxMenuModule, DxContextMenuModule, DxSelectBoxModule, DxPopupModule, DxDataGridModule,
  DxButtonModule, DxTemplateModule, DxLoadIndicatorModule, DxLoadPanelModule, DxTabPanelModule,
  DxCheckBoxModule, DxDropDownBoxModule, DxAutocompleteModule, DxFormModule, DxNumberBoxModule
} from 'devextreme-angular';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';
import { AppComponent } from './app.component';
import { DragulaModule } from 'ng2-dragula/dist';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLogoComponent } from './theme/layout/admin/navigation/nav-logo/nav-logo.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { ChatUserListComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/chat-user-list.component';
import { FriendComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/friend/friend.component';
import { ChatMsgComponent } from './theme/layout/admin/nav-bar/nav-right/chat-msg/chat-msg.component';


import { DevextremeModule } from './imports/devextreme/devextreme.module';
import { AngularCdkModule } from './imports/angular-cdk/angular-cdk.module';
import { ChartsModule } from 'ng2-charts';
import { MomentModule } from 'ngx-moment';

// Application Services
import { AlertService } from './services/alert.service';
import { ConfigurationService } from './services/configuration.service';
import { AppTitleService } from './services/app-title.service';
import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';
import { NotificationService } from './services/notification.service';
import { NotificationEndpoint } from './services/notification-endpoint.service';
import { AccountService } from './services/account.service';
import { AccountEndpoint } from './services/account-endpoint.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { EndpointFactory } from './services/endpoint-factory.service';
import { ModalService } from './services/modalservice';
import { CommonService } from './services/common.service';
import { PNotifyService } from './services/pnotify.service';


// Custom errorhandler
import { AppErrorHandler } from './app-error.handler';
import { PagenotfoundComponent } from '../app/ui/shared/pagenotfound/pagenotfound.component';
import { PagenotauthorizedComponent } from '../app/ui/shared/pagenotauthorized/pagenotauthorized.component';
import { AddapplicationComponent } from './ui/components/manage/addapplication/addapplication.component';
import { AddroleComponent } from './ui/components/manage/addrole/addrole.component';
import { AddapplicationuserComponent } from './ui/components/manage/addapplicationuser/addapplicationuser.component';
import { applicationlistresolver } from './resolve/applicationlistresolver';
import { KeycloakService } from 'keycloak-angular';
import { AppKeyCloakService } from './services/app-key-cloak.service';
export function kcFactory(keycloakService: AppKeyCloakService) {
  return () => keycloakService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavLogoComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    ToggleFullScreenDirective,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ChatUserListComponent,
    FriendComponent,
    ChatMsgComponent,
    PagenotauthorizedComponent,
    PagenotfoundComponent,
    AddapplicationComponent,
    AddroleComponent,
    AddapplicationuserComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    ChartsModule,
    DragulaModule.forRoot(),
    DxSelectBoxModule, DxContextMenuModule, DxMenuModule, DxDropDownBoxModule,
    DxPopupModule, DxDataGridModule, DxButtonModule, DxTemplateModule, DxLoadIndicatorModule, DxLoadPanelModule,
    DxTabPanelModule, DxCheckBoxModule, DxAutocompleteModule, DxTreeViewModule, ChartsModule,
    DxFormModule, DxTreeListModule, DxScrollViewModule, DxValidatorModule, DxValidationSummaryModule,
    DxTextBoxModule, DxTextAreaModule, DxNumberBoxModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLanguageLoader
      }
    }),
    DevextremeModule,
    AngularCdkModule
  ],
    providers: [
        KeycloakService,
    NavigationItem,
    { provide: 'BASE_URL', useFactory: getBaseUrl },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    AlertService,
    ConfigurationService,
    AppTitleService,
    AppTranslationService,
    NotificationService,
    NotificationEndpoint,
    AccountService,
    AccountEndpoint,
    LocalStoreManager,
    EndpointFactory,
    ModalService,
    CommonService,
    applicationlistresolver,
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomRequestInterceptor,
      multi: true
    }
        , PNotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}
