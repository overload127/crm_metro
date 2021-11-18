import * as qs from 'qs';
import {
  apiCMSPrivate,
} from "./instances";


export default class TPWorkService {
  static async createTPWork(datetimeStart, datetimeEnd, station, typeWorks, okolotok, users) {
    return apiCMSPrivate.post('service/report_of_work', {
      date_start: datetimeStart,
      date_end: datetimeEnd,
      station,
      tech_cards: typeWorks,
      okolotok,
      users,
      note: '',
    });
  };

  static async getTPWorks(dateStart, dateEnd, okolotokID, stationID, users, typeDU46, typeOrder, typePafu, typeJtp, techCards) {
    // debugger;
    return apiCMSPrivate.get('service/report_of_work', {
      params: {
        date_start: dateStart,
        date_end: dateEnd,
        okolotok: okolotokID,
        station: stationID,
        users,
        du46: typeDU46,
        order: typeOrder,
        pafu: typePafu,
        jtp: typeJtp,
        tech_cards: techCards,
      },
      paramsSerializer: params => qs.stringify(params, {
        arrayFormat: 'repeat'
      })
    });
  };
}

window.TPWorkService = TPWorkService;