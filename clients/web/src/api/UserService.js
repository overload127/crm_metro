import {
  apiCMSPrivate,
} from "./instances";


export default class UserService {
  static async getUserProfileMe() {
    return apiCMSPrivate.get('userprofile/me', {});
  }

  static async getUserProfileAll() {
    return apiCMSPrivate.get('userprofile/all', {});
  }
}