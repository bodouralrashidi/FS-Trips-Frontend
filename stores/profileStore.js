import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";
class ProfileStore {
  constructor() {
    makeAutoObservable(this);
  }
  /**
   * Object Schema:
   * profile --> user --> trips.
   *
   * i.e:
   * profile = {..., user:{...,trips}}
   */
  profile = null;

  fetchProfile = async (userId) => {
    const [response, error] = await tryCatch(() =>
      instance.get(`/user-profile/${userId}`)
    );
    if (error) return console.error(error);

    runInAction(() => (this.profile = response.data));
  };

  updateProfile = async (updatedProfile, updatedUser, userId) => {
    const [response, error] = await tryCatch(() =>
      instance.put(`/${userId}`, { updatedProfile, updatedUser })
    );
    if (error) return console.error(error);

    runInAction(() => (this.profile = response.data));
  };

  getUserProfileTrips = (profile) => {
    const { userId: user } = profile;
    const { trips } = user;
    return [user, profile, trips];
  };
}

async function tryCatch(promise) {
  try {
    const response = await promise();
    return [response, null];
  } catch (error) {
    return [null, error];
  }
}

const profileStore = new ProfileStore();
export default profileStore;
