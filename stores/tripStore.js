import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";

const baseURL = "/api/trip";

class TripStore {
  constructor() {
    makeAutoObservable(this);
    this.fetchTrips();
  }

  trips = [];
  UserTrips = [];
  fav = [];
  singleTrip;

  emptyTrip = {
    title: "",
    description: "",
    image: "",
    location: "",
  };
  addFavTrips = (trip) => {
    this.fav.push(trip)
  }


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

  updateTrip = async (trip) => {
    const [response, error] = await tryCatch(() =>
      instance.put(`${baseURL}/${trip._id}`, trip)
    );
    if (error) return console.error(error);
    const updatedTrip = response.data;
    this.setTrips(
      this.trips.map((trip) =>
        trip._id === updatedTrip._id ? updatedTrip : trip
      )
    );
    this.setSingleTripWithId(updatedTrip._id);
  };

  deleteTrip = async (id) => {
    const [response, error] = await tryCatch(() =>
      instance.delete(`${baseURL}/${id}`)
    );
    if (error) return console.error(error);
    this.setTrips(this.trips.filter((trip) => trip._id !== id));
  };

  setSingleTripWithId = (id) =>
    (this.singleTrip = this.trips.find(({ _id }) => _id === id));

  fetchtripsUser = async (userId) => {
    try {
      const response = await instance.get(`/${userId}`);
      runInAction(() => (this.UserTrips = response.data.trips));
    } catch (error) {
      console.log(error);
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
