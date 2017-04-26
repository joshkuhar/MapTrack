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
    latitude: 37.3377169, 
    longitude: -122.02835139
  }, 
  {
    latitude: 37.3376765,
    longitude: -122.02950864
  },
  {
    latitude: 37.33767947,
    longitude: -122.03066241
  }
]

export default class MapTrack extends Component {
  render() {
    return (
      <View >
        <MapView
         style={{
          // flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center'
          width: width,
          height: height*.5
         }}
         initialRegion={{
         latitude: 37.3377169,
         longitude: -122.02835139,
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

