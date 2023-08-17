import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';

const AddProduct = () => {
  const navigation = useNavigation();
  const [product, setProduct] = useState(false);
  const [check, setCheck] = useState(false);
  const data = [
    {label: 'Item 1', value: '2022'},
    {label: 'Item 2', value: '2023'},
  ];
  const select = [
    {label: 'Item 1', value: '2022'},
    {label: 'Item 2', value: '2023'},
  ];
  const condition = [
    {label: 'Item 1', value: '2022'},
    {label: 'Item 2', value: '2023'},
  ];
  const deliverd = [
    {label: 'Item 1', value: '2022'},
    {label: 'Item 2', value: '2023'},
  ];
  const location = [
    {label: 'Item 1', value: '2022'},
    {label: 'Item 2', value: '2023'},
  ];
  const productimgg = [
    {img: AppImages.productimg1},
    {img: AppImages.productimg2},
    {img: AppImages.productimg3},
  ];
  const navfunc = () => {
    setProduct(false);
    navigation.navigate('BottomNavigation');
  };
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('InventoryScreen');
            }}
            style={{width: '12%'}}>
            <Image source={AppImages.arrowleft} />
          </TouchableOpacity>
          <View style={{width: '67%'}}>
            <Text style={styles.heading}>Add product</Text>
          </View>
          <View style={styles.headingtext}>
            <TouchableOpacity>
              <Text style={styles.heading1}>Clear all</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.productview}>
          <View style={styles.productstyle}>
            <View style={styles.productbg}>
              <View style={styles.productimage}>
                <TouchableOpacity>
                  <Image
                    source={AppImages.closecircle}
                    style={{width: 12, height: 12}}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProductDetailScreen');
                }}>
                <Image
                  source={AppImages.productimageshadow}
                  style={{width: 129, height: 147}}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              <FlatList
                data={productimgg}
                renderItem={({item}) => {
                  return (
                    <View>
                      <TouchableOpacity>
                        <Image
                          source={item.img}
                          style={styles.producttimg}></Image>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View>
            <Text style={styles.producttxt}>
              Max Photos: 3,File formats: jpg, jpeg, png
            </Text>
          </View>
        </View>
        <View style={styles.title}>
          <Text style={styles.addtitle}>Add title</Text>
          <TextInput
            placeholder="Rolex Z902 - Boys"
            placeholderTextColor="#19242C"
            style={styles.txtinput}></TextInput>
        </View>
        <View style={styles.title}>
          <Text style={styles.addtitle}>Brand </Text>
          <TextInput
            placeholder="Patek Philippe"
            placeholderTextColor="#19242C"
            style={styles.txtinput}></TextInput>
        </View>
        <View style={styles.contentview}>
          <View style={styles.Dropdownview}>
            <Text style={styles.Dropdowntext}>Model</Text>
            <Dropdown
              data={data}
              placeholder="Nautilus"
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              labelField="value"
              valueField="value"
              iconColor="black"
              containerStyle={styles.containerStyle}
              itemTextStyle={styles.itemTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
              style={{marginBottom: 10}}
            />
          </View>
          {/* <View style={styles.content}>
                        <Text style={styles.contentmodal}>Model</Text>
                        <TextInput
                            placeholder="Nautilus"
                            placeholderTextColor='#19242C'
                            style={styles.contenttext} ></TextInput>
                    </View> */}
          <View style={styles.Dropdownview}>
            <Text style={styles.Dropdowntext}>Year</Text>
            <Dropdown
              data={data}
              placeholder="2022"
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              labelField="value"
              valueField="value"
              iconColor="black"
              containerStyle={styles.containerStyle}
              itemTextStyle={styles.itemTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
            />
          </View>
        </View>
        <View style={styles.title}>
          <Text style={styles.addtitle}>Reference </Text>
          <TextInput
            placeholder="5711-001"
            placeholderTextColor="#19242C"
            style={styles.txtinput}></TextInput>
        </View>
        <View style={styles.dropdon}>
          <Text style={styles.dropdontxt}>Case Size</Text>
          <Dropdown
            data={select}
            placeholder="Select"
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            labelField="value"
            valueField="value"
            iconColor="black"
            containerStyle={styles.containerStyle}
            itemTextStyle={styles.itemTextStyle}
            itemContainerStyle={styles.itemContainerStyle}
            style={{marginBottom: 10}}
          />
        </View>

        <View style={styles.dropdonview}>
          <View style={styles.dropdonview1}>
            <Text style={styles.txt}>Condition </Text>
            <Dropdown
              data={condition}
              placeholder="User"
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              labelField="value"
              valueField="value"
              iconColor="black"
              containerStyle={styles.containerStyle}
              itemTextStyle={styles.itemTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
              style={{marginBottom: 10}}
            />
          </View>
          <View style={styles.dropdonview1}>
            <Text style={styles.txt}>Delivered Content</Text>
            <Dropdown
              data={deliverd}
              placeholder="Full Set"
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              labelField="value"
              valueField="value"
              iconColor="black"
              containerStyle={styles.containerStyle}
              itemTextStyle={styles.itemTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
              style={{marginBottom: 10}}
            />
          </View>
        </View>
        <View style={styles.dropdon}>
          <Text style={styles.dropdontxt}>Location</Text>
          <Dropdown
            data={location}
            placeholder="Any"
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            placeholderStyle={styles.placeholderStyle}
            labelField="value"
            valueField="value"
            iconColor="black"
            containerStyle={styles.containerStyle}
            itemTextStyle={styles.itemTextStyle}
            itemContainerStyle={styles.itemContainerStyle}
            style={{marginBottom: 8}}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.addtitle}>Price</Text>
          <TextInput
            placeholder="$ 10.000"
            placeholderTextColor="#19242C"
            style={styles.txtinput}></TextInput>
        </View>
        <View style={styles.description}>
          <Text style={styles.adddescription}>Add Description</Text>
          <Text style={styles.descriptiontxt}>
            Lorem ipsum dolor sit amet consectetur. Enim aenean id elit sit vel
            at tempor dignissim imperdiet. Turpis enim sed dui justo sit ac
            enim.
          </Text>
        </View>
        <View style={styles.checkbox}>
          <TouchableOpacity onPress={() => setCheck(!check)}>
            {check ? (
              <Image source={AppImages.chk} style={{width: 24, height: 24}} />
            ) : (
              <Image
                source={AppImages.untickk}
                style={{width: 24, height: 24}}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxtxt}>I allow holding this item</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setProduct(true)}>
            <Text
              style={{color: 'white', fontSize: 16, fontFamily: 'Nunito-Bold'}}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: 60}}></View>
        {/* start modal */}
        <Modal isVisible={product}>
          <View style={styles.productvieww}>
            <View style={styles.blockChatt}>
              <Image
                source={AppImages.tickbadge}
                style={styles.blockChattimg}
              />
              <Text style={styles.blockChattheading}>
                Product Added Successfully
              </Text>
              <Text style={styles.blockChatttext}>
                You're welcome! If you have any more questions or need further
                assistance, feel free to ask. Enjoy using your new product!
              </Text>
            </View>
            <View style={styles.modalView}>
              <TouchableOpacity
                onPress={() => navfunc()}
                style={styles.modalView1}>
                <View style={styles.modalbtn}>
                  <Text style={styles.modaltxt}>Go to home</Text>
                  <Image
                    source={AppImages.ar}
                    style={{width: 24, height: 24}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingTop: 40,
  },
  header: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
  },
  heading: {
    color: '#1F1F39',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  headingtext: {
    width: '20%',

    // alignItems: 'flex-end'
  },
  heading1: {
    color: '#1F1F39',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  productview: {
    flex: 0.32,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  productstyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productbg: {
    backgroundColor: '#F8F8F8',
    width: 253,
    height: 185,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productimage: {
    width: '90%',
    alignItems: 'flex-end',
  },
  producttimg: {
    width: 56,
    height: 56,
    marginBottom: 8,
  },
  producttxt: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
  },
  title: {
    flex: 0.1,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
    justifyContent: 'center',
  },
  addtitle: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    paddingLeft: 2,
    paddingTop: 10,
  },
  txtinput: {
    color: '#838FA0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
  dropdon: {
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
    flex: 0.1,
    marginHorizontal: 20,
    justifyContent: 'center',
    paddingTop: 10,
  },
  dropdontxt: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    // paddingBottom: 5
  },
  dropdonview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  dropdonview1: {
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
    width: '48%',
  },
  txt: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    paddingTop: 15,
  },
  description: {
    height: 120,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
    justifyContent: 'center',
  },
  adddescription: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    paddingBottom: 10,
  },
  descriptiontxt: {
    color: '#19242C',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
  },
  checkboxtxt: {
    color: '#19242C',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    paddingLeft: 12,
  },
  button: {
    backgroundColor: '#19242C',
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  contentview: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flex: 0.1,
    justifyContent: 'space-between',
  },
  content: {
    width: '48%',
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
  },
  contentmodal: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    paddingLeft: 2,
    paddingTop: 10,
  },
  contenttext: {
    color: '#838FA0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
  Dropdownview: {
    borderBottomWidth: 1,
    width: '48%',
    borderColor: '#EAECF0',
  },
  Dropdowntext: {
    color: '#838FA0',
    fontSize: 13,
    fontFamily: 'Nunito-Medium',
    paddingTop: 10,
  },
  selectedTextStyle: {
    color: '#202342',
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
  containerStyle: {},
  itemTextStyle: {
    color: '#202342',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
  },
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
  productvieww: {
    backgroundColor: 'white',
    height: '38%',
    borderRadius: 15,
  },
  blockChatt: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 170,
    paddingHorizontal: 30,
    // backgroundColor:'red'
  },
  blockChattimg: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  blockChattheading: {
    color: '#19242C',
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  blockChatttext: {
    color: '#838FA0',
    fontSize: 11,
    fontFamily: 'Nunito-Medium',
    paddingTop: 15,
    textAlign: 'center',
  },
  modalView: {
    alignItems: 'center',
    marginTop: 20,
  },
  modalView1: {
    backgroundColor: 'black',
    width: '84%',
    height: 45,
    borderRadius: 50,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  modalbtn: {
    width: '70%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modaltxt: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
  },
});
export default AddProduct;
