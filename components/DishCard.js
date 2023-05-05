import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemsToCart,
  addItemsToCartWithId,
  decrement,
  increment,
} from "../slices/cartCountSlice";
import Icon from "react-native-vector-icons/FontAwesome5";

const DishCard = ({ imgUrl, title, description, price, id }) => {
  const [isClicked, setIsCLicked] = useState(false);
  const dispatch = useDispatch();
  const itemList = useSelector((state) => addItemsToCartWithId(state, id));

  return (
    <>
      <TouchableOpacity
        className={`bg-white border p-4 border-gray-200 ${
          isClicked && "border-b-0"
        }`}
        onPress={() => setIsCLicked(!isClicked)}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{title}</Text>
            <Text className="text-gray-400">{description}</Text>
            <View className="flex-row items-center">
              <Text className="text-gray-400">5</Text>
              <Icon name="coins" className="text-gray-400 ml-2" />
            </View>
          </View>
          <View className="">
            <Image
              className="h-20 w-20 bg-gray-300"
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F4",
              }}
              source={{ uri: imgUrl }}
            ></Image>
          </View>
        </View>
      </TouchableOpacity>
      {isClicked && (
        <View className="flex-row mb-1 items-center space-x-2 bg-white px-4">
          <TouchableOpacity
            onPress={() => {
              dispatch(increment({ imgUrl, title, description, price, id }));
            }}
          >
            <PlusCircleIcon size={35} color="#00CCBB" />
          </TouchableOpacity>

          <Text>{itemList.length}</Text>

          <TouchableOpacity onPress={() => dispatch(decrement(id))}>
            <MinusCircleIcon size={35} color="#00CCBB" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DishCard;
