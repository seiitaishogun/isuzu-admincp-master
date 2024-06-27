import { PLATFORM } from 'aurelia-pal';
import { FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
        PLATFORM.moduleName("./select2/index"),
        PLATFORM.moduleName("./btn-async/btn-async"),
        PLATFORM.moduleName("./enter-press/index"),
        PLATFORM.moduleName("./datepicker/datepicker"),
        PLATFORM.moduleName("./datepicker/date-range-picker"),
        PLATFORM.moduleName("./bootstrap-datepicker/bootstrap-datepicker.control"),
        PLATFORM.moduleName('./table/au-table'),
        PLATFORM.moduleName('./table/au-table-pagination'),
        PLATFORM.moduleName('./table/au-table-select'),
        PLATFORM.moduleName('./table/au-table-sort'),
        PLATFORM.moduleName('./loader/loader'),
        PLATFORM.moduleName('./editor/ckeditor'),
        PLATFORM.moduleName('./valueconverter/dateformat'),
        PLATFORM.moduleName('./switch/switchery'),
        PLATFORM.moduleName('./uploader/uploader'),
        PLATFORM.moduleName('./chartjs/chart'),
    ])
}
