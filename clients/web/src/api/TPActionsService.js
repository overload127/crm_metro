import {
  apiCMSPrivate,
} from "./instances";


export default class TPActionService {
  static async createTPWork(datetimeStart, datetimeEnd, station, typeWorks) {
    return apiCMSPrivate.post('tp_work/create/', {
      data_start: datetimeStart,
      data_end: datetimeEnd,
      station_id: station,
      type_work_list: typeWorks,
    });
  };

  // static async getStation() {
  //   return apiCMSPublic.get('wiki/station/', {});
  // };
}