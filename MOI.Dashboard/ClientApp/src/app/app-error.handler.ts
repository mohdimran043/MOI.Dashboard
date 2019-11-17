import { Injectable, ErrorHandler } from '@angular/core';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';


@Injectable()
export class AppErrorHandler extends ErrorHandler {

    constructor() {
        super();
    }


    handleError(error: any) {

        // Swal.fire({
        //     title: 'Application Error',
        //     backdrop: 
        //         `rgba(123,0,0,0.4)
        //         center left
        //         no-repeat`,
        //     input: 'textarea',
        //     inputValue: error,
        //     showCancelButton: true,
        //     type: 'error'
        // });
        console.error(error);

        super.handleError(error);
    }
}
