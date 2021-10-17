import {
  apiCMSPublic,
} from "./instances";


export default class WikiService {
  static async getTP() {
    return apiCMSPublic.get('wiki/tp/', {});
  };

  static async getStation() {
    return apiCMSPublic.get('wiki/station/', {});
  };
}