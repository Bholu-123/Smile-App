import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { getDonationItemById } from "../components/api/Auth";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as MailComposer from "expo-mail-composer";

const AdminDonationDetails = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [donationItems, setDonationItems] = useState([]);
  const [donationValue, setDonationValue] = useState({});

  useEffect(() => {
    async function fetchObjects() {
      const donatedItemArray = [];
      for (let i = 0; i < item?.donationDetails.length; i++) {
        let id = item?.donationDetails[i]?.donationId;
        const response = await getDonationItemById(id);
        donatedItemArray.push(response);
      }
      setDonationItems(donatedItemArray);
    }
    fetchObjects();
  }, []);

  const openGmail = async (email) => {
    const recipientEmail = email;
    const subject = "Thanks for your support";

    try {
      await MailComposer.composeAsync({
        recipients: [recipientEmail],
        subject: subject,
      });
    } catch (error) {
      console.error("Failed to open email composer:", error);
    }
  };

  const getQuantity = (id) => {
    console.log(id);
    const selectedEntry = item?.donationDetails?.find(
      (entry) => entry.donationId === id
    );
    if (!selectedEntry) {
      return null;
    }

    return selectedEntry?.donationValue;
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="bg-gray-100 flex-1">
        <View className="flex-row bg-white p-5 border-b border-[#00CCBB] shadow-sm">
          <View className="flex-1">
            <Text className="text-lg font-bold text-center">
              Donation Details
            </Text>
            <Text className="text-center text-gray-400">
              {item?.donatedToNgo?.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon height={50} width={50} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View>
          <View className="flex-row my-5 bg-white p-2">
            <View className="flex-row flex-1 space-x-2 items-center">
              <Image
                source={{ uri: "https://links.papareact.com/wru" }}
                className="h-8 w-8 rounded-full"
              />
              <Text className="font-medium">
                {`Donated by ${item?.donatedBy?.name}`}
              </Text>
            </View>
          </View>
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {donationItems.map((items, idx) => (
            <View
              key={idx}
              className="flex-row justify-between p-5 content-center mb-2 bg-white"
            >
              <View className="flex-row space-x-2 items-center">
                <Text className="text-[#00CCBB] mr-1">
                  {getQuantity(item?._id)}
                </Text>
                <Image
                  source={{ uri: items.urlToImage }}
                  className="h-10 w-10 rounded-full mr-2"
                />
                <Text className="text-md">{items.title}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View className="bg-white flex-row space-x-5 h-28 absolute bottom-0 w-full items-center">
        <Image
          source={{ uri: "https://links.papareact.com/wru" }}
          className="h-12 w-12 bg-gray-300 p=4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-xs">{item?.donatedBy?.email}</Text>
          <Text className="text-gray-400">Donor</Text>
        </View>
        <Text
          className="text-[#00CCBB] text-sm mr-5 font-bold"
          onPress={() => openGmail(item?.donatedBy?.email)}
        >
          Contact us
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default AdminDonationDetails;
