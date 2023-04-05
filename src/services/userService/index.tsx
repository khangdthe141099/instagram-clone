import { publicRequest } from "../apiService";

class UserService {
  createUser(params: any) {
    return publicRequest.post("/api/auth/signup", params);
  }
}

export const userService = new UserService();
