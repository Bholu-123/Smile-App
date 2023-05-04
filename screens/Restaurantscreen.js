import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ArrowLeftCircleIcon,
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import DishCard from "../components/DishCard";
import CartSticker from "../components/CartSticker";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart } from "../slices/cartCountSlice";
import { setRestaurant } from "../slices/restaurantSlice";

export default function Restaurantscreen() {
  //  const route = useRoute();
  //  const title = route.params.title;
  const dispatch = useDispatch();
  const Navigation = useNavigation();
  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      lat,
      long,
      dishes,
      short_description,
      address,
      genre,
    },
  } = useRoute();

  useLayoutEffect(() => {
    Navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const totalItem = useSelector(addItemsToCart);
  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        lat,
        long,
        dishes,
        short_description,
        address,
        genre,
      })
    );
  }, [dispatch]);
  return (
    <>
      <ScrollView>
        <View className="relative">
          <Image
            className="h-52 w-full bg-gray-300 p-4"
            source={{ uri: imgUrl }}
          />
          <TouchableOpacity
            className="absolute top-8 left-2 bg-gray-100 rounded-full"
            onPress={() => {
              Navigation.goBack();
            }}
          >
            <ArrowLeftCircleIcon color="#00CCBB" size={42} />
          </TouchableOpacity>
        </View>

        <View className="bg-white p-4">
          <Text className="font-bold text-3xl">{title}</Text>

          <View className="flex-row space-x-1 my-1">
            <View className="flex-row items-center space-x-1 ">
              <StarIcon color="green" size={22} opacity={0.5} fill="green" />
              <Text className="text-xs text-green-500">{rating}</Text>
              <Text className="text-xs text-gray-500"> . {genre}</Text>
            </View>

            <View className="flex-row items-center space-x-1">
              <MapPinIcon color="gray" size={22} opacity={0.4} fill="gray" />
              <Text className="text-xs text-gray-500">Nearby . {address}</Text>
            </View>
          </View>

          <View className="pt-2">
            <Text>{short_description}</Text>
          </View>
        </View>

        <View className="flex-row justify-between m-2 bg-white p-2">
          <View className="flex-row">
            <TouchableOpacity>
              <QuestionMarkCircleIcon size={20} color="green" />
            </TouchableOpacity>
            <Text className="font-semibold text-md ml-3">
              want to know more about this NGO?
            </Text>
          </View>

          <View>
            <TouchableOpacity>
              <ChevronRightIcon size={20} color="green" />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text className="font-extrabold text-3xl m-2">Menu</Text>
          <DishCard
            imgUrl="https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1527&q=80"
            title="Clothes"
            description="Donate this iteam and put a smile on a lot of innocent faces"
            price={5}
            id={2}
          />
          <DishCard
            imgUrl="https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            title="Food"
            description="Donate this iteam and put a smile on a lot of innocent faces"
            price={5}
            id={5}
          />
          <DishCard
            imgUrl="https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            title="Books"
            description="Donate this iteam and put a smile on a lot of innocent faces"
            price={5}
            id={9}
          />
          <DishCard
            imgUrl="https://media.istockphoto.com/id/1279811066/photo/folded-grey-and-white-checkered-blanked-on-an-isolated-white-background.jpg?s=1024x1024&w=is&k=20&c=sN3BJw5eUbDe6tAWGOPdJwSnc6CG3TlND3i7RJDktw8="
            title="Blanket"
            description="Donate this iteam and put a smile on a lot of innocent faces"
            price={5}
            id={76}
          />
          <DishCard
            imgUrl="https://media.istockphoto.com/id/1058036480/photo/flat-lay-with-comfort-warm-outfit-for-cold-weather-comfortable-autumn-winter-clothes-shopping.jpg?s=612x612&w=is&k=20&c=yfvYNtF6fNWu8TARPFumDzJJPSuHDXacoGefhvDGZ2c="
            title="Winter Wear"
            description="Donate this iteam and put a smile on a lot of innocent faces"
            price={5}
            id={21}
          />
          <DishCard
            imgUrl="https://media.istockphoto.com/id/1178191504/vector/period-products-set.jpg?s=612x612&w=is&k=20&c=ibmpG7eGyVglaNTJT-wK39nJUWfFHQPgPL9SW-J69Uk="
            title="Sanitary Pads"
            description="Donate this iteam and put a smile on a lot of innocent faces"
            price={5}
            id={98}
          />
          <DishCard
            imgUrl="https://media.istockphoto.com/id/589415708/photo/fresh-fruits-and-vegetables.jpg?s=612x612&w=is&k=20&c=0KUXg_vETkKHFrjtTWrY8EbFW-KVkwjrmAnS43ljqHA="
            title="Raw Vegetables"
            description="Donate this iteam and put a smile on a lot of innocent faces"
            price={5}
            id={24}
          />
        </View>
      </ScrollView>
      {totalItem.length > 0 && <CartSticker />}
    </>
  );
}
