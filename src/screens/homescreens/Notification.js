import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {} from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import {AppImages} from '../../components/AppImages';

const Notification = ({navigation}) => {
  const Today = [
    {
      watch: AppImages.rolex,
      watchname: 'Rolex Z902 - Boys',
      text: 'Ralph wilder made an offer',
      price: '$65.000',
      mints: '14m ago',
      buttontext: 'Review',
    },
  ];

  const Yesterday = [
    {
      watch: AppImages.rolex,
      watchname: 'Rolex Z902 - Boys',
      text: 'Your item has been successfully',
      text1: 'published and listed in public',
      day: '1d ago',
    },
  ];

  return (
    <MenuProvider>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={AppImages.arrowback} style={styles.icon} />
            </TouchableOpacity>
            <View style={{paddingLeft: 10}}>
              <Text style={styles.headerText}>Notifications</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingRight: 20}}>
              <Image
                source={AppImages.notify}
                style={styles.notificationIcon}
              />
            </View>
            <View>
              <Menu>
                <MenuTrigger>
                  <Image source={AppImages.fltr} style={styles.icon} />
                </MenuTrigger>
                <MenuOptions
                  optionsContainerStyle={styles.menuOptionsContainer}>
                  <View>
                    <MenuOption>
                      <Text style={[styles.menuOptionText, {color: '#838FA0'}]}>
                        filter by
                      </Text>
                    </MenuOption>
                    <MenuOption>
                      <Text style={[styles.menuOptionText, {color: '#19242C'}]}>
                        Offers
                      </Text>
                    </MenuOption>
                    <MenuOption>
                      <Text style={[styles.menuOptionText, {color: '#19242C'}]}>
                        Confirm
                      </Text>
                    </MenuOption>
                    <MenuOption>
                      <Text style={[styles.menuOptionText, {color: '#19242C'}]}>
                        Follow
                      </Text>
                    </MenuOption>
                    <MenuOption>
                      <Text style={[styles.menuOptionText, {color: '#19242C'}]}>
                        Message
                      </Text>
                    </MenuOption>
                  </View>
                </MenuOptions>
              </Menu>
            </View>
          </View>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Today</Text>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Today}
            renderItem={({item}) => (
              <View style={styles.listItemContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: '40%',
                    borderBottomWidth: 1,
                    borderBottomColor: '#EAECF0',
                    paddingHorizontal: 20,
                  }}>
                  <View style={{paddingRight: 10}}>
                    <Image source={item.watch} style={styles.watchImage} />
                  </View>
                  <View>
                    <Text style={styles.listItemTitle}>{item.watchname}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    height: '35%',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Text style={styles.listItemText}>{item.text}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={{paddingRight: 10}}>
                        <Text style={styles.priceText}>{item.price}</Text>
                      </View>
                      <View>
                        <Text style={styles.strikeThroughText}>
                          {item.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Text style={styles.mintText}>{item.mints}</Text>
                  </View>
                </View>
                <View style={{paddingHorizontal: 20, height: '25%'}}>
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>{item.buttontext}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        <View style={{paddingTop: 15, paddingHorizontal: 20}}>
          <View style={styles.messageContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: '50%',
                borderBottomWidth: 1,
                borderBottomColor: '#EAECF0',
                paddingHorizontal: 20,
              }}>
              <View style={{paddingRight: 10}}>
                <Image source={AppImages.rolex} style={styles.watchImage} />
              </View>
              <View>
                <Text style={styles.listItemTitle}>Rolex Z902 - Boys</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                height: '50%',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                height: '35%',
                alignItems: 'center',
              }}>
              <View>
                <Text style={styles.messageText}>
                  Robert Fixel sent you a message,
                </Text>
                <Text style={styles.messageText}>
                  please check your inbox...
                </Text>
              </View>
              <View>
                <Text style={styles.timeText}>1h ago</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Yesterday</Text>
        </View>
        <View style={{paddingHorizontal: 20}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Yesterday}
            renderItem={({item}) => (
              <View style={styles.listItemContainer}>
                <View style={{justifyContent: 'space-around', padding: 5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: '50%',
                      borderBottomWidth: 1,
                      borderBottomColor: '#EAECF0',
                      paddingHorizontal: 20,
                    }}>
                    <View style={{paddingRight: 10}}>
                      <Image source={item.watch} style={styles.watchImage} />
                    </View>
                    <View>
                      <Text style={styles.listItemTitle}>{item.watchname}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: '50%',
                      justifyContent: 'space-between',
                      paddingHorizontal: 20,
                      height: '35%',
                      alignItems: 'center',
                    }}>
                    <View>
                      <View>
                        <Text style={styles.messageText}>{item.text}</Text>
                        <Text style={styles.messageText}>{item.text1}</Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.timeText}>{item.day}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '12%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EAECF0',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#19242C',
  },
  icon: {
    width: 24,
    height: 24,
  },
  notificationIcon: {
    width: 20,
    height: 20,
  },
  menuOptionsContainer: {
    width: 146,
    backgroundColor: '#FFFFFF',
    height: 191,
    marginLeft: -20,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  menuOptionText: {
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    height: '7%',
    justifyContent: 'center',
  },
  sectionHeaderText: {
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
    color: '#838FA0',
  },
  listItemContainer: {
    width: '100%',
    height: 165,
    backgroundColor: '#F8F8F8',
    shadowColor: 'gray',
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    padding: 5,
  },
  watchImage: {
    width: 40,
    height: 41,
  },
  listItemTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#19242C',
  },
  listItemText: {
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    color: '#19242C',
  },
  priceText: {
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    color: '#EA8C00',
  },
  strikeThroughText: {
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    color: '#838FA0',
    textDecorationLine: 'line-through',
  },
  mintText: {
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    color: '#838FA0',
  },
  button: {
    width: 75,
    height: 32,
    backgroundColor: '#EA8C00',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    color: 'white',
  },
  messageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#F8F8F8',
    shadowColor: 'gray',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: 'space-around',
    padding: 5,
  },
  messageTitle: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#19242C',
  },
  messageText: {
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    color: '#19242C',
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    color: '#838FA0',
  },
});

export default Notification;
