import { makeAutoObservable } from "mobx";
import instance from "./instance";

const baseURL = "/api/trip";

class TripStore {
  constructor() {
    makeAutoObservable(this);
    this.fetchTrips();
  }

  trips = [];
UserTrips = []
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

  fetchtripsUser = async (userId) => {
    try {
      const response = await instance.get(`/${userId}`);
      this.UserTrips = response.data.trips;
    } catch (error) {
      console.log("TripsStore -> fetchtripsUser -> error", error);
    }
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
