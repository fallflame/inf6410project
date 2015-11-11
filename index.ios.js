/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
} = React;

var PlacePicker = require('./PlacePicker/scene');
var MapView = require('./MapView/scene');
var SuggestionProposer = require('./SuggestionProposer/scene');

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


var MyApp = React.createClass({

	render: function(){
		return (
			<NavigatorIOS
				style={styles.container}
				initialRoute={{
					component : PlacePicker,
					//title: PlacePicker.title,
					//component : PlacePicker,
					//title: MapView.title,
					//component : MapView,
				}}
			/>
		);
	}
});


AppRegistry.registerComponent('AwesomeProject', () => MyApp);
