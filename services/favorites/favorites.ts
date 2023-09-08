import api from "@/services/api";

class FavoritesServices {
  static favoriteListService() {
    return api.get(`member/project?user_list=1&page=1`);
  }
}
export default FavoritesServices;
