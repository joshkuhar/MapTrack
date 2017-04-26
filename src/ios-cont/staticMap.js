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

export default class MapTrack extends Component {
  render() {
    return (
      <View >
        <Text>{this.props.words}</Text>
        <MapView
         style={{
          // flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center'
          width: width,
          height: height*.5
         }}
        initialRegion={{
           latitude: this.props.lat,
           longitude: this.props.lng,
           latitudeDelta: 0.00422,
           longitudeDelta: 0.00221,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <MapView.Polyline coordinates={  this.props.path  } strokeWidth={2}>
        </MapView.Polyline>
      </MapView>
      </View>
    );
  }
}

