import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../cartSlice";
import { useNavigation } from "@react-navigation/native";

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [productId]);

  useEffect(() => {
    const isInCart = cartItems.some((item) => item.id === productId);
    setIsInCart(isInCart);
  }, [cartItems, productId]);

  const handleToggleCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const navigateToCart = () => {
    navigation.navigate("Cart");
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Text style={styles.productPrice}>Price: ${product.price}</Text>
        <Text style={styles.productCategory}>Category: {product.category}</Text>
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={handleToggleCart}
            style={({ pressed }) => [
              styles.addButton,
              {
                backgroundColor: pressed ? "gray" : "black",
              },
            ]}
          >
            <Text
              style={[
                styles.addText,
                {
                  color: isInCart ? "red" : "#fff",
                },
              ]}
            >
              {isInCart ? "Remove" : "Add to Cart"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 16,
    color: "#555",
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#e44d26",
  },
  productCategory: {
    fontSize: 18,
    marginBottom: 16,
    color: "gray",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 4,
    width: "40%",
    elevation: 3,
    backgroundColor: "black",
  },
  addText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    color: "white",
  },
  removeButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 4,
    width: "40%",
    elevation: 3,
    backgroundColor: "#E31837",
  },
  removeText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    color: "white",
  },
});

export default ProductDetailScreen;
