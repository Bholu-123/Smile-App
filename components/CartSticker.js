import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { addItemsToCart, cartItemPrice } from "../slices/cartCountSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";
import Icon from "react-native-vector-icons/FontAwesome5";

const CartSticker = () => {
  const count = useSelector(addItemsToCart);
  const sumTotal = useSelector(cartItemPrice);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="absolute bottom-10 w-full bg-[#00CCBB] z-50 p-4 rounded-lg"
      onPress={() => navigation.navigate("Cart")}
    >
      <View className="flex-row items-center space-x-1">
        <Text className="font-extrabold text-white text-lg bg-[#097b71] px-2 py-2">
          {count.length}
        </Text>

        <Text className="font-extrabold text-white text-lg flex-1 text-center">
          View Details
        </Text>

        <View className="flex-row items-center">
          <Text className="font-extrabold text-white text-lg">{sumTotal}</Text>
          <Icon
            name="coins"
            className="font-extrabold text-white text-lg ml-2"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartSticker;
