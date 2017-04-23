var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Button,
  AppRegistry
} = ReactNative;

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

class MapTrack extends React.Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  watchID: ?number = null;

  componentDidMount() {
  }
  _onPressStart() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    })
  }
  _onPressStop() {
    // this.watchID = navigator.geolocation.watchPosition((position) => {
    //   var lastPosition = JSON.stringify(position);
    //   this.setState({lastPosition});
    // });  
    navigator.geolocation.clearWatch(this.watchID);     
    
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.main}>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.lastPosition}
        </Text>
        <Button style={styles.button} onPress={() => this._onPressStart()} title='start'/>
        <Button style={styles.button} onPress={() => this._onPressStop()} title='stop'/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
  main: {
    marginTop: 30
  },
  button: {
    marginTop: 30
  }
});

export default MapTrack