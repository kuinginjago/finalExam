import React, { useEffect } from "react";
import { Image, StatusBar, Text, View } from "react-native";
import Images from "../assets/Images";
import { useNavigation } from "@react-navigation/native";

function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    StatusBar.setBackgroundColor('#A0C8F3')
    StatusBar.setBarStyle('dark-content')

    setTimeout(() => {
      navigation.navigate('Home')
    }, 500);

  }, []);

  const navigateToHome = () => {
    // const navigation = useNavigation();
    // setTimeout(() => {
      navigation.navigate('Home')
    // }, 500);
  }

  return (
    <View style={{flex: 1, backgroundColor: '#A0C8F3', alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Indonesia Provinces</Text>
        <Image source={Images.INDO_MAPS} style={{width: 350, height: 150, marginTop: 25}} resizeMethod="resize" resizeMode="cover"/>
    </View>

  )
}

export default Splash;