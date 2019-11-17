import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import * as  Keycloak from 'keycloak-js';
import { DBkeys } from './db-keys';
import { KeycloakInstance } from 'keycloak-js';



@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class AppKeyCloakService {
  private KeycloakObj: any = Keycloak;
  public keycloakAuth: KeycloakInstance;

  constructor(private keycloakService: KeycloakService) { }

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      // this.keycloakService.getKeycloakInstance().idTokenParsed
      // IF U USE THE BELOW CODE IT WILL RETURN USER PROFILE COULDNOT BE LOADED ISSUE
      // this.keycloakService.init({
      //   config: {
      //     url: 'http://keycloak.microshit.org:8080/auth',
      //     realm: 'MOI.org',
      //     clientId: 'patrol-app',
      //     credentials: {
      //       secret: 'fbe4cece-c106-40e4-8e71-06b3c8d7fda9',
      //     }
      //   },
      //   initOptions: {
      //     onLoad: 'login-required',
      //     checkLoginIframe: false
      //   },
      //   enableBearerInterceptor: true,
      //   bearerExcludedUrls: ['/assets', '/clients/public']
      // }).then(resp => { resolve(); }).catch((reason) => { console.error(reason); });
      // });


      const config = {
        'url': 'http://keycloak.microshit.org:8080/auth',
        'realm': 'MOI.org',
        'clientId': 'patrol-app',
        'credentials': {
          'secret': 'fbe4cece-c106-40e4-8e71-06b3c8d7fda9'
        }
      };
      this.keycloakAuth = new this.KeycloakObj(config);
      this.keycloakAuth.init({ onLoad: 'login-required' }).success(() => {
        this.keycloakAuth.loadUserInfo();
        resolve();
      }).error(() => {
        reject();
      });
    });

  }

}
