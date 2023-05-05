import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { addItemsToCart } from "../slices/cartCountSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";
import { getRestaurant } from "../slices/restaurantSlice";
import Icon from "react-native-vector-icons/FontAwesome5";

const CartScreen = () => {
  const items = useSelector(addItemsToCart);
  const restaurantname = useSelector(getRestaurant);
  console.log("restaurant name: " + restaurantname);
  const navigation = useNavigation();
  const groupedItems = {};
  const dataArray={};
  // const groupedItems2= {};
  items.forEach((item) => {if(groupedItems.hasOwnProperty(item.id)){
     groupedItems[item.id].push(item);
   
  }else{
    groupedItems[item.id] = [];
    groupedItems[item.id].push(item);

  }});
    console.log(groupedItems);

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="bg-gray-100 flex-1">
      <View className="flex-row bg-white p-5 border-b border-[#00CCBB] shadow-sm">
        <View className="flex-1">
          <Text className="text-lg font-bold text-center">Cart</Text>
          <Text className="text-center text-gray-400">{restaurantname.title}</Text>
        </View>
        <TouchableOpacity onPress={navigation.goBack} className="rounded-full bg-gray-100 absolute top-3 right-5">
          <XCircleIcon height={50} width={50} color="#00CCBB"/>
        </TouchableOpacity>
      </View>
      <View>

      <View className="flex-row my-5 bg-white p-2">
        <View className="flex-row flex-1 space-x-2 items-center">
        <Image source={{uri: "https://links.papareact.com/wru"}} className="h-8 w-8 rounded-full"/>
        <Text className="font-medium">Delivers in 40-45 minutes</Text>
        </View>
        <View className="items-center">
        <TouchableOpacity>
          <Text className="text-[#00ccbb] font-medium">Change</Text>
        </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItems).map(([key, items]) => (
            <View
              key={key}
              className="flex-row justify-between p-5 content-center mb-2 bg-white"
            >
              <View className="flex-row space-x-2 items-center">
                <Text className="text-[#00CCBB] mr-1">{items.length} X</Text>
                <Image
                  source={{ uri: items[0].imgUrl }}
                  className="h-10 w-10 rounded-full mr-2"
                />
                <Text className="text-md">{items[0].title}</Text>
              </View>
              <View className="flex-row space-x-2 items-center">
                <Text className="text-gray-400">
                  <View className="flex-row items-center">
                    <Text className="text-gray-400 mr-2">{items[0].price}</Text>
                    <Icon name="coins" className="text-gray-400" />
                  </View>
                </Text>
                <TouchableOpacity>
                  <Text className="text-[#00CCBB]">Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      </View>
      <ScrollView className="divide-y divide-gray-200">
      {Object.entries(groupedItems).map(([key, items])=>(
        <View key={key} className="flex-row justify-between p-5 content-center mb-2 bg-white">
        <View className="flex-row space-x-2 items-center">
        <Text className="text-[#00CCBB] mr-1">{items.length} X</Text>
        <Image source={{uri:items[0].imgUrl}} className="h-10 w-10 rounded-full mr-2"/>
        <Text className="text-md">{items[0].title}</Text>
        </View>
        <View className="flex-row space-x-2 items-center">
        <Text className="text-gray-400">
          <NumberFormat thousandSeparator={true} thousandsGroupStyle="lakh" prefix={'₹'} value={items[0].price} />
        </Text>
        <TouchableOpacity>
        <Text className="text-[#00CCBB]">Remove</Text>
        </TouchableOpacity>
        </View>
        </View>
       ))}
       </ScrollView>
       </View>

     <View className="bg-gray-100 border-t-1 border-gray-400 z-20">
        <View className="flex-row justify-between px-5 py-2">
          <Text className="text-gray-400">Reward points</Text>

          <View className="flex-row items-center">
            <Text className="text-gray-400">116.85</Text>
            <Icon name="coins" className="text-gray-400 ml-2" />
          </View>
        </View>
        <View className="flex-row justify-between px-5 py-2">
          <Text className="text-gray-400">Extra points</Text>
          <View className="flex-row items-center">
            <Text className="text-gray-400">5.99</Text>
            <Icon name="coins" className="text-gray-400 ml-2" />
          </View>
        </View>
        <View className="flex-row justify-between px-5 py-2">
          <Text>Total points</Text>
          <View className="flex-row items-center">
            <Text className="font-bold">122.84</Text>
            <Icon name="coins" className="text-gray-400 ml-2" />
          </View>
        </View>
        <TouchableOpacity className="bg-[#00CCBB] p-3 mx-4 rounded-md mb-3" onPress={() => navigation.navigate("PreparingOrder")}>
          <Text  className=" text-white text-center font-medium text-lg">Donate Now!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default CartScreen