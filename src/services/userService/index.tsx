import { publicRequest } from "../apiService";

class UserService {
  createUser(params: any) {
    return publicRequest.post("/api/auth/signup", params);
  }

  getUserByEmail(params?: string) {
    if(!params) return;

    return publicRequest.get(`/api/user/${params}`);
  }
}

export const userService = new UserService();
