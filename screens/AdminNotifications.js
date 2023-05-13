import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const AdminNotifications = () => {
  const notification = useSelector(
    (state) => state.notification.notificationArray
  );

  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    console.log("ITEMS", item);
    console.log("Donated By Name", item?.donatedBy?.name);
    console.log("DONATED TO NGO", item?.donatedToNgo?.title);
    console.log("DONATED Details", item?.donationDetails);
    let donationCount = 0;
    item?.donationDetails?.map((item) => {
      donationCount = donationCount + item?.donationValue;
    });
    console.log("Donated Items count", donationCount);

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AdminDonationDetails", { item });
        }}
      >
        {/* <Image source={{ uri: item.avatar }} style={styles.avatar} /> */}
        <Text>{`${item?.donatedBy?.name} donated ${donationCount} items to ${item?.donatedToNgo?.title}`}</Text>
      </TouchableOpacity>
    );
  };

  console.log("NOTIFICATION", notification);
  return (
    <View className="p-5">
      <Text className="text-xl font-extrabold">Notifications</Text>
      <FlatList
        data={notification}
        renderItem={renderItem}
        // keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default AdminNotifications;
