import React from "react";
import { ImageBackground, View,StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

function SplashScreen({navigation}){





    return(
        <SafeAreaView>
            <View>
            <ImageBackground
                    source={require('../assets/splash2.jpg')}
                    resizeMode="cover"
                    style={styles.image}
                >

                    <TouchableOpacity style={{margin:"auto"}} onPress={()=> navigation.navigate("Login")}   >
                        <Text>
                            Go to Login
                        </Text>
                    </TouchableOpacity>


                </ImageBackground>
            
            </View>
          
      
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
  
    },
    image: {
    
        width:Dimensions.get('window').width * 1,
        height:Dimensions.get('window').height * 1
    },
  
});

export default SplashScreen;