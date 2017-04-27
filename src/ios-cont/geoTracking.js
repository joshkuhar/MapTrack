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
  Button,
  AsyncStorage
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
      currentLat: 0,
      currentLng: 0,
      prevLatLng: {},
      savedRun: ''
    }
  }
  componentDidMount() {
    // sets initial coords for map
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          currentLat: position.coords.latitude, 
          currentLng: position.coords.longitude
        });
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  _onGetTotal(){
    // fires every 1000
    // this.intervalId = setInterval(() => {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       this.setState({
    //         currentLat: position.coords.latitude, 
    //         currentLng: position.coords.longitude
    //       });
    //     },
    //     (error) => console.log(JSON.stringify(error)),
    //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    //   );
    // }, 1000)
  }
  _onPressStart(){
    this.intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            currentLat: position.coords.latitude, 
            currentLng: position.coords.longitude
          });
        },
        (error) => console.log(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }, 1000)

    // starts process for adding coordinates to array
    navigator.geolocation.getCurrentPosition(
      (position) => {},
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
    this.watchID = navigator.geolocation.watchPosition((position) => {
      const { routeCoordinates, distanceTravelled } = this.state
      const newLL = { latitude: position.coords.latitude, longitude: position.coords.longitude }
      // const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
      // const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
      this.setState({
        // routeCoordinates: routeCoordinates.concat(positionLatLngs),
        routeCoordinates: routeCoordinates.concat(newLL),
        distanceTravelled: distanceTravelled + this.calcDistance(newLL),
        prevLatLng: newLL
      })
    },
    (error) => console.log(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

  }
  async _onPressSaveRun () {
      const travelled = this.state.distanceTravelled.toFixed(2);
      try {
        await AsyncStorage.setItem('@distanceTravelled', travelled.toString(10));
      } catch (error) {
        console.log(error)
      }
  }
  async _onGetTotal () {
    try {
      const value = await AsyncStorage.getItem('@distanceTravelled');
      if (value !== null){
        this.setState({
          savedRun: value
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  _onPressStop(){
    navigator.geolocation.clearWatch(this.watchID);
    clearInterval(this.intervalId);
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  calcDistance(newLatLng) {
    console.log(this.state.distanceTravelled.toFixed(2));
    const { prevLatLng } = this.state
    return (haversine(prevLatLng, newLatLng, {unit: 'mile'}) || 0)
  }
  render() {
    const ll = this.state.routeCoordinates[0] || ""
    return (
      <View style={styles.container}>
        <View style={styles.navBar}><Text style={styles.navBarText}>Beer Runner</Text></View>
        <MapPath words='something else' path={this.state.routeCoordinates} lat={this.state.currentLat} lng={this.state.currentLng}/>
          <Button style={styles.button} onPress={() => this._onGetTotal() } title='get saved run' />
          <Text>{this.state.savedRun}</Text>
          <Button style={styles.button} onPress={() => this._onPressStart()} title='start'/>
          <Button style={styles.button} onPress={() => this._onPressStop()} title='stop'/>
          <Button style={styles.button} onPress={() => this._onPressSaveRun()} title='save'/>
        <View style={styles.bottomBar}>
          <View style={styles.bottomBarGroup}>
            <Text style={styles.bottomBarHeader}>DISTANCE</Text>
            <Text style={styles.bottomBarContent}>{this.state.distanceTravelled.toFixed(2)} miles</Text>
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
    // backgroundColor: 'rgba(0,0,0,0.7)',
    width: width,
    padding: 20,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  bottomBarGroup: {
    flex: 1
  },
  bottomBarHeader: {
    color: '#19B5FE',
    fontWeight: "400",
    textAlign: 'center'
  },
  bottomBarContent: {
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