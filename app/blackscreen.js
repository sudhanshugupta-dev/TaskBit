// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { Alert, Button, Text, TextInput, View } from "react-native";

// export default function BlackScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const router = useRouter();
//   const validateEmail = (email: string) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = () => {
//     if (!email || !password) {
//       Alert.alert("Validation Error", "All fields are required.");
//       return;
//     }
//     if (!validateEmail(email)) {
//       Alert.alert("Validation Error", "Please enter a valid email address.");
//       return;
//     }
//     if (password.length < 6) {
//       Alert.alert(
//         "Validation Error",
//         "Password must be at least 6 characters."
//       );
//       return;
//     }

//     Alert.alert("Success", "Form submitted successfully.");
//     router.push("/checkoutscreen");
//   };

//   return (
//     <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
//       <Text testID="screen-title">blackscreen</Text>
//       <View style={{ width: "80%" }}>
//         <TextInput
//           testID="email-input"
//           value={email}
//           style={{
//             borderWidth: 1,
//             borderColor: "skyblue",
//             marginBottom: 20,
//             padding: 10,
//           }}
//           placeholder="enter your email"
//           onChangeText={setEmail}
//           autoCapitalize="none"
//           keyboardType="email-address"
//         />
//         <TextInput
//           testID="password-input"
//           value={password}
//           secureTextEntry
//           style={{
//             borderWidth: 1,
//             borderColor: "skyblue",
//             marginBottom: 20,
//             padding: 10,
//           }}
//           onChangeText={setPassword}
//           placeholder="Password"
//         />
//         <Button title="Submit" onPress={handleSubmit} testID="submit-button" />
//       </View>
//     </View>
//   );
// }

import React from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const BlackScreen = () => {
  const data = [
    { id: "0", title: "Item 1", color: "#FF6B6B" },
    { id: "1", title: "Item 2", color: "#4ECDC4" },
    { id: "2", title: "Item 3", color: "#45B7D1" },
    { id: "3", title: "Item 4", color: "#96CEB4" },
    { id: "4", title: "Item 5", color: "#FFEAA7" },
    { id: "5", title: "Item 6", color: "#DDA0DD" },
    { id: "6", title: "Item 7", color: "#98D8C8" },
  ];

  const renderItem = ({ item, index }) => (
    <View
      style={[styles.item, { backgroundColor: item.color }]}
      testID={`list-item-${index}`} // Important for Maestro testing
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );
  console.log("width", width);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horizontal List</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false} // Set to true if you want page-by-page scrolling
        decelerationRate="fast"
        // snapToInterval={width * 0.8} // Optional: snap to items
        snapToAlignment="center"
        contentContainerStyle={styles.flatListContent}
        testID="horizontal-flatlist" // Important for Maestro testing
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  flatListContent: {
    paddingHorizontal: 20,
    backgroundColor: "red",
    height: "30%",
  },
  item: {
    width: width * 0.8,
    height: 200,
    marginRight: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default BlackScreen;
