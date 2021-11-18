import {
  authApi,
} from "./instances";


export default class AuthService {
  static async login(username, password, capcha) {
    debugger;
    return authApi.post('token/login', {
      username,
      password,
      g_recaptcha_response: capcha
    });
  }

  static async logout() {
    return authApi.post('token/logout', {});
  }
}