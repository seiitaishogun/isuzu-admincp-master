import { PLATFORM } from 'aurelia-pal';

/**
 * Có nhiều dạng thông báo, tùy theo mức độ quan trọng mà hiển thị
 * alertXXX(): hiện ra giữa màn hình, QUAN TRỌNG: gây chú ý
 * showXXX(): hiện ra dòng thông báo góc trái: Ít gây chú ý
 */
export class Notify{

    public static alertSuccess() {
        PLATFORM.global.swal("Thành công", "Thực hiện thành công", "success");
    }
    public  showSuccess() {
        PLATFORM.global.swal("Thành công", "Thực hiện thành công", "success");
    }

    public static alertError(err) {
        PLATFORM.global.swal("Không thành công", `${err}`, "error");
    }
    public  showError(err) {
        PLATFORM.global.swal("Không thành công", `${err}`, "error");
    }

    public  static alertCancel() {
        PLATFORM.global.swal("Đã hủy", "Đã hủy thao tác", "warning");
    }

    public  showCancel() {
        PLATFORM.global.swal("Đã hủy", "Đã hủy thao tác", "warning");
    }

    public static alertConfirm(cb) {
        PLATFORM.global.swal({
            title: "Bạn có chắc chắn thực hiện?",
            text: "Hành động này không thể khôi phục!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Tôi chắc chắn!",
            cancelButtonText: "Không, ngưng thực hiện!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
            function (isConfirm) {
                cb(isConfirm)
            })
    }
    public static alertMessageConfirm(cb, message: string) {
        PLATFORM.global.swal({
            title: "Bạn có chắc chắn thực hiện?",
            text: message,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Tôi chắc chắn!",
            cancelButtonText: "Không, ngưng thực hiện!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
            function (isConfirm) {
                cb(isConfirm)
            })
    }
    public confirm(cb) {
        PLATFORM.global.swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                cb(isConfirm)
            })
    }
}
