import { CheckCircle } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const steps = ["Cart", "Shipping", "Payment", "Confirmation"];

export default function CheckoutFlowScreen() {
  const [step, setStep] = useState(0);
  const [cart, setCart] = useState([
    { id: "1", name: "Wireless Headphones", price: 120 },
    { id: "2", name: "Fitness Band", price: 60 },
    { id: "3", name: "Fitness club", price: 60 },
  ]);
  const [address, setAddress] = useState("");
  const [card, setCard] = useState("");
  const animation = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  //   console.log("step- ", step);
  //   if (step === 3) {
  //     Animated.timing(animation, {
  //       toValue: 1,
  //       duration: 600,
  //       useNativeDriver: true,
  //     }).start();
  //   } else {
  //     animation.setValue(0);
  //   }
  // }, [step]);

  const nextStep = () => {
    if (step === 0 && cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (step === 1 && address.trim() === "") {
      alert("Please enter a valid shipping address.");
      return;
    }

    if (step === 2 && card.replace(/\s/g, "").length < 16) {
      alert("Please enter a valid 16-digit card number.");
      return;
    }

    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <TouchableOpacity
                  onPress={() => setCart(cart.filter((i) => i.id !== item.id))}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        );
      case 1:
        return (
          <View>
            <Text style={styles.label}>Shipping Address</Text>
            <TextInput
              testID="address-input"
              style={styles.input}
              placeholder="123 Example St"
              value={address}
              onChangeText={setAddress}
            />
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.label}>Card Information</Text>
            <TextInput
              testID="card-input"
              style={styles.input}
              placeholder="XXXX XXXX XXXX XXXX"
              keyboardType="number-pad"
              value={card}
              onChangeText={(text) => {
                const masked =
                  text
                    .replace(/\D/g, "")
                    .match(/.{1,4}/g)
                    ?.join(" ") || "";
                setCard(masked);
              }}
            />
          </View>
        );
      case 3:
        return (
          <View style={styles.confirmation}>
            {/* <CheckCircle size={60} color="green" /> */}
            <Text style={styles.successText}>Payment Successful!</Text>
          </View>
        );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.stepper}>
        {steps.map((label, index) => (
          <View key={index} style={styles.step}>
            <Text
              style={[styles.stepText, index === step && styles.activeStepText]}
            >
              {label}
            </Text>
            <View
              style={[styles.stepDot, index === step && styles.activeDot]}
            />
          </View>
        ))}
      </View>

      <View style={styles.content}>{renderStep()}</View>

      {step < 3 && (
        <TouchableOpacity
          testID="next-button"
          style={styles.button}
          onPress={nextStep}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#F9FAFB",
  },
  stepper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  step: {
    alignItems: "center",
    flex: 1,
  },
  stepText: {
    fontSize: 12,
    color: "#A0AEC0",
  },
  activeStepText: {
    color: "#3182CE",
    fontWeight: "bold",
  },
  stepDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#CBD5E0",
    marginTop: 5,
  },
  activeDot: {
    backgroundColor: "#3182CE",
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemPrice: {
    color: "#4A5568",
    marginTop: 4,
  },
  removeText: {
    color: "#E53E3E",
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    color: "#4A5568",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E0",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3182CE",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 30,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  confirmation: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  successText: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "bold",
    color: "#38A169",
  },
});
