import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {useNavigation} from '@react-navigation/native';

const SelectedPhoto = ({route}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <View style={styles.watchview}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'red',
            width: 50,
          }}>
          <TouchableOpacity>
            <Image style={{alignSelf: 'center'}} source={AppImages.leftarrow} />
          </TouchableOpacity>
          {/* <Text style={styles.watchname}>Rolex Z902 Boys.png</Text> */}
        </TouchableOpacity>
      </View>
      <View style={styles.imageview}>
        <Image
          style={{width: 300, height: 300, top: -60}}
          source={{uri: route.params.Image}}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#010101',
    flex: 1,
  },
  watchview: {
    flex: 1,
    height: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    // alignItems: 'center',
    // paddingTop: 50,
    // backgroundColor: 'red',
  },
  watchname: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    marginLeft: 15,
    color: '#FFF',
  },
  imageview: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
    flex: 5,
  },
});
export default SelectedPhoto;
