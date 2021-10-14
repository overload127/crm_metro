import {
  authApi,
} from "./instances";


export default class AuthService {
  static async login(username, password) {
    return authApi.post('token/login', {
      username,
      password
    });
  }

  static async logout() {
    return authApi.post('token/logout');
  }
}