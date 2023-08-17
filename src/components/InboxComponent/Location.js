import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import {AppImages} from '../AppImages';
import {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';

const Location = ({longitudes, latitudes, sendmesgfunc, setLocation}) => {
  const navigation = useNavigation();

  const sendmesg = () => {
    let mesg = latitudes + ',' + longitudes;
    sendmesgfunc('location', null, mesg);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              setLocation(false);
            }}>
            <Image
              source={AppImages.arrowback}
              style={styles.backButtonImage}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Send Location</Text>
        </View>
        <View style={styles.iconContainer}>
          <Image source={AppImages.sear} style={styles.iconImage} />
          <TouchableOpacity>
            <Image source={AppImages.mapcircle} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <View>
          <MapView
            style={{width: '100%', height: '100%'}}
            initialRegion={{
              latitude: latitudes,
              longitude: longitudes,
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0021,
            }}>
            <Marker
              style={{}}
              coordinate={{latitude: latitudes, longitude: longitudes}}
              // title="Marker Title"
              // description="Marker Description"
              // image={AppImages.USA}
            >
              <Image
                source={AppImages.MapMarker} // Replace with the path to your image
                style={AppImages.activity}
              />
            </Marker>
          </MapView>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        {/* <TouchableOpacity style={styles.optionItemContainer}>
          <Image
            source={AppImages.sharelocation}
            style={styles.optionItemImage}
          />
          <Text style={styles.optionItemText}>Share live location</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => sendmesg()}
          style={styles.optionItemContainer}>
          <Image
            source={AppImages.sendlocation}
            style={styles.optionItemImage}
          />
          <Text style={styles.optionItemText}>Send your current location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    marginHorizontal: 18,
    flex: 0.12,
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
  },
  backButtonContainer: {
    width: '78%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonImage: {
    width: 24,
    height: 24,
    left: -5,
  },
  headerText: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    paddingLeft: 10,
  },
  iconContainer: {
    width: '22%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: '#FFF',
  },
  imageContainer: {
    flex: 0.31,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  mapImage: {
    width: 325,
    height: 210,
  },
  optionsContainer: {
    paddingHorizontal: 19,
    flex: 0.18,
    justifyContent: 'space-around',
    marginTop: 15,
  },
  optionItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionItemImage: {
    width: 48,
    height: 48,
  },
  optionItemText: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    paddingLeft: 10,
  },
});

export default Location;
