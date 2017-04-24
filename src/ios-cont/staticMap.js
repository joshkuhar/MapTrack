'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window');


const path = [
  {
    latitude: 37.37167049, 
    longitude: -122.14320232
  }, 
  {
    latitude: 37.47167049,
    longitude: -122.14320232
  },
  {
    latitude: 37.57167049,
    longitude: -122.14320232
  }
]

export default class MapTrack extends Component {
  render() {
    return (
      <View >
        <MapView
         style={{
          width: width,
          height: height
         }}
         initialRegion={{
         latitude: 37.37167049,
         longitude: -122.14320232,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
        }}
      >
        <MapView.Polyline coordinates={path} strokeWidth={1}>
        </MapView.Polyline>
      </MapView>
      </View>
    );
  }
}

