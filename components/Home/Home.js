import React, { useState } from "react";
import { observer } from "mobx-react";
import { FlatList, View, Modal } from "react-native";
import tripStore from "../../stores/tripStore";
import TripItem from "./TripItem";
import FloatingActionButton from "./FloatingActionButton";
import AddTripModal from "./AddTripModal";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const trips = tripStore.trips;

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <View>
      <Modal visible={showModal} animationType="slide">
        <AddTripModal closeModal={closeModal} />
      </Modal>
      <FlatList
        data={trips}
        renderItem={TripItem}
        keyExtractor={(item) => item._id}
      />
      <FloatingActionButton openModal={openModal} />
    </View>
  );
}
export default observer(Home);
