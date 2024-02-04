import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

function ProvinceDetail() {
  const [Coordinate, setCoordinate] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    getCoordinatesFromKeyword()
  }, [ ]);

  const getCoordinatesFromKeyword = async (keyword) => {
    try {
      const apiKey = 'AIzaSyCrWksA-ixY-NjTLtxAYa02tER_75PTXKM';
      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent('ACEH')}&key=${apiKey}`;
  
      const response = await axios.get(apiUrl);

      console.log('res', response);
  
      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        console.log(location);
        setCoordinate({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      } else {
        throw new Error('Location not found');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error.message);
      throw error;
    }
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={Coordinate}>
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default ProvinceDetail;