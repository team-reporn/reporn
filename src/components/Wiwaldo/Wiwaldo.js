import React, { useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Animated from "react-native-reanimated";
import Multi from "./Multi";
import Pan from "./Pan";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00f",
  },
  box: {
    height: "100%",
    width: "100%",
    borderRadius: 5,
    position: "relative",
  },
  images: {
    width: 100,
    height: 100,
    position: "absolute",
  },
  backgroundImage: {
    // height: "100%",
    // width: "100%",
    // position: "absolute",
    resizeMode: "cover",
    justifyContent: "center",
  },
});
let images = [
  require("./assets/Concombre.png"),
  require("./assets/1.png"),
  require("./assets/2.png"),
  require("./assets/3.png"),
  require("./assets/4.png"),
  require("./assets/5.png"),
  require("./assets/6.png"),
  require("./assets/7.png"),
  require("./assets/8.png"),
  require("./assets/9.png"),
  require("./assets/10.png"),
  require("./assets/11.png"),
  require("./assets/12.png"),
  require("./assets/13.png"),
  require("./assets/14.png"),
  require("./assets/15.png"),
  require("./assets/16.png"),
  require("./assets/17.png"),
  require("./assets/18.png"),
  require("./assets/19.png"),
  require("./assets/20.png"),
  require("./assets/21.png"),
  require("./assets/22.png"),
  require("./assets/23.png"),
  require("./assets/24.png"),
  require("./assets/25.png"),
  require("./assets/26.png"),
  require("./assets/27.png"),
  require("./assets/28.png"),
  require("./assets/29.png"),
  require("./assets/30.png"),
  require("./assets/31.png"),
  require("./assets/32.png"),
  require("./assets/33.png"),
  require("./assets/34.png"),
  require("./assets/35.png"),
  require("./assets/36.png"),
  require("./assets/37.png"),
  require("./assets/38.png"),
  require("./assets/39.png"),
  require("./assets/40.png"),
  require("./assets/41.png"),
  require("./assets/42.png"),
  require("./assets/43.png"),
  require("./assets/44.png"),
  require("./assets/45.png"),
  require("./assets/46.png"),
  require("./assets/47.png"),
  require("./assets/48.png"),
  require("./assets/49.png"),
  require("./assets/50.png"),
  require("./assets/51.png"),
  require("./assets/52.png"),
];

let styleImg = images.map((img, index) => {
  let scaleimg = Math.random() * 0.5;
  let rotateimg = Math.random() * 100;
  let left = -15 + Math.random() * 150;
  let top = -100 + Math.random() * 300;
  return {
    width: 100,
    height: 100,
    position: "absolute",
    left: left || 0,
    top: top || 0,
    transform: [{ scale: scaleimg || 1 }, { rotate: "" + rotateimg + "deg" }],
  };
});

const Wiwaldo = () => {
  let [firstTapX, setFirstTapX] = useState(0);
  let [firstTapY, setFirstTapY] = useState(0);
  let [secondTapX, setSecondTapX] = useState(0);
  let [secondTapY, setSecondTapY] = useState(0);
  let images = [
    require("./assets/Concombre.png"),
    require("./assets/1.png"),
    require("./assets/2.png"),
    require("./assets/3.png"),
    require("./assets/4.png"),
    require("./assets/5.png"),
    require("./assets/6.png"),
    require("./assets/7.png"),
    require("./assets/8.png"),
    require("./assets/9.png"),
    require("./assets/10.png"),
    require("./assets/11.png"),
    require("./assets/12.png"),
    require("./assets/13.png"),
    require("./assets/14.png"),
    require("./assets/15.png"),
    require("./assets/16.png"),
    require("./assets/17.png"),
    require("./assets/18.png"),
    require("./assets/19.png"),
    require("./assets/20.png"),
    require("./assets/21.png"),
    require("./assets/22.png"),
    require("./assets/23.png"),
    require("./assets/24.png"),
    require("./assets/25.png"),
    require("./assets/26.png"),
    require("./assets/27.png"),
    require("./assets/28.png"),
    require("./assets/29.png"),
    require("./assets/30.png"),
    require("./assets/31.png"),
    require("./assets/32.png"),
    require("./assets/33.png"),
    require("./assets/34.png"),
    require("./assets/35.png"),
    require("./assets/36.png"),
    require("./assets/37.png"),
    require("./assets/38.png"),
    require("./assets/39.png"),
    require("./assets/40.png"),
    require("./assets/41.png"),
    require("./assets/42.png"),
    require("./assets/43.png"),
    require("./assets/44.png"),
    require("./assets/45.png"),
    require("./assets/46.png"),
    require("./assets/47.png"),
    require("./assets/48.png"),
    require("./assets/49.png"),
    require("./assets/50.png"),
    require("./assets/51.png"),
    require("./assets/52.png"),
  ];

  let WaldoImage = (image, zIndex) => {
    return (
      <View style={[styleImg[index], { zIndex: 100 / (index + 1) }]}>
        <Animated.Image key={index} source={image} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Multi
        onPress={() => {}}
        setFirstTapX={setFirstTapX}
        setFirstTapY={setFirstTapY}
        setSecondTapX={setSecondTapX}
        setSecondTapY={setSecondTapY}
        firstTapX={firstTapX}
        firstTapY={firstTapY}
        secondTapX={secondTapX}
        secondTapY={secondTapY}
      >
        <ImageBackground
          style={styles.backgroundImage}
          source={require("./backgroundWiwaldo.jpg")}
        >
           <TouchableHighlight onPress={() => alert("box tapped!")}>
          <View>
            <Text>nani {firstTapX}</Text>
            {images.map((image, index) => {
                  return (
                    <Animated.View
                      key={index}
                      style={[styleImg[index], { zIndex: 100 / (index + 1) }]}
                    >
                      <Animated.Image source={image} />
                    </Animated.View>
                  );
                })}
          </View>
          </TouchableHighlight>
        </ImageBackground>
      </Multi> */}
      <Pan>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("./backgroundWiwaldo.jpg")}
        >
          <TouchableHighlight onPress={() => alert("box tapped!")}>
            <View>
              <Text>nani {firstTapX}</Text>
              {images.map((image, index) => {
                return (
                  <Animated.View
                    key={index}
                    style={[styleImg[index], { zIndex: 100 / (index + 1) }]}
                  >
                    <Animated.Image source={image} />
                  </Animated.View>
                );
              })}
            </View>
          </TouchableHighlight>
        </ImageBackground>
      </Pan>
    </View>
  );
};

export default Wiwaldo;
