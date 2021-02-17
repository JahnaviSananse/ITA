import { StyleSheet, Dimensions } from "react-native";
import * as COLOR from "../../constants/colors";

let width = Dimensions.get("screen").width;

export default styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  imgBackground: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    height: 200,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    width: width * 0.8,
    fontSize: 30,
    color: "#1D3444",
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
});
