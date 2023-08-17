import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fileView} from './Documents';
const MediaDocument = () => {
  const navigation = useNavigation();
  const Documentlist = useSelector(
    state => state?.ChatMediaReducer?.data?.data,
  );

  const category = [
    {name: 'Photos'},
    {name: 'Videos'},
    {name: 'Links'},
    {name: 'Documents'},
  ];
  const recent = [
    {
      image: AppImages.pdf,
      name: 'Golden Rolex Certificate.pdf',
      mb: '2.5 MB - PDF',
      time: '05/05/2023',
    },
  ];
  const lastweek = [
    {
      image: AppImages.pdf,
      name: 'Golden Rolex Certificate.pdf',
      mb: '2.5 MB - PDF',
      time: '05/05/2023',
    },
    {
      image: AppImages.pdf,
      name: 'Golden Rolex Certificate.pdf',
      mb: '2.5 MB - PDF',
      time: '05/05/2023',
    },
    {
      image: AppImages.pdf,
      name: 'Golden Rolex Certificate.pdf',
      mb: '2.5 MB - PDF',
      time: '05/05/2023',
    },
  ];
  const lastmonth = [
    {
      image: AppImages.pdf,
      name: 'Golden Rolex Certificate.pdf',
      mb: '2.5 MB - PDF',
      time: '05/05/2023',
    },
    {
      image: AppImages.pdf,
      name: 'Golden Rolex Certificate.pdf',
      mb: '2.5 MB - PDF',
      time: '05/05/2023',
    },
    {
      image: AppImages.pdf,
      name: 'Golden Rolex Certificate.pdf',
      mb: '2.5 MB - PDF',
      time: '05/05/2023',
    },
    {
      image: AppImages.pdf,
      name: 'Golden Rolex Certificate.pdf',
      mb: '2.5 MB - PDF',
      time: '05/05/2023',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.recentview}>
          {/* <Text style={styles.recenttxt}>Recent</Text> */}
          <FlatList
            data={Documentlist}
            renderItem={({item}) => {
              let cmnt = item.orignal_name;
              Type = cmnt?.substr(cmnt.lastIndexOf('.') + 1);

              return (
                <TouchableOpacity
                  onPress={() => fileView(item.message)}
                  style={styles.recent1}>
                  <View
                    style={{
                      width: '20%',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={
                        //icon for type pdf
                        Type == 'pdf'
                          ? AppImages.pdf
                          : // icon for types doc and docx
                          Type === 'doc' || Type == 'docx'
                          ? AppImages.doc
                          : Type === 'xls' || Type === 'xlsx'
                          ? AppImages.xlsxicon
                          : Type === 'png' || Type === 'jpg' || Type === 'jpeg'
                          ? AppImages.imageicon
                          : AppImages.othericon
                      }
                      style={styles.linkimgsize}></Image>
                  </View>
                  <View
                    style={{
                      width: '70%',
                      justifyContent: 'center',
                      //   marginLeft: 15,
                    }}>
                    <Text style={styles.title}>{item.orignal_name}</Text>
                    <Text style={styles.externallink}>{item.mb}</Text>
                  </View>
                  {/* <View style={{justifyContent: 'flex-end'}}>
                    <Text style={styles.descriptionline}>{item.time}</Text>
                  </View> */}
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {/* <View style={{paddingHorizontal: 20}}>
          <Text style={styles.lastweektxt}>Last Week</Text>
          <FlatList
            data={lastweek}
            renderItem={({item}) => {
              return (
                <View style={styles.lastweek1}>
                  <View style={styles.linkimg}>
                    <TouchableOpacity>
                      <Image
                        source={item.image}
                        style={styles.linkimgsize}></Image>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: '62%',
                      justifyContent: 'space-between',
                      marginLeft: 15,
                    }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.externallink}>{item.mb}</Text>
                  </View>
                  <View style={{justifyContent: 'flex-end'}}>
                    <Text style={styles.descriptionline}>{item.time}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.lastweektxt}>Last Month</Text>
          <FlatList
            data={lastmonth}
            renderItem={({item}) => {
              return (
                <View style={styles.lastweek1}>
                  <View style={styles.linkimg}>
                    <TouchableOpacity>
                      <Image
                        source={item.image}
                        style={styles.linkimgsize}></Image>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: '62%',
                      justifyContent: 'space-between',
                      marginLeft: 15,
                    }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.externallink}>{item.mb}</Text>
                  </View>
                  <View style={{justifyContent: 'flex-end'}}>
                    <Text style={styles.descriptionline}>{item.time}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View> */}

        <View style={{height: 50}}></View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingTop: 40,
  },
  header: {
    // backgroundColor: 'red',
    flex: 0.12,
    // paddingHorizontal:20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    borderColor: '#EAECF0',
    height: 100,
  },
  headertxt: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#19242C',
    paddingLeft: 15,
  },
  flatlistview: {
    height: 60,
    paddingLeft: 19,
    flex: 0.12,
  },
  categoryview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingRight: 12,
  },
  categorytxt: {
    color: '#19242C',
    backgroundColor: '#F8F8F8',
    padding: 13,
    borderRadius: 10,
    fontSize: 16,
    height: 48,
    fontFamily: 'Nunito-Medium',
  },
  recentview: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    // flex:0.22
  },
  recenttxt: {
    color: '#838FA0',
    paddingBottom: 15,
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
  },
  recent1: {
    // height: 107,
    // width: "",
    // justifyContent: 'space-around',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAECF0',
    flexDirection: 'row',
    padding: 10,
    // backgroundColor: 'green',
    marginBottom: 10,
    backgroundColor: '#F8F8F8',
  },
  externallink: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
  },
  title: {
    color: '#838FA0',
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
  },
  descriptionline: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
  },

  linkimgsize: {
    width: 52,
    height: 60,
    // alignSelf: 'center',
  },
  lastweektxt: {
    color: '#838FA0',
    paddingBottom: 15,
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
  },
  lastweek1: {
    width: 320,
    justifyContent: 'space-around',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAECF0',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 7,
  },
});
export default MediaDocument;
