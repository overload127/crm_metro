import {
  apiCMSPublic,
} from "./instances";


export default class WikiService {
  static async getTP() {
    return apiCMSPublic.get('wiki/tp/', {});
  }
}