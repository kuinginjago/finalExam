import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Images from '../assets/Images';
import { useNavigation } from '@react-navigation/native';

function Home() {
  const navigation = useNavigation();

  const [List, setList] = useState([]);
  const [ListSearch, setListSearch] = useState([]);
  const [Search, setSearch] = useState('');
  
  useEffect(() => {
    StatusBar.setBackgroundColor('white')
    StatusBar.setBarStyle('dark-content')
    getData()
  }, []);

  useEffect(() => {
    let arrayTemp = []
    arrayTemp = List.filter((val) => val?.nama?.includes(Search.toLocaleUpperCase()))
    setListSearch(arrayTemp)
  }, [Search]);

  const getData = () => {
    axios.get('https://ibnux.github.io/data-indonesia/provinsi.json')
    .then(res => {
      let sortRes = res?.data?.sort((a,b) => a?.nama?.toLocaleLowerCase().localeCompare(b?.nama?.toLocaleLowerCase()))
      setList(sortRes)
    })
  }

  const renderItemProvince = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => navigateToDetail(item)} style={index == 0 || index == 1? [styles.itemContainer, {marginTop: 20}] : styles.itemContainer}>
        <Image source={Images.ACEH} style={styles.imageContent} resizeMode='contain'/>
        <Text style={styles.textContent}>{item?.nama}</Text> 
      </TouchableOpacity>
    )
  }

  const renderEmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Image style={styles.emptyImage} source={Images.EMPTY}/>
    </View>
  );

  const navigateToDetail = (data) => {
    navigation.navigate('Details', {data})
  }
  
  return (
    <View style={styles.baseView}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={Search}
          placeholder="Cari Provinsi..."
        />
      </View>
      {List?.length > 0 && 
        <FlatList
          keyExtractor={(item) => item.id}
          style={styles.listContainer}
          data={Search != ''? ListSearch : List}
          numColumns={2}
          renderItem={renderItemProvince}
          ListEmptyComponent={renderEmptyListComponent}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  baseView: {
    flex: 1,
    backgroundColor: '#A0C8F3'
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  itemContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    paddingVertical: 50,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  imageContent: {
    width: 150, 
    height: 150
  },
  textContent: {
    textAlign: 'center',
    marginTop: 10
  },
  emptyContainer: {
    flex: 1,
    marginTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    height: 200,
    width: 200
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingLeft: 20
  },
  searchContainer: {
    backgroundColor: 'white', 
    padding: 10, 
    borderBottomLeftRadius: 15, 
    borderBottomRightRadius: 15
  }
});

export default Home;