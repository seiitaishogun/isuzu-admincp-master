export interface Filter {
  skip?: number
  limit?: number
  order?: any
  where?: any
  fields?: any
}

export class FilterUtils {
  public static ClearLimit(filter: Filter) {
    var clearedFilter: Filter = {};
    clearedFilter.where = filter.where;
    clearedFilter.order = filter.order;
    clearedFilter.fields = filter.fields;
    return clearedFilter;
  }
  public static KhachHang(filter:Filter) {
    if (filter.where["khachHangId"] != undefined && filter.where["khachHangId"] == "-1") {
      delete filter.where["khachHangId"]
    }
  }
  public static TenHang(filter: Filter, keyword:string) {
    if (keyword != undefined && keyword != '') {
      var st = '/.*' + keyword + '.*/i';
      filter.where["tenHang"] = { regexp: st };
    } else {
      delete filter.where["tenHang"];
    }
  }
  public static PhuongTienVanTai(filter: Filter, keyword:string) {
    if (keyword != undefined && keyword != '') {
      var st = '/.*' + keyword + '.*/i';
      filter.where["phuongTienVanTai"] = { regexp: st };
    } else {
      delete filter.where["phuongTienVanTai"];
    }
  }
  public static HangMucYeuCauGiamDinh(filter: Filter, keyword:string) {
    if (keyword != undefined && keyword != '') {
      var st = '/.*' + keyword + '.*/i';
      filter.where["hangMucYeuCauGiamDinh"] = { regexp: st };
    } else {
      delete filter.where["hangMucYeuCauGiamDinh"];
    }
  }

  public static NgayYeuCauDateRange(filter:Filter, startDate:Date, endDate: Date) {
    if (startDate != undefined && endDate != undefined)
      filter.where = Object.assign({}, filter.where, { and: [{ "thoiGian": { "lte": new Date(endDate) } }, { "thoiGian": { "gte": new Date(startDate) } }] });
    else {
      if (startDate != undefined)
        filter.where = Object.assign({}, filter.where, { "thoiGian": { "gte": new Date(startDate) } });
      if (endDate != undefined)
        filter.where = Object.assign({}, filter.where, { "thoiGian": { "lte": new Date(endDate) } });
    }
  }
}
