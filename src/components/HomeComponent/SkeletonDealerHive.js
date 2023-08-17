import React from 'react';
import {Text, StyleSheet, View, StatusBar, Image} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonDealerHive = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F8F8F8'}}>
      <View
        style={{
          backgroundColor: '#FFF',
          flex: 0.18,
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <SkeletonPlaceholder>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  marginRight: 15,
                }}
              />
              <View style={{}}>
                <Image style={{width: 103, height: 17}} />
                <Text style={{marginTop: 6, width: 127, height: 17}}>
                  Hello world
                </Text>
              </View>
            </View>
            <Image style={{width: 30, height: 30}} />
          </View>
        </SkeletonPlaceholder>
      </View>
      <View
        style={{flex: 0.1, justifyContent: 'center', paddingHorizontal: 20}}>
        <SkeletonPlaceholder borderRadius={4}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Image style={{width: 230, height: 40}} />
            <Text
              style={{
                fontSize: 14,
                lineHeight: 18,
                width: 70,
                height: 40,
                color: 'black',
              }}></Text>
          </View>
        </SkeletonPlaceholder>
      </View>
      <View style={{flex: 0.1, justifyContent: 'center', paddingLeft: 20}}>
        <SkeletonPlaceholder borderRadius={4}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Image style={{width: 80, height: 45, marginRight: 10}} />
            <Text style={{width: 80, height: 45, marginRight: 10}}></Text>
            <Text style={{width: 80, height: 45, marginRight: 10}}></Text>
            <Text style={{width: 80, height: 45}}></Text>
          </View>
        </SkeletonPlaceholder>
      </View>

      <View
        style={{flex: 0.1, justifyContent: 'center', paddingHorizontal: 20}}>
        <SkeletonPlaceholder>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: 109, height: 30}} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image style={{width: 30, height: 30}} />
              <Image style={{width: 30, height: 30, marginLeft: 10}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          flex: 0.35,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 155,
            backgroundColor: 'white',
            height: 259,
            paddingHorizontal: 10,
            borderRadius: 15,
          }}>
          <SkeletonPlaceholder>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 6,
              }}>
              <View>
                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 14,
                    lineHeight: 18,
                    color: '#D9D9D9',
                    width: 17,
                    height: 17,
                  }}></Text>
                <Text
                  style={{
                    marginTop: 4,
                    color: '#D9D9D9',
                    width: 17,
                    height: 11,
                  }}></Text>
              </View>
              <Image style={{width: 30, height: 30}} />
            </View>
            <View
              style={{
                alignItems: 'center',
                height: 100,
                justifyContent: 'center',
              }}>
              <Image style={{width: 30, height: 30}} />
              <Image
                style={{width: 80, height: 6, borderRadius: 80, marginTop: 20}}
              />
            </View>
            <View>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 18,
                  color: '#D9D9D9',
                  width: 138,
                  height: 18,
                }}></Text>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 18,
                  color: '#D9D9D9',
                  width: 65,
                  height: 18,
                }}></Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '34%',
                justifyContent: 'space-between',
                marginTop: 6,
              }}>
              <Image style={{width: 20, height: 20}} />
              <Image style={{width: 20, height: 20}} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 18,
                  color: '#D9D9D9',
                  width: 65,
                  height: 18,
                }}></Text>
              <View
                style={{
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                  borderTopRightRadius: 30,
                }}>
                <Image style={{width: 25, height: 25}} />
              </View>
            </View>
          </SkeletonPlaceholder>
        </View>
        <View
          style={{
            width: 155,
            backgroundColor: 'white',
            height: 259,
            paddingHorizontal: 10,
            borderRadius: 15,
          }}>
          <SkeletonPlaceholder>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 6,
              }}>
              <View>
                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 14,
                    lineHeight: 18,
                    color: '#D9D9D9',
                    width: 17,
                    height: 17,
                  }}></Text>
                <Text
                  style={{
                    marginTop: 4,
                    color: '#D9D9D9',
                    width: 17,
                    height: 11,
                  }}></Text>
              </View>
              <Image style={{width: 30, height: 30}} />
            </View>
            <View
              style={{
                alignItems: 'center',
                height: 100,
                justifyContent: 'center',
              }}>
              <Image style={{width: 30, height: 30}} />
              <Image
                style={{width: 80, height: 6, borderRadius: 80, marginTop: 20}}
              />
            </View>
            <View>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 18,
                  color: '#D9D9D9',
                  width: 138,
                  height: 18,
                }}></Text>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 18,
                  color: '#D9D9D9',
                  width: 65,
                  height: 18,
                }}></Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '34%',
                justifyContent: 'space-between',
                marginTop: 6,
              }}>
              <Image style={{width: 20, height: 20}} />
              <Image style={{width: 20, height: 20}} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 18,
                  color: '#D9D9D9',
                  width: 65,
                  height: 18,
                }}></Text>
              <View
                style={{
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                  borderTopRightRadius: 30,
                }}>
                <Image style={{width: 25, height: 25}} />
              </View>
            </View>
          </SkeletonPlaceholder>
        </View>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          flex: 0.2,
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            width: 155,
            backgroundColor: 'white',
            height: 259,
            borderRadius: 15,
          }}>
          <SkeletonPlaceholder>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 6,
                paddingHorizontal: 10,
              }}>
              <View>
                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 14,
                    lineHeight: 18,
                    color: '#D9D9D9',
                    width: 17,
                    height: 17,
                  }}></Text>
                <Text
                  style={{
                    marginTop: 4,
                    color: '#D9D9D9',
                    width: 17,
                    height: 11,
                  }}></Text>
              </View>
              <Image style={{width: 30, height: 30}} />
            </View>
            <View
              style={{
                alignItems: 'center',
                height: 100,
                justifyContent: 'center',
              }}>
              <Image style={{width: 30, height: 30}} />
              <Image
                style={{width: 80, height: 6, borderRadius: 80, marginTop: 20}}
              />
            </View>
            <View style={{paddingHorizontal: 10}}>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 18,
                  color: '#D9D9D9',
                  width: 138,
                  height: 18,
                }}></Text>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 18,
                  color: '#D9D9D9',
                  width: 65,
                  height: 18,
                }}></Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '44%',
                justifyContent: 'space-between',
                marginTop: 6,
                paddingHorizontal: 10,
              }}>
              <Image style={{width: 20, height: 20}} />
              <Image style={{width: 20, height: 20}} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 18,
                  color: '#D9D9D9',
                  width: 65,
                  height: 18,
                }}></Text>
              <View
                style={{
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                  borderTopRightRadius: 30,
                }}>
                <Image style={{width: 25, height: 25}} />
              </View>
            </View>
          </SkeletonPlaceholder>
        </View>

        <View
          style={{
            width: 155,
            backgroundColor: 'white',
            height: 259,
            borderRadius: 15,
          }}>
          <SkeletonPlaceholder>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 6,
                paddingHorizontal: 10,
              }}>
              <View>
                <Text
                  style={{
                    marginTop: 6,
                    fontSize: 14,
                    lineHeight: 18,
                    color: '#D9D9D9',
                    width: 17,
                    height: 17,
                  }}></Text>
                <Text
                  style={{
                    marginTop: 4,
                    color: '#D9D9D9',
                    width: 17,
                    height: 11,
                  }}></Text>
              </View>
              <Image style={{width: 30, height: 30}} />
            </View>
            <View
              style={{
                alignItems: 'center',
                height: 100,
                justifyContent: 'center',
              }}>
              <Image style={{width: 30, height: 30}} />
              <Image
                style={{width: 80, height: 6, borderRadius: 80, marginTop: 20}}
              />
            </View>
            <View style={{paddingHorizontal: 10}}>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 18,
                  color: '#D9D9D9',
                  width: 138,
                  height: 18,
                }}></Text>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 18,
                  color: '#D9D9D9',
                  width: 65,
                  height: 18,
                }}></Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '44%',
                justifyContent: 'space-between',
                marginTop: 6,
                paddingHorizontal: 10,
              }}>
              <Image style={{width: 20, height: 20}} />
              <Image style={{width: 20, height: 20}} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  lineHeight: 18,
                  color: '#D9D9D9',
                  width: 65,
                  height: 18,
                }}></Text>
              <View
                style={{
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                  borderTopRightRadius: 30,
                }}>
                <Image style={{width: 25, height: 25}} />
              </View>
            </View>
          </SkeletonPlaceholder>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    // marginTop: 20
  },
});
export default SkeletonDealerHive;
