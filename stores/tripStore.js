import { makeAutoObservable } from "mobx";
import instance from "./instance";

class TripsStore {
  constructor() {
    makeAutoObservable(this);
  }
  trips = [];


  fetchtripsUser = async (userId) => {
    try {
      const response = await instance.get(`/${userId}`);
      this.trips = response.data;
    } catch (error) {
      console.log("TripsStore -> fetchtripsUser -> error", error);
    }
  };

  findCategoryName = (categoryId) => {
    const category = this.categories?.find(
      (category) => categoryId === category?._id
    );
    return category;
  };
}

const tripsStore = new TripsStore();
tripsStore.fetchCategories();
export default tripsStore;