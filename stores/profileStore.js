import { makeAutoObservable } from "mobx";
import instance from "./instance";
class ProfileStore {
  constructor() {
    makeAutoObservable(this);
  }
  Profile = [];
  CurrentUser = {};
Profile ={}
  fetchProfile = async () => {
    try {
      const response = await instance.get("/profiles");
      this.Profile = response.data;
    } catch (error) {
      console.log("Profiletore-> fetchProfile-> error", error);
    }
  };

  findProfileName = (ProfileId) => {
    const Profile = this.Profile?.find((Profile) => ProfileId === Profile?._id);
    console.log(Profile, "store name Profile");
    return Profile;
  };

  updateProfile = async (updatedProfile,updateUser ,userId) => {
    try {
      console.log(updateUser, "updated/////");
       const res2 = await instance.put(`/user/${userId}`, updateUser);
      const res = await instance.put(`/${userId}`, updatedProfile);
     
    } catch (error) {
      console.log("Profiletore-> updatedProfile-> error", error);
    }
  };

  getUserInfo = async (userId) => {
    try {
      const res = await instance.get(`/users`);
      console.log(res.data);

      res.data.forEach((user) => {
        if (user._id === userId) {
          this.CurrentUser = user;
          console.log(user, "we found the user");
        }
      });
    } catch (error) {
      console.log("Profiletore-> updatedProfile-> error", error);
    }
  };
}


const profileStore = new ProfileStore();
profileStore.fetchProfile
// It will only call this function when the app first starts
export default profileStore;


