import { Injectable, Output, EventEmitter, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class CommonService extends EndpointFactory {
  private api_url: any = document.getElementsByTagName('base')[0].href;

  constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
    super(http, configurations, injector);
    this.api_url = configurations.baseUrl;
  }

  //#region "User"
  public GetUserName() {
    return this.http.get(this.api_url + '/api/fetchusername', { responseType: 'text' });
  }
  //#endregion
  public FetchApplicationList() {
    return this.http.post(this.api_url + '/api/managepermission/fetchapplicationlist', null, this.getRequestHeaders());
  }
  public PostDeleteApplication(rqhdr: object) {
    return this.http.post(this.api_url + '/api/managepermission/deleteapplication', rqhdr, this.getRequestHeaders());
  }
  public PostAddUpdateApplication(rqhdr: object) {
    return this.http.post(this.api_url + '/api/managepermission/addupdateapplication', rqhdr, this.getRequestHeaders());
  }

  public FetchApplicationRoles(rqhdr: object) {
    return this.http.post(this.api_url + '/api/managepermission/fetchapplicationroles', rqhdr, this.getRequestHeaders());
  }
  public PostDeleteApplicationRole(rqhdr: object) {
    return this.http.post(this.api_url + '/api/managepermission/deleteapplicationrole', rqhdr, this.getRequestHeaders());
  }
  public PostAddUpdateApplicationRole(rqhdr: object) {
    return this.http.post(this.api_url + '/api/managepermission/addupdateapplicationrole', rqhdr, this.getRequestHeaders());
  }
  public FetchUsers(rqhdr: object) {
    return this.http.post(this.api_url + '/api/managepermission/fetchapplicationusers', rqhdr, this.getRequestHeaders());
  }
  public FetchUserDetail(rqhdr: object) {
    return this.http.post(this.api_url + '/api/managepermission/fetchapplicationuserdetail', rqhdr, this.getRequestHeaders());
  }
  public DeleteApplicationUserDetail(rqhdr: object) {
    return this.http.post(this.api_url + '/api/managepermission/deleteapplicationuserdetail', rqhdr, this.getRequestHeaders());
  }
  public PostUpdateApplicationUser(rqhdr: object) {
    return this.http.post(this.api_url + '/api/managepermission/updateapplicationuserdetail', rqhdr, this.getRequestHeaders());
  }
}
