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

import MapView from 'react-native-maps'
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
      cLat: 0,
      cLng: 0,
      prevLatLng: {}
    }
  }

  componentDidMount() {
    // sets initial coords for map
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          cLat: position.coords.latitude, 
          cLng: position.coords.longitude
        });
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  _onPressStart(){
    navigator.geolocation.getCurrentPosition(
      (position) => {},
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { routeCoordinates, distanceTravelled } = this.state
      const newLL = { latitude: position.coords.latitude, longitude: position.coords.longitude }
      const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
      this.setState({
        routeCoordinates: routeCoordinates.concat(positionLatLngs),
        distanceTravelled: distanceTravelled + this.calcDistance(newLL),
        // cLat: newLL.latitude,
        // cLng: newLL.longitude,
        prevLatLng: newLL
      })
      console.log(this.state.routeCoordinates);
    },
    (error) => alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
    );

  }
  _onPressStop(){
    navigator.geolocation.clearWatch(this.watchID);
  }
  componentWillUnmount() {
    // navigator.geolocation.clearWatch(this.watchID);
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


        <MapPath words='something else' path={this.state.routeCoordinates} lat={this.state.cLat} lng={this.state.cLng}/>

        <Button style={styles.button} onPress={() => this._onPressStart()} title='start'/>
        <Button style={styles.button} onPress={() => this._onPressStop()} title='stop'/>
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
this.setState({cLat: position.coords.latitude, cLng: position.coords.longitude})
        
                <MapView.Polyline coordinates={  this.props.path  } strokeWidth={2}>
        </MapView.Polyline>
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