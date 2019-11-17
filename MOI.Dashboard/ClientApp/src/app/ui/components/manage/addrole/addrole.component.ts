import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener } from '@angular/core';
import { DialogType, AlertService } from '@app/services/alert.service';
import { CommonService } from '@app/services/common.service';
import { ModalService } from '@app/services/modalservice';
import { DxDataGridComponent } from 'devextreme-angular';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { fadeInOut } from '@app/theme/shared/animations/animation-constants';
import CustomStore from 'devextreme/data/custom_store';
import * as overlay from 'devextreme/ui/overlay';
import { AppTranslationService } from '@app/services/app-translation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addrole',
  templateUrl: './addrole.component.html',
  styleUrls: ['./addrole.component.scss'],
  animations: [fadeInOut]
})
export class AddroleComponent implements OnInit {
  @ViewChild(DxDataGridComponent, { static: true }) dataGrid: DxDataGridComponent;
  data: any;
  patrolid = 0;
  username: string;
  dataSource: any;
  applicationlistsrc: any;
  applicationid: number;
  applicationname: string;
  popupVisible: boolean;
  hdntrans = '';
  modaltitle = '';
  addPopupToolbarOptions = [
    {
      widget: 'dxButton',
      location: 'after',
      options: {
        text: 'حفظ',
        icon: 'feather icon-save',
        stylingMode: 'contained',
        type: 'success',
        onClick: this.onSaveBtnClick.bind(this)
      },
      toolbar: 'bottom'
    },
    {
      widget: 'dxButton',
      location: 'after',
      options: {
        text: 'إلغاء',
        icon: 'feather icon-x-circle',
        stylingMode: 'contained',
        type: 'danger',
        onClick: this.onCancelBtnClick.bind(this)
      },
      toolbar: 'bottom'
    }
  ];
  loadingVisible = false;
  constructor(private svc: CommonService, private modalService: ModalService, private cd: ChangeDetectorRef,
     private alertService: AlertService, private route: ActivatedRoute) {
    this.username = window.localStorage.getItem('UserName');
    this.showLoadPanel();
  }
  showLoadPanel() {
    this.loadingVisible = true;
  }

  ngOnInit() {
    this.route.data.
    subscribe(data => { this.applicationlistsrc = data.applist; this.applicationid = data.applist[0].id; });
    this.LoadData();
  }
  onShown() {
    setTimeout(() => {
      this.loadingVisible = false;
    }, 3000);
  }
  onEditorPreparingCustom(e) {
    e.editorOptions.disabled = e.parentType === 'dataRow' && e.dataField === 'id';

    // Register Esc key
    if (e.parentType === 'dataRow') {
      e.editorOptions.onInitialized = (arg) => {
        arg.component.registerKeyHandler('escape', () => {
            e.component.cancelEditData();
        });
      };
    }
  }
  LoadData() {
    const userid: string = window.localStorage.getItem('UserID');
    const rqhdr: object = {applicationid: this.applicationid};
    this.dataSource = new CustomStore({
      key: 'id',
      load: () => this.svc.FetchApplicationRoles(rqhdr)
        .toPromise()
        .then((data: any) => {
          return data;
        }),
      update: (key, values) => this.RowAdd(values, key)
        .toPromise()
        .then(() => {
          Swal.fire({
            html: '<font style="font-weight: bold;">' + 'تم إنشاء تفاصيل الحادث' + '</font>',
            type: 'success',
            timer: 2000,
            showConfirmButton: false,
            showCancelButton: false
          });
        }),
      insert: (values) => this.RowAdd(values, 0)
        .toPromise()
        .then(() => {
          Swal.fire({
            html: '<font style="font-weight: bold;">' + 'تم إنشاء تفاصيل الحادث' + '</font>',
            type: 'success',
            timer: 2000,
            showConfirmButton: false,
            showCancelButton: false
          });
        }),
      remove: (key) => this.RowDelete(key)
        .toPromise()
        .then((resp: any) => {
          const paredObject = JSON.parse(resp);
          if (paredObject.statusid === 1) {
            Swal.fire({
              html: '<font style="font-weight: bold;">' + 'تم حذف تفاصيل الحادث' + '</font>',
              type: 'success',
              timer: 2000,
              showConfirmButton: false,
              showCancelButton: false
            });
          } else {
            Swal.fire({
              html: '<font style="font-weight: bold;">' + paredObject.text + '</font>',
              type: 'error',
              timer: 2000,
              showConfirmButton: false,
              showCancelButton: false
            });
          }
        })
    });
  }

  onSaveBtnClick(e) {
    this.dataGrid.instance.saveEditData();
  }

  onCancelBtnClick(e) {
    this.dataGrid.instance.cancelEditData();
  }
  showConfirmation(e) {
    e.cancel = Swal.fire({
      title: '<strong>' + 'روى بتفصيل' + ' <u>' + e.data.name + '</u></strong>',
      html: 'هل أنت متأكد أنك تريد' + ' <font style="font-weight: bold;"></font> ',
      onBeforeOpen: () => {
        Swal.getContent().querySelector('font').textContent = 'حذف';
      },
      type: 'question',
      confirmButtonText: '<i class="feather icon-trash-2"></i> ' + 'حذف',
      cancelButtonText: 'إلغاء',
      focusCancel: true,
      showCloseButton: true,
      showCancelButton: true
    }).then((deleteIt) => {
      return !deleteIt.value;
    });
  }
  applicationChanged(e) {
    this.applicationid = e.value;
    this.LoadData();
  }
  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift(
      {
        location: 'before',
        widget: 'dxSelectBox',
        options: {
          width: '200px',
          items: this.applicationlistsrc,
          stylingMode: 'filled',
          value: this.applicationlistsrc[0].id,
          valueExpr: 'id',
          displayExpr: 'name',
          dropDownButtonTemplate: '<i class="dx-icon-filter custom-icon"></i>',
          onValueChanged: this.applicationChanged.bind(this)
        }
      },
      {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        onClick: this.refreshDataGrid.bind(this)
      }
    });

  }
  refreshDataGrid() {
    this.LoadData();

  }
  RowAdd(values, key) {
    const rqhdr: object = { applicationid: key, userid: this.username, name: values.name };
    return this.svc.PostAddUpdateApplicationRole(rqhdr);
  }

  RowDelete(key) {
    const rqhdr: object = { applicationid: key, userid: this.username };
    return this.svc.PostDeleteApplication(rqhdr);
  }
  cleardata() {
    this.applicationid = 0;
    this.applicationname = '';
  }

  showInfo() {

    this.popupVisible = true;
  }


  ClosePopup() {
    this.popupVisible = false;
  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (event.code === 'NumpadAdd') {
      this.dataGrid.instance.addRow();
    }
    if (event.code === 'Enter') {
      this.onSaveBtnClick(event);
    }
  }

}
