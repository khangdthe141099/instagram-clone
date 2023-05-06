import { publicRequest } from "../apiService";

class UserService {
  createUser(params: any) {
    return publicRequest.post("/api/auth/signup", params);
  }

  getUserByEmail(params?: string) {
    if (!params) return;

    return publicRequest.get(`/api/user/${params}`);
  }

  getAllUser() {
    return publicRequest.get(`/api/user/find`);
  }

  //Cập nhật thông tin user
  updateUserInfo(id: string, params?: any) {
    return publicRequest.patch(`/api/user/${id}`, params);
  }

  //Cập nhật list follower
  updateFollower(id: string, params?: any) {
    return publicRequest.patch(`/api/user/follower/${id}`, params);
  }

  //Chuyển trạng thái từ request sang accpet (đối với private account)
  acceptFollowerPrivateAcc(id: string, params?: any) {
    return publicRequest.patch(`/api/user/accept/follower/${id}`, params);
  }

    //Chuyển trạng thái từ request sang accpet (đối với private account)
  acceptFollowingPrivateAcc(id: string, params?: any) {
    return publicRequest.patch(`/api/user/accept/following/${id}`, params);
  }

  //Cập nhật list following
  updateFollowing(id: string, params?: any) {
    return publicRequest.patch(`/api/user/following/${id}`, params);
  }

  //Hủy follower:
  cancelFollower(id: string, params?: any) {
    return publicRequest.patch(`/api/user/cancel/follower/${id}`, params);
  }

  //Hủy following:
  cancelFollowing(id: string, params?: any) {
    return publicRequest.patch(`/api/user/cancel/following/${id}`, params);
  }
}

export const userService = new UserService();
