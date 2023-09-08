import api from "@/services/api";

class HomeServices {
  static projectsService() {
    return api.get(`home`);
  }
}
export default HomeServices;
