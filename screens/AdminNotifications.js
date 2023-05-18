import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getNotification } from "../components/api/Auth";
import { setNotificationData } from "../slices/Actions/notificationActions";
import { useDispatch } from "react-redux";

const AdminNotifications = () => {
  const navigation = useNavigation();
  const notification = useSelector(
    (state) => state.notification.notificationArray
  );
  const [isClicked, setIsCLicked] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleRefresh = () => {
    setRefreshing(true);
    getNotification(user?._id)
      .then((res) => {
        console.log("RESPONSE", res);
        setNotificationData(res, dispatch);
        setRefreshing(false);
      })
      .catch((err) => {
        console.log("Error in fetching messages", err);
        setRefreshing(false);
      });
  };

  return (
    <ScrollView
      className="p-5"
      refreshControl={<RefreshControl onRefresh={handleRefresh} />}
    >
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 24, marginVertical: 16 }}>ITEMS</Text>
        {notification?.map((item) => {
          let donationCount = item?.donationDetails?.length;
          console.log("DONATION", donationCount);
          return (
            <View
              style={{
                backgroundColor: "#FFFFFF",
                marginVertical: 8,
                borderRadius: 8,
                elevation: 2,
              }}
              key={item?.donationId}
            >
              <TouchableOpacity
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderBottomWidth: isClicked ? 0 : 1,
                  borderColor: "#00CCBB",
                  borderRadius: 8,
                }}
              >
                <Text>
                  {item?.donatedBy?.name} donated {donationCount} items to{" "}
                  {item?.donatedToNgo?.title}
                </Text>
              </TouchableOpacity>
              {isClicked && (
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 4,
                    alignItems: "center",
                    paddingHorizontal: 16,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#00CCBB",
                      padding: 8,
                      borderRadius: 4,
                    }}
                    onPress={() => {
                      navigation.navigate("AdminDonationDetails", { item });
                    }}
                  >
                    <Text style={{ color: "#FFFFFF" }}>Show details</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default AdminNotifications;
