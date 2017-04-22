'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps';

export default class MapTrack extends Component {
  render() {
    return (
      <View >
        <MapView
         style={{
          width: 500,
          height: 500
         }}
         initialRegion={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421,
        }}
      />
      </View>
    );
  }
}



AppRegistry.registerComponent('MapTrack', () => MapTrack);
