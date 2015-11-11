/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    View,
    Image,
} = React;

var SuggestionDB = require("./SuggestionDB");
var MapView = require('../MapView/scene');
var Speech = require('react-native-speech');


var styles = StyleSheet.create({
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    listContainer: {
        flex: 1,
        marginTop : 65,
        backgroundColor: '#F5FCFF',
    },
    header: {
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop : 15, 
        marginBottom : 8,
        fontWeight: 'bold'
    },
    normal: {
        marginLeft:20,
        fontSize: 15,
    },
    link : {
        color : "#007AFF"
    },
    lastElement : {
        marginBottom: 15,
    },
    voiceIcon : {
        width: 25,
        height: 25,
        marginTop: 15,
        marginLeft : 190,
    }
});


module.exports = React.createClass({

    statics : {
        title : "Suggestions",
    },

    getInitialState: function() {
        return {
        };
    },

    render: function() {

        var tag = this.props.tag;

        var suggestion = SuggestionDB.find((el) => {
            return el.tags.indexOf(tag) !== -1;
        })

        return (

            suggestion === null ?
            <View style={styles.centerContainer}>
                <Text>Sorry, we cannot give any suggestion.</Text>
                <Text>Please contact your familly doctor.</Text>
            </View>
            :
            <View style={styles.listContainer}>

                <TouchableWithoutFeedback onPress={()=>{
                    var speachText = 
                        "Symptoms: " 
                        + suggestion.symptoms.reduce((pv, cv)=>{
                            return pv + ", " + cv
                        }, "")
                        + ". Treatements : "
                        + suggestion.treatements.reduce((pv, cv)=>{
                            return pv + ", " + cv
                        }, "")
                        + ". Medications : "
                        + suggestion.medications.reduce((pv, cv)=>{
                            return pv + ", " + cv
                        }, "");

                    Speech.speak({
                        text: speachText,
                        voice: 'en-US',
                        rate : 0.4,
                    });
                }}>
                    <Image source={ require('./icon_voice.png') }
                            style={styles.voiceIcon}
                    />
                </TouchableWithoutFeedback>
                <Text style={styles.header}>
                    Symptoms
                </Text>
                {
                    suggestion.symptoms.map((symptom) => {
                        return (
                            <Text style={styles.normal}>
                                {symptom}
                            </Text>
                        )
                    })
                }

                <Text style={styles.header}>
                    Treatement
                </Text>
                {
                    suggestion.treatements.map((treatement) => {
                        return (
                            <Text style={styles.normal}>
                                {treatement}
                            </Text>
                        )
                    })
                }


                <Text style={styles.header}>
                    Medication
                </Text>
                {
                    suggestion.medications.map((medication) => {
                        return (
                            <Text style={styles.normal}>
                                {medication}
                            </Text>
                        )
                    })
                }
                

                <Text style={styles.header}>
                    Doctor
                </Text>
                {
                    suggestion.doctors.map((doctor)=> {
                        return (
                            <View>
                                <Text style={styles.normal}>
                                    {doctor.name}
                                </Text>
                                <TouchableWithoutFeedback
                                    onPress={()=>{
                                        this.props.navigator.push({
                                            title : MapView.title,
                                            component : MapView,
                                            leftButtonTitle: "Back",
                                            onLeftButtonPress: () => this.props.navigator.pop(),
                                            passProps : {
                                                address: doctor.address
                                            }
                                        })
                                    }}>
                                    <Text style={[styles.normal, styles.link]}>
                                        {doctor.address}
                                    </Text>
                                </TouchableWithoutFeedback>
                                <Text style={[styles.normal, styles.lastElement]}>
                                    {doctor.phone}
                                </Text>
                            </View>
                        )
                    })
                }
            </View>
        );
    }
});



