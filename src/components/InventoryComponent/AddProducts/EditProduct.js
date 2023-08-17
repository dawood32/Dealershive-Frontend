import React, { useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, TextInput, ScrollView, Dimensions, SafeAreaView } from "react-native";
import { AppImages } from '../../components/AppImages';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import { SwipeablePanel } from 'rn-swipeable-panel-with-fade-out';
const { height, width } = Dimensions.get('screen');
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const EditProduct = () => {

    const navigation = useNavigation();
    const imagepicker = type => {
        var options = {
            title: 'Select Image',
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
                // setCoverFilePath(response.uri);
            }
        });
    };

    const [panelProps, setPanelProps] = useState({
        noBar: true,
        fullWidth: true,
        openLarge: true,
        closeOnTouchOutside: true,
        // onlyLarge: true,
        scrollViewProps: {
            // scrollEnabled:false,
            showsVerticalScrollIndicator: false,

        },
        showCloseButton: false,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        // ...or any prop you want
    });
    const [isPanelActive, setIsPanelActive] = useState(false);

    const openPanel = () => {
        setIsPanelActive(true);
    };

    const closePanel = () => {
        setIsPanelActive(false);
    };
    const [change, setChange] = useState(false);
    const [archive, setArchive] = useState(false);
    const [product, setProduct] = useState(false);
    const [check, setCheck] = useState(false);
    const data = [
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
        { img: AppImages.productimg3 },

    ]
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => { navigation.navigate('InventoryScreen') }} style={{ width: '12%', }}><Image source={AppImages.arrowleft} /></TouchableOpacity>
                        <View style={{ width: '67%' }}><Text style={styles.heading}>Add product</Text></View>
                        <View style={styles.headingtext}>
                            <TouchableOpacity onPress={() => setArchive(true)}>
                                <Image source={AppImages.archive} style={{ width: 24, height: 24 }} /></TouchableOpacity>
                            <TouchableOpacity onPress={() => setProduct(true)}><Image source={AppImages.delete} style={{ width: 24, height: 24, tintColor: 'black' }} />
                            </TouchableOpacity></View>
                    </View>

                    <View style={styles.productview}>
                        <View style={styles.productstyle}>
                            <View style={styles.productstyle1}>
                                <View style={styles.close}>
                                    <Image source={AppImages.ccircle} style={{ width: 12, height: 12, }} />
                                </View>
                                <TouchableOpacity onPress={() => setIsPanelActive(true)}><Image source={AppImages.productimageshadow} style={{ width: 129, height: 147 }} /></TouchableOpacity>
                                </View>
                            <View style={{ marginTop: 10 }}>
                                <FlatList
                                    data={productimgg}
                                    renderItem={({ item }) => {
                                        return (
                                            <View>
                                                <TouchableOpacity onPress={() => { navigation.navigate('NetworkProblem') }}><Image source={item.img} style={styles.producttimg}></Image></TouchableOpacity>
                                            </View>
                                        )
                                    }} />

                            </View>
                        </View>
                        <View>
                            <Text style={styles.producttxt}>Max Photos: 3,File formats: jpg, jpeg, png</Text>
                        </View>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.addtitle}>Add title</Text>
                        <TextInput
                            placeholder="Rolex Z902 - Boys"
                            placeholderTextColor='#19242C'
                            style={styles.txtinput} ></TextInput>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.addtitle}>Brand </Text>
                        <TextInput
                            placeholder="Patek Philippe"
                            placeholderTextColor='#19242C'
                            style={styles.txtinput} >
                        </TextInput>
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
                                style={{ marginBottom: 10 }}
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
                        <TextInput placeholder="5711-001" placeholderTextColor='#19242C' style={styles.txtinput} ></TextInput>
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
                                style={{ marginBottom: 10 }}
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
                                style={{ marginBottom: 10 }}
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
                            style={{ marginBottom: 8 }}
                        />
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.addtitle}>Price</Text>
                        <TextInput placeholder="$ 10.000" placeholderTextColor='#19242C' style={styles.txtinput} ></TextInput>
                    </View>
                    <View style={styles.description}>
                        <Text style={styles.adddescription}>Add Description</Text>
                        <Text style={styles.descriptiontxt} >Lorem ipsum dolor sit amet consectetur. Enim aenean id elit sit vel at tempor dignissim imperdiet. Turpis enim sed dui justo sit ac enim.</Text>
                    </View>
                    <View style={styles.checkbox} >
                        <TouchableOpacity onPress={() => setCheck(!check)}>{check ? <Image source={AppImages.tickk} style={{ width: 24, height: 24 }} /> : <Image source={AppImages.untickk} style={{ width: 24, height: 24 }} />}</TouchableOpacity>
                        <Text style={styles.checkboxtxt}>I allow holding this item</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.button} onPress={() => setChange(true)} >
                            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Nunito-Bold' }}>Save Changes</Text>
                        </TouchableOpacity></View>
                    <View style={{ height: 60 }}>

                    </View>
                    {/* start delete modal */}
                    <Modal
                        isVisible={product}>
                        <View style={styles.productvieww}>
                            <View style={styles.blockChatt}>
                                <Image source={AppImages.delete} style={styles.blockChattimg} />
                                <Text style={styles.blockChattheading}>Confirmation</Text>
                                <Text style={styles.blockChatttext}>Are you sure, you want to delete the item?</Text>
                            </View>
                            <View style={styles.swipeablePanelbtnview}>
                                <TouchableOpacity style={styles.btn} onPress={() => setProduct(false)}>
                                    <Text style={styles.btntext}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn2}>
                                    <Text style={styles.btn2text}>Yes, Delete</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Modal>
                    {/* closed delete modal */}

                    {/* start archive modal */}
                    <Modal
                        isVisible={archive}>
                        <View style={styles.archivevieww}>
                            <View style={styles.archiveChatt}>
                                <Image source={AppImages.archive} style={styles.archiveChattimg} />
                                <Text style={styles.archiveChattheading}>Archive this item</Text>
                                <Text style={styles.archiveChatttext}>Are you sure, you want to archive this item?</Text>
                            </View>
                            <View style={styles.swipeabllePanelbtnview}>
                                <TouchableOpacity style={styles.btnarchive} onPress={() => setArchive(false)}>
                                    <Text style={styles.btntextarchive}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn2archive}>
                                    <Text style={styles.btn2textarchive}>Archive</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Modal>
                    {/* closed archive modal */}
                    {/* start change modal */}
                    <Modal
                        isVisible={change}>
                        <View style={styles.productvieww}>
                            <View style={styles.blockChatt}>
                                <Image source={AppImages.tickbadge} style={styles.changeChattimg} />
                                <Text style={styles.blockChattheading}>Changes Saved</Text>
                                <Text style={styles.blockChatttext}>Great, your changes have been saved successfully,
                                    Thanks.</Text>
                            </View>
                            <View style={styles.modalView}>
                                <TouchableOpacity onPress={() => setChange(false)} style={styles.modalView1}>
                                    <View style={styles.modalbtn}>
                                        <Text style={styles.modaltxt}>Go to home</Text>
                                        <Image source={AppImages.arrowright} style={{ width: 24, height: 24 }} />
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </Modal>
                    {/* closed change modal */}
                </View>
            </ScrollView>
            {/* start edit panel */}
            <SwipeablePanel
                style={{ height: height * 0.34, }}
                {...panelProps}
                isActive={isPanelActive}>
                <View style={{ paddingHorizontal: 20, }}>
                    <View style={styles.editpanel}>
                        <Text style={styles.paneltxt}>Edit Picture</Text>
                    </View>
                    <TouchableOpacity style={styles.btn1} onPress={imagepicker}>
                        <Text style={styles.btn1txt}>Upload new image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnn2}>
                        <Text style={styles.btnn2txt}>Remove image</Text>
                    </TouchableOpacity>
                </View>
            </SwipeablePanel>
            {/* closed edit panel */}
        </SafeAreaView>
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

    },
    heading: {
        color: '#1F1F39',
        fontSize: 16,
        fontFamily: 'Nunito-Bold'
    },
    headingtext: {
        width: '20%',
        // alignItems: 'flex-end'
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    productstyle1: {
        backgroundColor: '#F8F8F8',
        width: 253,
        height: 185,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    close: {
        width: '90%',
        alignItems: 'flex-end'
    },
    producttimg: {
        width: 56,
        height: 56,
        marginBottom: 8
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
        justifyContent: 'center',
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
        // paddingBottom: 5
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
        fontSize: 13,
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
        height: '35%',
        borderRadius: 15
    },
    blockChatt: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        paddingHorizontal: 30,
        // backgroundColor:'red'
    },
    blockChattimg: {
        width: 40,
        height: 40,
        marginBottom: 10,
        tintColor: 'black'

    },
    changeChattimg: {
        width: 40,
        height: 40,
        marginBottom: 10,
        marginTop: 15


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
        marginTop: 20
    },
    modalView1: {
        backgroundColor: 'black',
        width: '84%',
        height: 48,
        borderRadius: 50,
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    modalbtn: {
        width: '70%',
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modaltxt: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Nunito-Bold'
    },
    editpanel: {
        height: 70,
        justifyContent: 'center',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingTop: 10,
        borderColor: '#EAECF0'
    },
    paneltxt: {
        color: '#19242C',
        fontSize: 16,
        fontFamily: 'Nunito-Bold'
    },
    btn1: {
        width: '100%',
        height: 48,
        borderWidth: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderColor: '#838FA0'
    },
    btn1txt: {
        color: '#19242C',
        fontSize: 16,
        fontFamily: 'Nunito-Bold'
    },
    btnn2: {
        width: '100%',
        height: 48,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#E93131'
    },
    btnn2txt: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Nunito-Bold'
    },
    swipeablePanelbtnview: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor:'red',
        height: 75,
        paddingHorizontal: 20
    },
    btn: {
        borderWidth: 1,
        borderColor: '#19242C',
        width: 125,
        height: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btntext: {
        color: '#19242C',
        fontSize: 16,
        fontFamily: 'Nunito-Bold',
    },
    btn2: {
        width: 125,
        height: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CD1B1B'
    },
    btn2text: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Nunito-Bold',
    },
    archivevieww: {
        backgroundColor: 'white',
        height: '35%',
        borderRadius: 15
    },
    archiveChatt: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        paddingHorizontal: 30,
        // backgroundColor:'red'
    },
    archiveChattimg: {
        width: 40,
        height: 40,
        marginBottom: 10,
        tintColor: 'black'

    },
    archiveChattheading: {
        color: '#19242C',
        fontSize: 20,
        fontFamily: 'Nunito-Bold',
    },
    archiveChatttext: {
        color: '#838FA0',
        fontSize: 11,
        fontFamily: 'Nunito-Medium',
        paddingTop: 15,
        textAlign: 'center',

    },
    swipeabllePanelbtnview: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor:'red',
        height: 75,
        paddingHorizontal: 20
    },
    btnarchive: {
        borderWidth: 1,
        borderColor: '#19242C',
        width: 125,
        height: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btntextarchive: {
        color: '#19242C',
        fontSize: 16,
        fontFamily: 'Nunito-Bold',
    },
    btn2archive: {
        width: 125,
        height: 45,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    btn2textarchive: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Nunito-Bold',
    },
})
export default EditProduct;