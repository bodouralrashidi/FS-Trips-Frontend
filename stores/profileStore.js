import { makeAutoObservable } from "mobx";
import instance from "./instance";

class ProfileStore {
  constructor() {
    makeAutoObservable(this);
  }
  Profile = [];
  CurrentUser = {};
  createProfile = async (categoryId, newProfile) => {
    try {
      console.log(categoryId, " store: ProfileId");
      const response = await instance.post(
        `/${categoryId}/Profile`,
        newProfile
      );
      console.log(response.data, " store: response.data");
      this.Profile.push(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: Profilestore.js ~ line 16 ",
        error
      );
    }
  };

  fetchProfile = async () => {
    try {
      const response = await instance.get("/Profile");
      this.Profile = response.data;
    } catch (error) {
      console.log("Profiletore-> fetchProfile-> error", error);
    }
  };

  // updateProfile = async (updatedProfile, ProfileId, ingredientId) => {
  //   try {
  //     const res = await instance.put(
  //       `/${ProfileId}/ingredients/${ingredientId}`,
  //       updatedProfile
  //     );
  //     this.Profile = this.Profile.map((Profile) =>
  //       Profile._id === ProfileId ? res.data : Profile
  //     );
  //   } catch (error) {
  //     console.log("Profiletore-> updatedProfile-> error", error);
  //   }
  // };

  findProfileName = (ProfileId) => {
    const Profile = this.Profile?.find((Profile) => ProfileId === Profile?._id);
    console.log(Profile, "store name Profile");
    return Profile;
  };

  updateingredient = async (ProfileId, ingredientId) => {
    try {
      const res = await instance.put(
        `/${ProfileId}/ingredients/${ingredientId}`
      );
      this.Profile = this.Profile.map((Profile) =>
        Profile._id === ProfileId ? res.data : Profile
      );
    } catch (error) {
      console.log("Profiletore-> updatedProfile-> error", error);
    }
  };

  updateProfile = async (updatedProfile, ProfileId) => {
    try {
      console.log(ProfileId, updatedProfile, "update /////");
      const res = await instance.put(`/${ProfileId}`, updatedProfile);
      console.log(res, "resssponse");
      this.Profile = this.Profile.map((Profile) =>
        Profile._id === ProfileId ? res.data : Profile
      );
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

const ProfileStore = new ProfileStore();
ProfileStore.fetchProfile();
// It will only call this function when the app first starts

export default ProfileStore;


