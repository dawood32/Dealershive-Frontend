import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Dimensions, FlatList, useWindowDimensions } from 'react-native';
import { AppImages } from '../../components/AppImages';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const Profile = ({navigation}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Inventory', title: 'Inventory' },
    { key: 'Info', title: 'Info' },
    { key: 'Metrics', title: 'Metrics' },
  ]);

  const [img, setImg] = useState(true);
  const category = [
    { name: 'Watches' },
    { name: 'Accessories' },
    { name: 'Parts' },
    { name: 'Jewellery' },
    { name: 'Accessories' },
    { name: 'Parts' },
    { name: 'Jewellery' },
  ];
  const categoryy = [
    { name: 'Rolex Z902', watch: AppImages.rolexwatch, trash: AppImages.trash, edit: AppImages.edit, year: 'Patek Philippe - 2022', condition: 'Condition: Used', certificate3: AppImages.certificate3, certificate4: AppImages.certificate4, price: '$24.90' },
    { name: '116789RB - Rainbow ', watch: AppImages.rainbow, trash: AppImages.trash, edit: AppImages.edit, year: 'Patek Philippe - 2022', condition: 'Condition: Used', certificate3: AppImages.certificate1, certificate4: AppImages.certificate2, price: '$87.00' },
    { name: 'Rolex Z902', watch: AppImages.rolexwatch, trash: AppImages.trash, edit: AppImages.edit, year: 'Patek Philippe - 2022', condition: 'Condition: Used', certificate3: AppImages.certificate3, certificate4: AppImages.certificate4, price: '$24.90' },
    { name: 'Rolex Z902', watch: AppImages.rolexwatch, trash: AppImages.trash, edit: AppImages.edit, year: 'Patek Philippe - 2022', condition: 'Condition: Used', certificate3: AppImages.certificate3, certificate4: AppImages.certificate4, price: '$24.90' },


  ];
  const InventoryRoute = () => (
    <View style={styles.contentview}>
    <View style={styles.searchbar}>
      <ImageBackground source={AppImages.white} style={styles.imgbg}><TextInput placeholder='Search watches, parts...' style={styles.searchinput} placeholderTextColor='#9D9D9D'></TextInput></ImageBackground>
      <ImageBackground source={AppImages.black} style={styles.imgbg1}><Image source={AppImages.search}></Image></ImageBackground>
    </View>

    <View style={styles.flatlistview}>
      <FlatList
        data={category}
        horizontal
        renderItem={({ item }) => {
          return (
            <View style={styles.categoryview}>
              <Text style={styles.categorytxt}>{item.name}</Text>
            </View>
          )
        }} />
    </View>
    <View style={styles.headingview}>
      <Text style={styles.headingtxt}>All Watches</Text>
      <View style={styles.headingimg}>
        <Image source={AppImages.fltr}></Image>
        <Image source={AppImages.men}></Image>
      </View>
    </View>

    <View style={{height:310}}>
        <FlatList
          data={categoryy}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style={styles.categoryyview}>
                <View style={styles.cardview}>
                  <View style={{ width: '18%' }}>
                    <Image source={item.watch}></Image>
                  </View>
                  <View style={styles.card} >
                    <Text style={styles.categoryytxt}>{item.name}</Text>
                    <Text style={styles.cardyear}>{item.year}</Text>
                    <Text style={styles.cardcondition}>{item.condition}</Text>
                  </View>
                  <View style={styles.cardimg}>
                    <TouchableOpacity><Image source={item.trash}></Image></TouchableOpacity>
                    <TouchableOpacity><Image source={item.edit}></Image></TouchableOpacity>
                  </View>
                </View>
                <View style={styles.card2}>
                  <View style={{ width: '18%' }}></View>
                  <View style={styles.cardstyle}>
                    <Image source={item.certificate3}></Image>
                    <Image source={item.certificate4} style={{ marginLeft: 6, }}></Image>
                  </View>
                  <Text style={styles.cardprice}>{item.price}</Text>
                </View>
              </View>
            )
          }} />
      </View>

  </View>

  );
  
  const InfoRoute = () => (
    <View style={{ flex: 1, }} />
  );
  const MetricsRoute = () => (
    <View style={{ flex: 1, }} />
  );
  
  const renderScene = SceneMap({
    Inventory: InventoryRoute,
    Info: InfoRoute,
    Metrics: MetricsRoute,
  });
  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        pressOpacity={0.5}
        indicatorStyle={{
          height: 1,
          backgroundColor: '#EA8C00',
        }}
        indicatorContainerStyle={styles.indicatStyle}
        style={{ backgroundColor: "transparent", elevation: 0 }}
        renderLabel={({ route, focused, color }) => (
          <View>
            {focused == false ? (
              <Text style={[styles.titleStyle, { color: '#838FA0' }]}>
                {route.title}
              </Text>
            ) : (
              <View style={{}}>
                <Text style={[styles.titleStylee, { color: '#EA8C00' }]}>{route.title}</Text>
  
              </View>
            )}
          </View>
        )}
      />
    );
  };
  
  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
        onPress={()=>navigation.goBack()}
        >
          <Image source={AppImages.leftarrow}></Image>
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}><Image source={AppImages.timecraft}></Image></View>

      </View>

      <View style={{ flex: 0.20, }}>
        <Image source={AppImages.logo} style={styles.img}></Image>
        <View style={styles.headerview}>
          <View style={styles.headerview1}>
            <View>
              <View style={styles.headerview2}>
                <Text style={styles.headerviewtxt}>TimeCraft</Text>
                <Image source={AppImages.goldtik}></Image>
                <Image source={AppImages.contract}></Image>
              </View>
              <Text style={styles.headerviewtxt1}>Dubai, UAE</Text>
            </View>
            <View >
              <TouchableOpacity><Image source={AppImages.message}></Image></TouchableOpacity>
            </View>
          </View>

        </View>
        
        <View style={styles.heading}>
          <TabView
            style={{ paddingTop: 12, color: 'black' }}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            swipeEnabled={true}

          />
       
        </View>
      </View>
{InventoryRoute()}
    </View>
    

  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // justifyContent: 'space-between'
    // justifyContent: 'center',
    // alignItems: 'center',
  

  },
  header: {
    flex: 0.18,
    backgroundColor: '#19242C',
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  img: {
    width: 100,
    height: 80,
    marginTop: -50
  },
  headerview: {
    height: 62,
    paddingHorizontal: 20,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingTop: 12
  },
  headerview1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',

  },
  headerview2: {
    flexDirection: 'row',
    width: 125,
    justifyContent: 'space-between',
    alignContent: 'center'

  },
  headerviewtxt: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Bold'
  },
  headerviewtxt1: {
    color: '#838FA0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    paddingTop: 5
  },
  heading: {
    paddingHorizontal: 20,
    // height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  heading1: {
    fontFamily: 'Nunito-ExtraBold',
    color: '#EA8C00',
  },
  heading2: {
    fontFamily: 'Nunito-Bold',
    color: '#838FA0',
  },
  heading3: {
    fontFamily: 'Nunito-Bold',
    color: '#838FA0',
  },
  contentview: {
    flex: 0.54,
    // paddingHorizontal: 20,
    // backgroundColor:'red'
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  imgbg: {
    width: 250,
    height: 48,

  },
  searchinput: {
    color: '#19242C',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    maxWidth: 210,
    paddingLeft: 15
  },
  imgbg1: {
    width: 85,
    height: 48,
    alignItems: "center",
    justifyContent: 'center'
  },
  flatlistview: {
    height: 60,
    paddingLeft: 19
  },
  categoryview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingRight: 10,

  },
  categorytxt: {
    color: '#19242C',
    backgroundColor: '#F8F8F8',
    padding: 13,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '500',
    height: 48,
    fontFamily: 'Nunito-Bold',

  },
  headingview: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // backgroundColor:'red'
  },
  headingtxt: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Bold'
  },
  headingimg: {
    flexDirection: 'row',
    width: 65,
    justifyContent: 'space-between'
  },
  
  
  titleStyle: {
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Nunito-Medium",
  },
  indicatStyle: {
    width: "100%",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
  },
  titleStylee: {
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center",
    fontFamily: "Nunito-Bold",
    width: 70
  },
  categoryyview: {

    height: 117,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    marginHorizontal: 20,
    shadowOffset: { width: 0, height: 5 },
    paddingHorizontal: 15,
    paddingTop: 10,
    marginTop: 10
  },
  categoryytxt: {
    color: '#EA8C00',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nunito-Bold',
    paddingBottom: 7,
  },
  cardview: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    width: '62%',
    paddingLeft: 10
  },
  cardyear: {
    color: '#19242C',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Nunito-Bold',
    paddingBottom: 7
  },
  cardcondition: {
    color: '#19242C',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Nunito-Bold'
  },
  cardimg: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'space-between'
  },
  card2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    alignItems: 'center',
    paddingLeft: 10
  },
  cardstyle: {
    flexDirection: 'row',
    width: '62%',
  },
  cardprice: {
    color: '#EA8C00',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Nunito-Bold'
  },
  
});
export default Profile;