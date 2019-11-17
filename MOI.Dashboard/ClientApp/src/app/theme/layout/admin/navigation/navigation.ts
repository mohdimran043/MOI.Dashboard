import { Injectable } from '@angular/core';
import { DBkeys } from '@app/services/db-keys';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  role: 'managepermission';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    'id': 'managepermission',
    'title': 'يدير',
    'type': 'group',
    'role': 'managepermission',
    'url': null,
    'classes': null,
    'children': [
      {
        'id': 'manageaddapplication',
        'title': 'إضافة التطبيق',
        'type': 'item',
        'url': '/manage/addapplication',
        'classes': 'nav-item',
        'icon': 'feather icon-package',
        'children': []
      },
      {
        'id': 'manageaddroles',
        'title': 'إضافة دور',
        'type': 'item',
        'url': '/manage/addrole',
        'classes': 'nav-item',
        'icon': 'feather icon-file-text',
        'children': []
      },
      {
        'id': 'managenewuser',
        'title': 'إضافة مستخدم',
        'type': 'item',
        'url': '/manage/addnewuser',
        'classes': 'nav-item',
        'icon': 'feather icon-file-text',
        'children': []
      }
    ]
  }
];

export const RoleUrlMapping = NavigationItems.map(ele => {
  return {
    role: ele.role,
    url: ele.children.map(subEle => subEle.url)
  };
});

@Injectable()
export class NavigationItem {
  get() {
    const user = JSON.parse(window.sessionStorage.getItem(DBkeys.CURRENT_USER));
    const user_roles = user ? Array.from(user['roles']) : [];
    const result =
      JSON.parse(
        JSON.stringify(
          NavigationItems.filter(item => user_roles.findIndex(ele => ele === item.role) !== -1)
        )
      );

    return result;
  }
}
