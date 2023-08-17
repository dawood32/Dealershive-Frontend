import React, {useEffect} from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';

const CompletedCard = ({data}) => {
  let textcolor;
  useEffect(() => {
    console.log(data.completedtxt, 'kashif');
    textcolor = data.completedtxt;
  });
  return (
    <View
      style={{
        width: '100%',
        height: 200,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 5,
        borderColor:
          data.completedtxt == 'Received'
            ? '#E93131'
            : data.completedtxt == 'Completed'
            ? '#54B219'
            : data.completedtxt == 'Confirmed'
            ? '#246FDE'
            : '#EA8C00',
        shadowColor: 'gray',
        marginBottom: 15,
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '50%',
          alignItems: 'center',
          borderBottomWidth: 1,
          marginHorizontal: 10,
          borderColor: '#EAECF0',
        }}>
        <View style={{width: '20%'}}>
          <Image source={data.watch} style={{width: 50, height: 50}} />
        </View>

        <View style={{width: '57%'}}>
          <Text
            style={{fontSize: 16, fontFamily: 'Nunito-Bold', color: '#19242C'}}>
            {data.rolex}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Nunito-Meduim',
              color: '#19242C',
            }}>
            {data.year}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Nunito-Meduim',
              color: '#19242C',
            }}>
            {data.used}
          </Text>
        </View>

        <View style={{flexDirection: 'row', width: '23%'}}>
          <View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Nunito-Bold',
                  color: '#EA8C00',
                }}>
                {data.price}
              </Text>
            </View>
            <View style={{flexDirection: 'row', paddingTop: 5}}>
              <View style={{paddingRight: 5}}>
                <Image
                  style={{width: 20, height: 20}}
                  source={data.certificate}
                />
              </View>
              <View>
                <Image
                  style={{width: 20, height: 20}}
                  source={data.certificate2}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{height: '50%', paddingTop: 10}}>
        <View style={{paddingHorizontal: 10, paddingBottom: 5}}>
          <Text
            style={{fontSize: 14, fontFamily: 'Nunito-Bold', color: '#19242C'}}>
            {data.textinfor}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10,
          }}>
          <View style={{width: '20%'}}>
            <Image source={data.ractanglepic} style={{width: 50, height: 50}} />
          </View>

          <View style={{width: '57%'}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Nunito-Bold',
                color: '#19242C',
              }}>
              {data.manahil}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Nunito-Meduim',
                color: '#838FA0',
              }}>
              {data.numbber}
            </Text>
          </View>

          <View style={{flexDirection: 'row', width: '23%'}}>
            <View>
              <View style={{paddingLeft: 10}}>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Nunito-Bold',
                    color:
                      data.completedtxt == 'Received'
                        ? '#E93131'
                        : data.completedtxt == 'Completed'
                        ? '#54B219'
                        : data.completedtxt == 'Confirmed'
                        ? '#246FDE'
                        : '#EA8C00',
                  }}>
                  {data.completedtxt}
                </Text>
              </View>
              <View style={{flexDirection: 'row', paddingTop: 5}}>
                <View>
                  <Text>{data.date}</Text>
                </View>
                <View>
                  <Text>{data.date1}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CompletedCard;
