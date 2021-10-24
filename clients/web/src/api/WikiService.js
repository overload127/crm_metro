import {
  apiCMSPublic,
} from "./instances";


export default class WikiService {
  static async getTechCards() {
    return apiCMSPublic.get('wiki/tp/', {});
  };

  static async getStations() {
    return apiCMSPublic.get('wiki/station/', {});
  };
}