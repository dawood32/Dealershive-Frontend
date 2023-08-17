import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {categoryapi} from '../../redux/action/appcall';

const Categories = () => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(0);
  useEffect(() => {
    apicall();
  }, []);

  const handleChangeindex = index => {
    setSelectedItem(index);
  };

  const apicall = () => {
    dispatch(categoryapi());
  };
  const category = useSelector(
    state => state.CategoryReducer?.data?.categories,
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={category}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View style={styles.categoryview}>
              <TouchableOpacity
                onPress={() => handleChangeindex(index)}
                style={{
                  backgroundColor:
                    selectedItem === index ? '#EA8C00' : '#F8F8F8',
                  borderRadius: 10,
                  marginRight: 12,
                }}>
                <Text
                  style={[
                    styles.categorytxt,
                    {
                      color: selectedItem === index ? '#FFF' : '#19242C',
                    },
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 100,
    paddingHorizontal: 20,
  },
  categoryview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categorytxt: {
    padding: 13,

    fontSize: 16,
    fontFamily: 'Nunito-Medium',
  },
});

export default Categories;
