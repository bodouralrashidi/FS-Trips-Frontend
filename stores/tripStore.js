import { makeAutoObservable } from "mobx";
import instance from "./instance";

const baseURL = "/api/trip";

class TripStore {
  constructor() {
    makeAutoObservable(this);
    this.fetchTrips();
  }

  trips = [];

  emptyTrip = {
    title: "",
    description: "",
    image: "",
    location: "",
  };

  fetchTrips = async () => {
    const [response, error] = await tryCatch(() => instance.get(baseURL));
    if (error) return console.error(error);
    this.setTrips(response.data);
  };

  addTrip = async (newTrip) => {
    const [response, error] = await tryCatch(() =>
      instance.post(baseURL, newTrip)
    );
    if (error) return console.error(error);
    this.setTrips([...this.trips, response.data]);
  };

  setTrips = (trips) => (this.trips = [...trips]);
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
