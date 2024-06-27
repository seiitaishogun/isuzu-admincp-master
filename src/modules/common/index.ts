
export class MyTools {
  static toDate(date: string) { // hàm chuyển từ chuỗi DD/MM/YYYY sang kiểu ngày tháng
    let from = date.split("/");
    return new Date(Number.parseInt(from[2]), Number.parseInt(from[1]) - 1, Number.parseInt(from[0]));
  }

  static toMMDDYYYY(date: string) { // hàm chuyển chuỗi date từ DDMMYYYY sang MMDDYYYY
    let d = date.split("/");
    return d[1] + "/" + d[0] + "/" + d[2];
  }

  static lastDayofMonth(y: number, m: number): number { // m = 1 đến 12
    return new Date(y, m, 0).getDate();
  }

  static startOfWeek(date: Date) {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
  static lastOfWeek(date: Date) {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1) + 6;
    return new Date(date.setDate(diff));
  }
}
