/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
    Image,
  TextInput,
  Button,
  ActivityIndicator,
    Modal
} from 'react-native';
import {Api} from "./SRC/Providers/api";
const api = new Api();
export default  class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asteroidID: '',
      modalVisible: false,
      loader: false,
      apiKey: 'tHTKinkGSQ9LDxOshTompbzh9ZKby81HESCDm4rS',
      data: {}
    }
  }


  /**
   * function to get the details of the nasa
   */
  getNasa() {
    this.setState({
      loader: true
    });
    const url = 'https://api.nasa.gov/neo/rest/v1/neo/' + this.state.asteroidID + '?api_key=' + this.state.apiKey;
    api.getApi(url).then(response => {
      console.log(response);
      if (response === false) {
        this.setState({
          asteroidID: ''
        });
        this.setState({
          loader: false
        });
        return ;
      }
      this.setState({
        data: response,
        modalVisible: true
      });

      this.setState({
        loader: false
      });
    }).catch(error => {
      this.setState({
        loader: false
      });
      console.error(error);
    })
  }

  /**
   * function to get the random ID and call the api hit
   */
  randomAsteroid() {
    this.setState({
      loader: true
    });
    const url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=' + this.state.apiKey;
    /**
     * getting a random number b/w 0 to 20
     */
    const randomNo = Math.floor(Math.random() * (19 - 0 + 1) + 0);
    console.log(randomNo);
    api.getApi(url).then(response => {
      console.log(response);
      this.setState({
        loader: false
      });
      this.setState({
        asteroidID: response.near_earth_objects[randomNo].id
      });
      this.getNasa();
    }).catch(error => {
      this.setState({
        loader: false
      });
    });
  }


  render() {
    return (
        <>
          <StatusBar barStyle="light-content" />
          <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
              <Image
                  style={styles.logo}
                  source={{
                    uri: 'data:image/png;base64,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'
                  }}
              />
              <TextInput
                  style={styles.textInput}
                  value={this.state.asteroidID}
                  placeholder={"Enter Asteroid Id"}
                  onChangeText={text => {
                    this.setState({
                      asteroidID: text
                    })
                  }}
              />
              <View style={styles.buttons}>
                <Button
                title={'Submit'}
                onPress={this.getNasa.bind(this)}
                />
              </View>
              <View style={styles.buttons}>
                <Button
                    title={'Random Id'}
                    onPress={this.randomAsteroid.bind(this)}
                />
              </View>
              <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.modalVisible}
              >
                <Image
                  style={styles.logo}
                  source={{
                    uri: 'data:image/png;base64,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'
                  }}
              />
                <View>
                  <Text style={styles.text}> => name  : {this.state.data.name}</Text>
                  <Text style={styles.text}> => nasa_jpl_url  : {this.state.data.nasa_jpl_url}</Text>
                  <Text style={styles.text}> => is_potentially_hazardous_asteroid  : {this.state.data.is_potentially_hazardous_asteroid ? 'True': 'False'}</Text>
                  <View style={styles.buttons}>
                    <Button
                        title={'Search For another Id'}
                        onPress={() => {
                          this.setState({
                            modalVisible: false
                          })
                        }}
                      />
                  </View>
                </View>
              </Modal>
            </ScrollView>
          </SafeAreaView>
        </>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
  },
  textInput: {
    backgroundColor: '#dad9e9',
    width: '80%',
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    paddingLeft: 10
  },
  buttons: {
    width: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
  },
  text: {
    backgroundColor: '#dad9e9',
    width: '80%',
    borderRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20
  }
});

