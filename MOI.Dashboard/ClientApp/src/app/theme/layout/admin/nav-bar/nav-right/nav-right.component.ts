import { Component, DoCheck, OnInit, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { animate, style, transition, trigger } from '@angular/animations';
import { DattaConfig } from '@app/app-config';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { AuthService } from '@app/services/auth.service';
import { AccountService } from '@app/services/account.service';
import { AppTranslationService } from '@app/services/app-translation.service';
import { User } from '@app/models/user.model';
import { Observable } from 'rxjs';
import { CommonService } from '@app/services/common.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class NavRightComponent implements OnInit, DoCheck, AfterViewInit {
  public visibleUserList: boolean;
  public visibleUserBreakList: boolean;
  public chatMessage: boolean;
  public friendId: boolean;
  public dattaConfig: any;
  private user: User;
  public patrolBreakRequestCount = 0;
  public unReadMessageCount = 0;
  constructor(config: NgbDropdownConfig, private translateService: AppTranslationService,
    private authService: AuthService, private account: AccountService,
    private changeDetection: ChangeDetectorRef, private svc: CommonService) {
    config.placement = 'bottom-right';
    this.visibleUserList = false;
    this.visibleUserBreakList = false;
    this.chatMessage = false;
    this.dattaConfig = DattaConfig.config;
    this.user = account.currentUser;
  }
  get User() { return this.user; }
  ngOnInit() {
    // this.account.getNotificationChangedEvent().subscribe(m => {
    //   this.notificationList = m.notifications;
    // //  console.log(this.notificationList);
    // });
  }

  ngAfterViewInit() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-start',
      showConfirmButton: false,
      timer: 2000
    });

    Toast.fire({
      type: 'success',
      title: 'Signed in successfully'
    });
  }

  onChatToggle(friend_id) {
    this.friendId = friend_id;
    this.chatMessage = !this.chatMessage;
  }

  ngDoCheck() {
    if (document.querySelector('body').classList.contains('datta-rtl')) {
      this.dattaConfig['rtl-layout'] = true;
    } else {
      this.dattaConfig['rtl-layout'] = false;
    }
  }

  onConfigClick() {
    document.querySelector('#styleSelector').classList.add('open');
  }

  changeLanguage() {
    if (this.translateService.getCurrentLanguage() === 'en') {
      this.translateService.changeLanguage('ar');
    } else {
      this.translateService.changeLanguage('en');
    }
  }
  getPatrolBreakCount() {
    return this.patrolBreakRequestCount;
  }
  getUnReadMessageCount() {
    return this.unReadMessageCount;
  }
}
