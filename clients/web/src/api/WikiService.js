import {
  apiCMSPrivate,
} from "./instances";


export default class WikiService {
  static async getTechCards() {
    return apiCMSPrivate.get('wiki/tech_card', {});
  };

  static async getStations() {
    return apiCMSPrivate.get('wiki/station', {});
  };

  static async getDeviceForWork() {
    return apiCMSPrivate.get('wiki/device_for_work', {});
  };

  static async getOkolotoks() {
    return apiCMSPrivate.get('wiki/okolotok', {});
  };
}