import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, removeFromCart } from "../cartSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CartScreen = () => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
      {cart.items.length > 0 ? (
        cart.items.map((item) => (
          <View style={styles.card} key={item.id}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardDetails}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardPrice}>Price: ${item.price}</Text>
              <Pressable
                style={styles.removeButton}
                onPress={() => handleRemoveFromCart(item.id)}
              >
                <MaterialCommunityIcons name="minus" size={24} color="white" />
              </Pressable>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image
            source={require("../assets/images/cart.png")}
            style={{ width: 150, height: 150 }}
          />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      )}
      {cart.items.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Price:</Text>
          <Text style={styles.totalPrice}>${getTotalPrice()}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardPrice: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  removeButton: {
    alignItems: "center",
    justifyContent: "center",
    // paddingVertical: 1,
    borderRadius: 4,
    width: "12%",
    elevation: 3,
    backgroundColor: "#E31837",
    marginTop: 5,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 24,
    color: "#555",
  },
  totalContainer: {
    marginTop: 16,
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  totalPrice: {
    fontSize: 20,
    color: "green",
    fontWeight: "bold",
  },
});

export default CartScreen;
