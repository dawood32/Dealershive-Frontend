import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Image} from 'react-native-animatable';
import {Dropdown} from 'react-native-element-dropdown';
import {AppImages} from '../AppImages';
import {useSelector, useDispatch} from 'react-redux';
import {filterData} from '../../redux/action/appcall';
import {homeData} from '../../redux/action/appcall';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Filter = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [valuebrand, setvaluebrand] = useState('');
  const [dialColor, setdialColor] = useState('');
  const [yearvalue, setyearvalue] = useState('');
  const [referenceValue, setReferenceValue] = useState('');
  const [dilveryContent, setDilveryContent] = useState('full set');
  const [caseSize, setCaseSize] = useState('');
  const [D1, setD1] = useState(true);
  const [D2, setD2] = useState(false);
  const [D3, setD3] = useState(false);

  const [D4, setD4] = useState(false);

  const [D5, setD5] = useState(false);

  const currentYear = new Date().getFullYear();

  const years = Array.from({length: 10}, (_, index) => currentYear - index);

  const newArray = years.map(value => ({vyear: value.toString()}));

  const filterresult = useSelector(state => state?.FilterDataReducer?.data);
  const goback = () => {
    navigation.goBack();
  };
  useEffect(() => {
    console.log(route.params.sortValue, 'typecccc');
  });
  const resultfilter = async () => {
    let userid = await AsyncStorage.getItem('@user_id');
    let iduser = +userid;

    route.params.setvaluebrand1(valuebrand);
    route.params.setdialColor1(dialColor);

    route.params.setyearvalue1(yearvalue);

    route.params.setReferenceValue1(referenceValue);

    route.params.setDilveryContent1(dilveryContent);

    route.params.setCaseSize1(caseSize);
    route.params.setFilter(true);

    if (route.params.screentype == 'home') {
      const params =
        'screen=' +
        'home' +
        '&filter=' +
        'true' +
        '&brand=' +
        valuebrand +
        '&model=' +
        yearvalue +
        '&reference=' +
        referenceValue +
        '&size=' +
        caseSize +
        '&color=' +
        dialColor +
        '&sort=' +
        route.params.sortValue +
        '&delivery_content=' +
        dilveryContent;
      dispatch(homeData(params, onSuccess));
    } else if (
      route.params.screentype == 'dealer' ||
      route.params.screentype == 'userprofile'
    ) {
      const params =
        'screen=' +
        'dealer' +
        '&dealer_id=' +
        iduser +
        '&filter=' +
        'true' +
        '&brand=' +
        valuebrand +
        '&model=' +
        yearvalue +
        '&reference=' +
        referenceValue +
        '&size=' +
        caseSize +
        '&color=' +
        dialColor +
        '&delivery_content=' +
        dilveryContent;
      dispatch(homeData(params, onSuccess));
    }
  };

  const onSuccess = () => {
    navigation.goBack();
    route.params.setSearchsection(true);
  };
  const clearAll = () => {
    setdialColor(''),
      setyearvalue(''),
      setReferenceValue(''),
      setDilveryContent(''),
      setCaseSize(''),
      setvaluebrand('');
  };
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => goback()}
          style={{flexDirection: 'row'}}>
          <Image source={AppImages.arrowback} style={styles.arrowimg} />
          <Text style={styles.headertext}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            padding: 10,
            justifyContent: 'flex-end',
          }}
          onPress={() => clearAll()}>
          <Text style={styles.headertext1}>Clear all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.dropdownbox}>
          <Text style={styles.dropdwn1text}>Brand</Text>
          <Dropdown
            data={filterresult?.brands}
            placeholder="Any"
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            labelField="name"
            valueField="name"
            value={valuebrand}
            onChange={e => {
              setvaluebrand(e.name);
            }}
            containerStyle={styles.containerStyle}
            itemTextStyle={styles.itemTextStyle}
            itemContainerStyle={styles.itemContainerStyle}
            iconColor="black"
          />
        </View>
        <View style={styles.dropdownbox}>
          <Text style={styles.dropdwn1text}>Modal</Text>
          <Dropdown
            data={newArray}
            placeholder="Any"
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            labelField="vyear"
            valueField="vyear"
            value={yearvalue}
            onChange={e => {
              setyearvalue(e.vyear);
            }}
            containerStyle={styles.containerStyle}
            itemTextStyle={styles.itemTextStyle}
            itemContainerStyle={styles.itemContainerStyle}
            iconColor="black"
          />
        </View>
        <View style={styles.dropdownbox}>
          <Text style={styles.dropdwn1text}>Reference number</Text>
          <TextInput
            placeholder="23884"
            placeholderTextColor="#202342"
            keyboardType="numeric"
            style={styles.txtinputstyle}
            value={referenceValue}
            onChangeText={e => setReferenceValue(e)}></TextInput>
        </View>
      </View>
      <View style={styles.radiobutton}>
        <Text style={styles.container1heading}>Delivery Content</Text>
        <View style={styles.listview}>
          <TouchableOpacity
            onPress={() => {
              setD1(true),
                setD2(false),
                setD3(false),
                setD4(false),
                setD5(false),
                setDilveryContent('full set');
            }}>
            <View style={styles.list}>
              {D1 ? (
                <View style={styles.list1} />
              ) : (
                <View style={styles.list2text} />
              )}
              <Text style={styles.list1text}>Full Set</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setD1(false),
                setD2(true),
                setD3(false),
                setD4(false),
                setD5(false),
                setDilveryContent('no paper');
            }}>
            <View style={styles.list2}>
              {D2 ? (
                <View style={styles.list1} />
              ) : (
                <View style={styles.list2text} />
              )}

              <Text style={styles.list2heading}>No Paper</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setD1(false),
                setD2(false),
                setD3(true),
                setD4(false),
                setD5(false),
                setDilveryContent('no box');
            }}>
            <View style={styles.list2}>
              {D3 ? (
                <View style={styles.list1} />
              ) : (
                <View style={styles.list2text} />
              )}

              <Text style={styles.list2heading}>No Box</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.list3}>
          <TouchableOpacity
            onPress={() => {
              setD1(false),
                setD2(false),
                setD3(false),
                setD4(true),
                setD5(false),
                setDilveryContent('watch and paper only');
            }}>
            <View style={styles.list2}>
              {D4 ? (
                <View style={styles.list1} />
              ) : (
                <View style={styles.list2text} />
              )}

              <Text style={styles.list2heading}>Watch and Paper Only</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setD1(false),
                setD2(false),
                setD3(false),
                setD4(false),
                setD5(true),
                setDilveryContent('watch only');
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 4,
              }}>
              {D5 ? (
                <View style={styles.list1} />
              ) : (
                <View style={styles.list2text} />
              )}
              <Text style={styles.list2heading}>Watch Only</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={[styles.dropdownbox, {marginTop: -20}]}>
          <Text style={styles.dropdwn1text}>Case Size</Text>
          <TextInput
            placeholder="Enter Case Size"
            placeholderTextColor="#202342"
            keyboardType="numeric"
            value={caseSize}
            onChangeText={e => setCaseSize(e)}
            style={styles.txtinputstyle}></TextInput>
        </View>

        <View style={styles.dropdownbox}>
          <Text style={styles.dropdwn1text}>Dial Color</Text>
          <Dropdown
            data={filterresult?.dialColor}
            placeholder="Any"
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            labelField="color"
            valueField="color"
            value={dialColor}
            onChange={e => {
              console.log(e.color, 'eeee');
              setdialColor(e.color);
            }}
            containerStyle={styles.containerStyle}
            itemTextStyle={styles.itemTextStyle}
            itemContainerStyle={styles.itemContainerStyle}
            iconColor="black"
          />
        </View>
      </View>
      <View style={styles.applybutton}>
        <TouchableOpacity
          onPress={() => resultfilter()}
          style={styles.buttonstyle}>
          <Text style={styles.buttontext}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  headertext: {
    color: '#19242C',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    marginLeft: 20,
  },
  headertext1: {
    color: '#1F1F39',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    top: 10,
    left: 10,
  },
  header: {
    flex: 0.3,
    // backgroundColor:'lightgreen',
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 20,
    alignItems: 'flex-end',
    borderColor: '#rgba(25, 36, 44, 0.12)',
  },
  dropdwn1text: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
  },
  inputSearchStyle: {
    color: '#202342',
  },
  placeholderStyle: {
    color: '#202342',

    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
  selectedTextStyle: {
    color: '#202342',
    fontFamily: 'Nunito-Medium',
  },
  containerStyle: {},
  itemTextStyle: {
    color: '#202342',

    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
  itemContainerStyle: {},
  txtinputstyle: {
    color: 'black',
    // top: 3,
    width: '100%',

    height: 50,
  },
  container1heading: {
    color: '#202342',

    fontFamily: 'Nunito-Medium',
    fontSize: 12,
  },
  listview: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginTop: 15,
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list1: {
    borderRadius: 50,
    borderWidth: 6,
    width: 18,
    height: 18,
    borderColor: '#EA8C00',
  },
  list1text: {
    color: '#19242C',
    fontFamily: 'Nunito-Medium',

    marginLeft: 10,
  },
  list2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list2text: {
    borderRadius: 50,
    borderWidth: 1,
    width: 18,
    height: 18,
    borderColor: '#D9D9D9',
  },
  list2heading: {
    color: '#19242C',
    fontFamily: 'Nunito-Medium',

    marginLeft: 10,
  },
  list3: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    marginTop: 15,
  },

  buttonview: {
    height: 120,

    paddingTop: 15,
  },
  buttonstyle: {
    backgroundColor: '#19242C',
    height: 60,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttontext: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: '#FFF',
  },

  arrowimg: {alignSelf: 'center', width: 24, height: 24},
  middleContainer: {
    flex: 1.5,
  },
  dropdownbox: {
    borderBottomWidth: 1,
    marginTop: 20,
    borderColor: '#rgba(25, 36, 44, 0.12)',
  },
  radiobutton: {flex: 0.7},
  bottomContainer: {flex: 1},
  applybutton: {flex: 0.8},
});
export default Filter;
