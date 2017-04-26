'use-strict'
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Button
} from 'react-native'
import MapPath from './staticMap';

import haversine from 'haversine'
import pick from 'lodash/pick'

const { width, height } = Dimensions.get('window')

class MapViewProject extends Component {

  constructor(props) {
    super(props)
    this.state = {
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {}
    }
  }

  componentDidMount() {

  }
  _onPressStart(){
    console.log("i'm the console")
    navigator.geolocation.getCurrentPosition(
      (position) => {},
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { routeCoordinates, distanceTravelled } = this.state
      const newLatLngs = { latitude: position.coords.latitude, longitude: position.coords.longitude }
      const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
      this.setState({
        routeCoordinates: routeCoordinates.concat(positionLatLngs),
        distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
        prevLatLng: newLatLngs
      })
    });
  }
  _onPressStop(){
    navigator.geolocation.clearWatch(this.watchID);
    console.log(this.state.routeCoordinates);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  calcDistance(newLatLng) {
    const { prevLatLng } = this.state
    return (haversine(prevLatLng, newLatLng) || 0)
  }

  render() {
    const ll = this.state.routeCoordinates[0] || ""
    return (
      <View style={styles.container}>
        <View style={styles.navBar}><Text style={styles.navBarText}>Runner</Text></View>
        <MapPath />
        <Button style={styles.button} onPress={() => this._onPressStart()} title='start'/>
        <Button style={styles.button} onPress={() => this._onPressStop()} title='stop'/>
        <Text>{ll.longitude}</Text>
        <Text>{this.state.distanceTravelled}</Text>
        <Text>zzzzzz</Text>
        <View style={styles.bottomBar}>
          <View style={styles.bottomBarGroup}>
            <Text style={styles.bottomBarHeader}>DISTANCE</Text>
            <Text style={styles.bottomBarContent}>{parseFloat(this.state.distanceTravelled).toFixed(2)} km</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  navBar: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: 64,
    width: width,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  navBarText: {
    color: '#19B5FE',
    fontSize: 16,
    fontWeight: "700",
    textAlign: 'center',
    paddingTop: 30
  },
  bottomBar: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: width,
    padding: 20,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  bottomBarGroup: {
    flex: 1
  },
  bottomBarHeader: {
    color: '#fff',
    fontWeight: "400",
    textAlign: 'center'
  },
  bottomBarContent: {
    color: '#fff',
    fontWeight: "700",
    fontSize: 18,
    marginTop: 10,
    color: '#19B5FE',
    textAlign: 'center'
  },
})

export default MapViewProject
/*

        <MapView
          style={styles.map}
          mapType='satellite'
          showsUserLocation={true}
          followUserLocation={true}
          overlays={[{
            coordinates: this.state.routeCoordinates,
            strokeColor: '#19B5FE',
            lineWidth: 10,
          }]}
        />

        
*/