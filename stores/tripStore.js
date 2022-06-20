import { makeAutoObservable } from "mobx";
import instance from "./instance";

const baseURL = "/api/trip";

class TripStore {
  constructor() {
    makeAutoObservable(this);
    this.fetchTrips();
  }

  trips = [];

  fetchTrips = async () => {
    const [response, error] = await tryCatch(() => instance.get(baseURL));
    if (error) return console.error(error);
    this.trips = response.data;
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

export default new TripStore();
