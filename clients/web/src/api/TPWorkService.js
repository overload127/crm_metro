import {
  apiCMSPrivate,
} from "./instances";


export default class TPWorkService {
  static async createTPWork(datetimeStart, datetimeEnd, station, typeWorks) {
    return apiCMSPrivate.post('service/report_of_work', {
      data_start: datetimeStart,
      data_end: datetimeEnd,
      station_id: station,
      type_work_list: typeWorks,
    });
  };

  static async getTPWorks(dateStart, dateEnd, okolotokID, stationID, userProfiles, typeDU46, typeOrder, techCards) {
    return apiCMSPrivate.get('service/report_of_work', {
      params: {
        date_start: dateStart,
        date_end: dateEnd,
        okolotok: okolotokID,
        station: stationID,
        userprofiles: userProfiles,
        du46: typeDU46,
        order: typeOrder,
        tech_cards: techCards,
      }
    });
  };
}

window.TPWorkService = TPWorkService;