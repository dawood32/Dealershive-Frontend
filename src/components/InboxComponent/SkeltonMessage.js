import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonMessage = () => {
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flex: 0.16,
          justifyContent: 'center',
          marginHorizontal: 20,
          borderBottomWidth: 1,
          borderColor: 'lightgray',
        }}>
        <SkeletonPlaceholder>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{width: 24, height: 24, marginRight: 15}} />
              <View>
                <Text style={{width: 118, height: 20}}></Text>
              </View>
            </View>
            <Image style={{width: 24, height: 24}} />
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

      <View
        style={{flex: 0.1, justifyContent: 'center', paddingHorizontal: 20}}>
        <SkeletonPlaceholder>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  marginRight: 10,
                  borderRadius: 50,
                }}
              />
              <View>
                <Text style={{width: 110, height: 21}}></Text>
                <Text style={{width: 170, height: 21, marginTop: 6}}></Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image style={{width: 20, height: 21}} />
              <Image style={{width: 44, height: 21, marginTop: 6}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
      <View
        style={{flex: 0.1, justifyContent: 'center', paddingHorizontal: 20}}>
        <SkeletonPlaceholder>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  marginRight: 10,
                  borderRadius: 50,
                }}
              />
              <View>
                <Text style={{width: 95, height: 21}}></Text>
                <Text style={{width: 170, height: 21, marginTop: 6}}></Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image style={{width: 20, height: 21}} />
              <Image style={{width: 44, height: 21, marginTop: 6}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
      <View
        style={{flex: 0.1, justifyContent: 'center', paddingHorizontal: 20}}>
        <SkeletonPlaceholder>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  marginRight: 10,
                  borderRadius: 50,
                }}
              />
              <View>
                <Text style={{width: 109, height: 21}}></Text>
                <Text style={{width: 170, height: 21, marginTop: 6}}></Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image style={{width: 20, height: 21}} />
              <Image style={{width: 44, height: 21, marginTop: 6}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
      <View
        style={{flex: 0.1, justifyContent: 'center', paddingHorizontal: 20}}>
        <SkeletonPlaceholder>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  marginRight: 10,
                  borderRadius: 50,
                }}
              />
              <View>
                <Text style={{width: 109, height: 21}}></Text>
                <Text style={{width: 170, height: 21, marginTop: 6}}></Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image style={{width: 0, height: 21}} />
              <Image style={{width: 44, height: 21, marginTop: 6}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
      <View
        style={{flex: 0.1, justifyContent: 'center', paddingHorizontal: 20}}>
        <SkeletonPlaceholder>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  marginRight: 10,
                  borderRadius: 50,
                }}
              />
              <View>
                <Text style={{width: 109, height: 21}}></Text>
                <Text style={{width: 170, height: 21, marginTop: 6}}></Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image style={{width: 0, height: 21}} />
              <Image style={{width: 44, height: 21, marginTop: 6}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
      <View
        style={{flex: 0.1, justifyContent: 'center', paddingHorizontal: 20}}>
        <SkeletonPlaceholder>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  marginRight: 10,
                  borderRadius: 50,
                }}
              />
              <View>
                <Text style={{width: 75, height: 21}}></Text>
                <Text style={{width: 170, height: 21, marginTop: 6}}></Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image style={{width: 0, height: 21}} />
              <Image style={{width: 44, height: 21, marginTop: 6}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
      <View
        style={{flex: 0.1, justifyContent: 'center', paddingHorizontal: 20}}>
        <SkeletonPlaceholder>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  marginRight: 10,
                  borderRadius: 50,
                }}
              />
              <View>
                <Text style={{width: 109, height: 21}}></Text>
                <Text style={{width: 170, height: 21, marginTop: 6}}></Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image style={{width: 0, height: 21}} />
              <Image style={{width: 44, height: 21, marginTop: 6}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
      <View
        style={{flex: 0.1, justifyContent: 'center', paddingHorizontal: 20}}>
        <SkeletonPlaceholder>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  marginRight: 10,
                  borderRadius: 50,
                }}
              />
              <View>
                <Text style={{width: 109, height: 21}}></Text>
                <Text style={{width: 170, height: 21, marginTop: 6}}></Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Image style={{width: 0, height: 21}} />
              <Image style={{width: 44, height: 21, marginTop: 6}} />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    // marginTop: 20,
    // paddingHorizontal:20
  },
});
export default SkeletonMessage;
