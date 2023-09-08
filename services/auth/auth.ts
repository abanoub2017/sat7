import api from "@/services/api";

class AuthServices {
  static loginService(payload: Object) {
    return api.post(`login/signin`, payload);
  }
}
export default AuthServices;
