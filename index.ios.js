'use strict'

// import mapTrack from './src/ios-cont/staticMap';
// import { AppRegistry } from 'react-native';
// import GeoLocation from './src/ios-cont/geolocation'

// const MapTrack = mapTrack;


// AppRegistry.registerComponent('MapTrack', () => GeoLocation);



var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  AppRegistry
} = ReactNative;


import MapTrack from './src/ios-cont/geoTracking';



// exports.framework = 'React';
// exports.title = 'Geolocation';
// exports.description = 'Examples of using the Geolocation API.';


// exports.examples = [
//   {
//     title: 'navigator.geolocation',
//     render: function(): React.Element<any> {
//       return <GeolocationExample />;
//     },
//   }
// ];

// class MapTrack extends React.Component {
//   state = {
//     initialPosition: 'unknown',
//     lastPosition: 'unknown',
//   };

//   watchID: ?number = null;

//   componentDidMount() {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         var initialPosition = JSON.stringify(position);
//         this.setState({initialPosition});
//       },
//       (error) => alert(JSON.stringify(error)),
//       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
//     );
//     this.watchID = navigator.geolocation.watchPosition((position) => {
//       var lastPosition = JSON.stringify(position);
//       this.setState({lastPosition});
//     });
//   }

//   componentWillUnmount() {
//     navigator.geolocation.clearWatch(this.watchID);
//   }

//   render() {
//     return (
//       <View style={styles.main}>
//         <Text>
//           <Text style={styles.title}>Initial position: </Text>
//           {this.state.initialPosition}
//         </Text>
//         <Text>
//           <Text style={styles.title}>Current position: </Text>
//           {this.state.lastPosition}
//         </Text>
//       </View>
//     );
//   }
// }

// var styles = StyleSheet.create({
//   title: {
//     fontWeight: '500',
//   },
//   main: {
//     marginTop: 30
//   }
// });

AppRegistry.registerComponent('MapTrack', () => MapTrack);