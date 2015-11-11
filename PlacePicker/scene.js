/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
} = React;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    instructions: {
        marginTop : 70,
        textAlign: 'center',
        color: '#333333',
        fontSize: 20,
    },
    bodyImage: {
        marginTop: 20,
        marginBottom: 20,
        height: 548,
    },
    bodyVoice: {
        alignItems: 'center',
        marginTop: 120,
        marginBottom: 120,
        height: 358,
    },
    selectContainer : {
        flex : 1,
        flexDirection : 'row',
    },
    selectImage: {
        width:40,
        height:40,
    },
    stopRecord : {
        backgroundColor: "red",
        borderRadius : 15,
        width : 30,
        height : 30,
    }
});

var Speech = require('react-native-speech');
var SuggestionProposer = require('../SuggestionProposer/scene');

module.exports = React.createClass({

    statics : {
        title : "Where uncomfortable?",
    },

    getInitialState: function() {
        return {
            isMale : true,
            method : 'touch',
            instruction : 'Click to choose',
            fadeAnim: new Animated.Value(0),
        };
    },

    render: function() {

        return (
            <View style={styles.container}>
                <Text style={styles.instructions}>
                    {
                        this.state.method === "touch" ? "Click to choose" : ""
                }
                </Text>

                { 
                    this.state.method === "touch" ?
                    <TouchableWithoutFeedback
                        onPress={()=>{
                            this.props.navigator.push({
                                title : SuggestionProposer.title,
                                component : SuggestionProposer,
                                leftButtonTitle: "Back",
                                onLeftButtonPress: () => this.props.navigator.pop(),
                                passProps : {
                                    tag: "head"
                                }
                            })
                        }}>
                        <Image
                            source={this.state.isMale ? require('./man.png') : require('./woman.png')}
                            style={styles.bodyImage}
                            
                        />
                    </TouchableWithoutFeedback> 
                    :
                    this.state.method === "voice" ?
                    <View style = {styles.bodyVoice} >
                        <Animated.Text style={[styles.instructions, {
                            opacity : this.state.fadeAnim,
                        }]}>
                            Describe the symptoms ... 
                        </Animated.Text>

                        <Image source={ require('./icon_microphone.png') }
                            style={[styles.selectImage, {
                                marginTop: 50,
                                marginBottom: 50,
                            }]}
                        />

                        <TouchableWithoutFeedback
                            onPress={()=>{
                            this.props.navigator.push({
                                title : SuggestionProposer.title,
                                component : SuggestionProposer,
                                leftButtonTitle: "Back",
                                onLeftButtonPress: () => this.props.navigator.pop(),
                                passProps : {
                                    tag: "head"
                                }
                            })
                        }}>
                            <View style = {styles.stopRecord} />
                        </TouchableWithoutFeedback>
                    </View>
                     : null
                }

                <View style={styles.selectContainer}>
                    <TouchableOpacity onPress={() => this.setState({isMale : true})}>
                        <Image
                            source={require('./sex_male.png')}
                            style={[styles.selectImage, {
                                marginRight:20
                            }]}
                            />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.setState({isMale : false})}>
                        <Image
                            source={require('./sex_female.png')}
                            style={[styles.selectImage, {
                                marginLeft:20
                            }]}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        this.setState({
                            method: this.state.method === "touch" ? "voice" : "touch"
                        }, () => {
                            if (this.state.method === "voice") {
                                Speech.speak({
                                  text: 'Describe the symptoms',
                                  voice: 'en-US'
                                });

                                Animated.timing(       
                                    this.state.fadeAnim, 
                                    {
                                        toValue: 1,       
                                        duration: 1000,    
                                    },
                                ).start(); 

                            } else {
                                this.state.fadeAnim = new Animated.Value(0);
                            }
                        })
                    }}>
                        <Image
                            source={ 
                                this.state.method === "touch" ?
                                require('./icon_microphone.png') :
                                this.state.method === "voice" ? 
                                require('./icon_person.png') : null
                            }
                            style={[styles.selectImage, {
                                marginLeft:100
                            }]}
                        />
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
});



