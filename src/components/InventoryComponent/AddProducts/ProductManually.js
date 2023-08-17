import React, { useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { AppImages } from '../../components/AppImages';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { assets } from "../../../react-native.config";



const ProductManually = () => {
    const navigation = useNavigation();
    const [imagePicker, setImagePicker] = useState([]);


   
    const openImagePicker = () => {
        var options = {
          title: 'Select Images',
          
          customButtons: [
            {
              name: 'customOptionKey',
              title: 'Choose Photo from Custom Option',
            },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
          multiple: true, // Enable multiple image selection
          select:1
        };
    
        launchImageLibrary(options, response => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            console.log(response.assets, 'imagepicker path');
             const selectedImages = response.assets.map(assets => assets.uri);
            setImagePicker(prevImagePicker => [...prevImagePicker, ...selectedImages]);
          }
        });
      };

    const [check, setCheck] = useState(false);
    const data = [
        { label: 'Item 1', value: '2022' },
        { label: 'Item 2', value: '2023' },

    ];
    const modal = [
        { label: 'Item 1', value: '2022' },
        { label: 'Item 2', value: '2023' },

    ];
    const select = [
        { label: 'Item 1', value: '2022' },
        { label: 'Item 2', value: '2023' },

    ];
    const condition = [
        { label: 'Item 1', value: '2022' },
        { label: 'Item 2', value: '2023' },

    ];
    const deliverd = [
        { label: 'Item 1', value: '2022' },
        { label: 'Item 2', value: '2023' },

    ];
    const location = [
        { label: 'Item 1', value: '2022' },
        { label: 'Item 2', value: '2023' },

    ];
    const productimgg = [
        { img: AppImages.manuallyproduct1 },
        { img: AppImages.manuallyproduct2 },
        { img: AppImages.manuallyproduct3 },

    ]
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.navigate('InventoryScreen') }} style={{ width: '12%' }}>
                        <Image source={AppImages.arrowleft} />
                    </TouchableOpacity>
                    <View style={{ width: '67%' }}><Text style={styles.heading}>Add product</Text></View>
                    <View style={styles.headingtext}><Text style={styles.heading1}>Clear all</Text></View>
                </View>

                <View style={styles.productview}>
                    <View style={styles.productstyle}>
                        
                        {imagePicker.length === 0 ? (
                            <TouchableOpacity onPress={openImagePicker}>
                                <Image source={AppImages.manuallyproduct} />
                            </TouchableOpacity>
                        ) : (
                          
                            <View style={{flexDirection:"row"}}>
                                {imagePicker.map((imagePicker, index) => {
                                    return(
                                    
                                        <TouchableOpacity 
                                        onPress={()=>openImagePicker()}>
                                            {index==0?
                                    <Image
                                        key={index}
                                        resizeMode="contain"
                                        source={{ uri: imagePicker }}
                                        style={{ width: 250, height: 180, borderRadius: 14 }}
                                    />:null}
                                    </TouchableOpacity>

                                    )
                                    }
                                )}
                            </View>
                        )}
                        <View style={{ marginTop: 10 }}>
                            <FlatList
                                data={productimgg}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <TouchableOpacity><Image source={item.img} style={styles.producttimg}></Image></TouchableOpacity>
                                        </View>
                                    )
                                }} />

                        </View>
                    </View>
                    <View><Text style={styles.producttxt}>Max Photos: 3,File formats: jpg, jpeg, png</Text></View>
                </View>
                <View style={styles.title}>
                    <Text style={styles.addtitle}>Add title</Text>
                    <TextInput
                        placeholder="Enter title"
                        placeholderTextColor='#19242C'
                        style={styles.txtinput} ></TextInput>
                </View>
                <View style={styles.title}>
                    <Text style={styles.addtitle}>Brand </Text>
                    <TextInput
                        placeholder="Select brand"
                        placeholderTextColor='#19242C'
                        style={styles.txtinput} ></TextInput>
                </View>
                <View style={styles.contentview}>
                    <View style={styles.Dropdownview}>
                        <Text style={styles.Dropdowntext}>Model</Text>
                        <Dropdown
                            data={modal}
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
                            style={{ marginBottom: 10 }}

                        />
                    </View>

                    <View style={styles.Dropdownview}>
                        <Text style={styles.Dropdowntext}>Year</Text>
                        <Dropdown
                            data={data}
                            placeholder="Select Year"
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            placeholderStyle={styles.placeholderStyle}
                            labelField="value"
                            valueField="value"
                            iconColor="black"
                            containerStyle={styles.containerStyle}
                            itemTextStyle={styles.itemTextStyle}
                            itemContainerStyle={styles.itemContainerStyle}
                            style={{ marginBottom: 10 }}

                        />
                    </View>
                </View>
                <View style={styles.title}>
                    <Text style={styles.addtitle}>Reference </Text>
                    <TextInput placeholder="Enter Reference" placeholderTextColor='#19242C' style={styles.txtinput} ></TextInput>
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
                        style={{ marginBottom: 10 }}
                    />
                </View>

                <View style={styles.dropdonview}>
                    <View style={styles.dropdonview1}>
                        <Text style={styles.txt}>Condition </Text>
                        <Dropdown
                            data={condition}
                            placeholder="Select Condition"
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            placeholderStyle={styles.placeholderStyle}
                            labelField="value"
                            valueField="value"
                            iconColor="black"
                            containerStyle={styles.containerStyle}
                            itemTextStyle={styles.itemTextStyle}
                            itemContainerStyle={styles.itemContainerStyle}
                            style={{ marginBottom: 10 }}
                        />
                    </View>
                    <View style={styles.dropdonview1}>
                        <Text style={styles.txt}>Delivered Content</Text>
                        <Dropdown
                            data={deliverd}
                            placeholder="Select Delivered"
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            placeholderStyle={styles.placeholderStyle}
                            labelField="value"
                            valueField="value"
                            iconColor="black"
                            containerStyle={styles.containerStyle}
                            itemTextStyle={styles.itemTextStyle}
                            itemContainerStyle={styles.itemContainerStyle}
                            style={{ marginBottom: 10 }}
                        />
                    </View>
                </View>
                <View style={styles.dropdon}>
                    <Text style={styles.dropdontxt}>Location</Text>
                    <Dropdown
                        data={location}
                        placeholder="Select Location"
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        placeholderStyle={styles.placeholderStyle}
                        labelField="value"
                        valueField="value"
                        iconColor="black"
                        containerStyle={styles.containerStyle}
                        itemTextStyle={styles.itemTextStyle}
                        itemContainerStyle={styles.itemContainerStyle}
                        style={{ marginBottom: 8 }}
                    />
                </View>
                <View style={styles.title}>
                    <Text style={styles.addtitle}>Price</Text>
                    <TextInput placeholder="Enter Price" placeholderTextColor='#19242C' style={styles.txtinput} ></TextInput>
                </View>
                <View style={styles.description}>
                    <Text style={styles.adddescription}>Add Description</Text>
                    <Text style={styles.descriptiontxt} >Lorem ipsum dolor sit amet consectetur. Enim aenean id elit sit vel at tempor dignissim imperdiet. Turpis enim sed dui justo sit ac enim.</Text>
                </View>
                <View style={styles.checkbox} >
                    <TouchableOpacity onPress={() => setCheck(!check)}>{check ? <Image source={AppImages.chk} style={{ width: 24, height: 24 }} /> : <Image source={AppImages.untickk} style={{ width: 24, height: 24 }} />}</TouchableOpacity>
                    <Text style={styles.checkboxtxt}>I allow holding this item</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('AddProduct') }}>
                        <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Nunito-Bold' }}>Next</Text>
                    </TouchableOpacity></View>
                <View style={{ height: 60 }}>

                </View>

            </View>
        </ScrollView>
    )
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        paddingTop: 40
    },
    header: {
        height: 60,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#EAECF0',
        // backgroundColor: 'gray',
        // justifyContent:'space-between'
    },
    heading: {
        color: '#1F1F39',
        fontSize: 16,
        fontFamily: 'Nunito-Bold',

    },
    headingtext: {
        width: '20%',

    },
    heading1: {
        color: '#1F1F39',
        fontSize: 16,
        fontFamily: 'Nunito-Bold'
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
    producttimg: {
        width: 56,
        height: 56,
        marginBottom: 7,
        borderRadius:12
    },
    producttxt: {
        color: '#838FA0',
        fontSize: 12,
        fontFamily: 'Nunito-Medium'
    },
    title: {
        flex: 0.10,
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#EAECF0',
        justifyContent: 'center'
    },
    addtitle: {
        color: '#838FA0',
        fontSize: 12,
        fontFamily: 'Nunito-Medium',
        paddingLeft: 2,
        paddingTop: 10
    },
    txtinput: {
        color: '#838FA0',
        fontSize: 14,
        fontFamily: 'Nunito-Medium',
    },
    dropdon: {
        borderBottomWidth: 1,
        borderColor: '#EAECF0',
        flex: 0.10,
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingTop: 10
    },
    dropdontxt: {
        color: '#838FA0',
        fontSize: 12,
        fontFamily: 'Nunito-Medium',
        paddingBottom: 5
    },
    dropdonview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    dropdonview1: {
        borderBottomWidth: 1,
        borderColor: '#EAECF0',
        width: '48%'
    },
    txt: {
        color: '#838FA0',
        fontSize: 12,
        fontFamily: 'Nunito-Medium',
        paddingTop: 15
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
        paddingLeft: 2,
        paddingBottom: 10
    },
    descriptiontxt: {
        color: '#19242C',
        fontSize: 14,
        fontFamily: 'Nunito-Medium'
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        height: 60
    },
    checkboxtxt: {
        color: '#19242C',
        fontSize: 14,
        fontFamily: 'Nunito-Medium',
        paddingLeft: 12
    },
    button: {
        backgroundColor: '#19242C',
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    contentview: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        flex: 0.10,
        justifyContent: 'space-between',
    },
    content: {
        width: '48%',
        borderBottomWidth: 1,
        borderColor: '#EAECF0'
    },
    contentmodal: {
        color: '#838FA0',
        fontSize: 12,
        fontFamily: 'Nunito-Medium',
        paddingLeft: 2,
        paddingTop: 10
    },
    contenttext: {
        color: '#838FA0',
        fontSize: 14,
        fontFamily: 'Nunito-Medium',
    },
    Dropdownview: {
        borderBottomWidth: 1,
        width: '48%',
        borderColor: '#EAECF0'
    },
    Dropdowntext: {
        color: '#838FA0',
        fontSize: 12,
        fontFamily: 'Nunito-Medium',
        paddingTop: 10
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
        borderRadius: 15
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
})
export default ProductManually;