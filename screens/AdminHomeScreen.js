import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { addNgo, getAllCategories } from "../components/api/Auth";
import Icon from "react-native-vector-icons/AntDesign";
import { scale } from "react-native-size-matters";
import { useSelector } from "react-redux";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().max(250, "Content cannot exceed 250 characters"),
});

const AdminHomeScreen = () => {
  const [image, setImage] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const initialValues = {
    title: "",
    content: "",
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [catergory, setCategory] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const onDropdownOpen = useCallback(() => {
    //   setCompanyOpen(false);
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result?.canceled) {
      setImage(result?.assets?.[0]?.uri);
    }
  };
  true;

  useEffect(() => {
    getAllCategories()
      .then((res) => {
        let categoriesArray = [];
        let categories = res;
        categories.map((cat) => {
          let obj = {
            id: cat?._id,
            name: cat.category_name,
          };
          categoriesArray.push(obj);
        });
        setCategory(categoriesArray);
      })
      .catch((err) => {
        console.log("Error in fetching category", err);
      });
  }, []);

  return (
    <View className="m-4 mt-10 flex justify-center">
      <Text className="text-3xl font-bold">Welcome</Text>
      <Text className="text-base font-normal text-gray-600 mb-2">
        You can register your Ngo from here
      </Text>
      <View className="mt-10">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            setShowSpinner(true);
            let obj = {
              title: values?.title,
              content: values?.content,
              categoryId: dropdownValue,
              userId: user?._id,
              imageUrl: image,
            };
            addNgo(obj)
              .then((res) => {
                console.log("+++++RESSS", res);
                setShowSpinner(false);
                setDropdownValue("");
                setImage(null);
                resetForm({ values: initialValues });
              })
              .catch((err) => {
                console.log("++++ERRORT IN ADDING NGO", err);
                setShowSpinner(false);
              });
          }}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleSubmit, values, errors, touched }) => (
            <View>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("title")}
                value={values.title}
              />
              {errors.title && touched.title && (
                <Text style={styles.error}>{errors.title}</Text>
              )}

              <Text style={styles.label}>Content</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("content")}
                value={values.content}
                multiline={true}
              />
              {errors.content && touched.content && (
                <Text style={styles.error}>{errors.content}</Text>
              )}

              <Text style={styles.label}>Option</Text>

              <DropDownPicker
                style={styles.dropdown}
                open={dropdownOpen}
                value={dropdownValue} //genderValue
                items={catergory.map((cat) => ({
                  label: cat.name,
                  value: cat.id,
                }))}
                setOpen={setDropdownOpen}
                setValue={setDropdownValue}
                setItems={setCategory}
                placeholder="Select Category"
                placeholderStyle={styles.placeholderStyles}
                onOpen={onDropdownOpen}
                zIndex={9999}
              />

              {image ? (
                <View className="w-full h-40 border-2 border-solid border-gray-400 mb-2 relative p-6 rounded">
                  <Icon
                    name="close"
                    className="absolute top-0 text-2xl right-0"
                    onPress={() => {
                      setImage(null);
                    }}
                  />
                  <Image
                    source={{ uri: image }}
                    className="w-full h-full object-cover"
                  />
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={pickImage}
                    style={{
                      backgroundColor: "#182952",
                      height: scale(50),
                      borderRadius: scale(10),
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ color: "#fff", marginLeft: scale(5) }}>
                      Select Image
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    backgroundColor: "#182952",
                    height: scale(50),
                    borderRadius: scale(10),
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "#fff", marginLeft: scale(5) }}>
                    Submit
                  </Text>
                  {showSpinner && <ActivityIndicator color={"#fff"} />}
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },

  dropdown: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    backgroundColor: "none",
  },

  error: {
    fontSize: 14,
    color: "red",
    marginBottom: 5,
  },
  image: {
    fontSize: 14,
    marginTop: 10,
  },
});
export default AdminHomeScreen;
