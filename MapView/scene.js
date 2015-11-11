/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    MapView,
    View,
    StyleSheet,
} = React;


var styles = StyleSheet.create({
    map : {
        height: 600,
        marginTop : 80,
        margin: 10,
        borderWidth: 1,
        borderColor: '#000000',
    },
});


module.exports = React.createClass({

    statics : {
        title : "Map",
    },

    getInitialState() {
        return {
            mapRegion: {
                latitude:45.493481,
                longitude:-73.583104,
                latitudeDelta:0.01,
                longitudeDelta:0.01,
            },

            annotations: [{
                latitude: 45.493481, 
                longitude: -73.583104,
            }]
        };
    },

    render: function() {

        return (
            <View>
                <MapView
                  style={styles.map}
                  region={this.state.mapRegion}
                  annotations={this.state.annotations}
                />
            </View>
        );
    }
});



