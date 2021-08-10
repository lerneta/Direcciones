import React from "react";
import { View, Text, StyleSheet, ScrollView,  Image } from "react-native";
import { useSelector } from "react-redux";
import MapPreview from "../components/MapPreview";
import { COLORS } from "../constants";

const PlaceDetailScreen = ({ route }) => {
  
  const placeID = route.params.id;
  const place = useSelector((state) =>
    state.places.places.find((place) => place.id === placeID)
  );

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center" }}>
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.location}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <MapPreview
          style={styles.map}
          location={{ lat: place.lat, lng: place.lng }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
    backgroundColor: "#ccc",
  },
  location: {
    marginVertical: 20,
    width: "90%",
    maxWidth: 350,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: COLORS.MAROON,
    textAlign: "center",
  },
  map: {
    borderColor: COLORS.PEACH_PUFF,
    marginBottom: 10,
    height: 150,
    width: 300,
  }
});

export default PlaceDetailScreen;
