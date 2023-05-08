import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import * as Progress from "react-native-progress";
import { useSelector } from "react-redux";
import { getRestaurant } from "../slices/restaurantSlice";
import { useNavigation } from "@react-navigation/native";

// import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const restName = useSelector(getRestaurant);
  const navigation = useNavigation();
  return (
    <View className="bg-[#00ccbb] flex-1">
      <View className="flex-row justify-between p-2">
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <XMarkIcon size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-white text-lg">Order Help</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white p-6 mx-5 my-2 rounded-md shadow-md z-50">
        <View className="flex-row">
          <View>
            <Text className="text-lg text-gray-400 mx-2 mt-2">
              Estimated Delivery
            </Text>
            <Text className="text-4xl font-semibold m-2">45-55 Minutes</Text>
          </View>
          <Image
            source={{ uri: "https://links.papareact.com/fls" }}
            className="h-20 w-20"
          />
        </View>
        <Progress.Bar size={30} indeterminate={true} color="#00ccbb" />
        <Text className="text-xs m-2">
          your order at {restName.title} is being prepared
        </Text>
      </View>

      {/* <MapView
        initialRegion={{
          latitude: restName.lat,
          longitude: restName.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restName.lat,
            longitude: restName.long,
          }}
          title={restName.title}
          description={restName.short_description}
          identifier="origin"
          pinColor="#00ccbb"
        />
      </MapView> */}

      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-12 w-12 bg-gray-300 p=4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg"> Abhishek Kumar</Text>
          <Text className="text-gray-400">Your rider</Text>
        </View>
        <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
