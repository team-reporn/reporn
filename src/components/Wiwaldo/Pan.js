import React, { useRef, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Dimensions,
} from "react-native";

let touchesCoordinateAdapter = ({ touches }) => {
  return touches.map((touch) => {
    return { x: touch.locationX, y: touch.locationY };
  });
};

let distanceDifference = ({ currentScale, origin, touches }) => {
  var distOrigin = Math.sqrt(
    Math.pow((origin[0].x - origin[1].x) / Dimensions.get("window").width, 2) +
      Math.pow((origin[0].y - origin[1].y) / Dimensions.get("window").height, 2)
  );
  var dist = Math.sqrt(
    Math.pow(
      (touches[0].x - touches[1].x) / Dimensions.get("window").width,
      2
    ) +
      Math.pow(
        (touches[0].y - touches[1].y) / Dimensions.get("window").height,
        2
      )
  );
  console.log("difference ", dist - distOrigin);
  let result = currentScale + dist - distOrigin;
  return result > 1 ? result : 1;
};

const Pan = ({ children }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  let [scale, setScale] = useState(1);
  let [origin, setOrigin] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => {
        if (evt.nativeEvent.touches) {
          let touches = touchesCoordinateAdapter({
            touches: evt.nativeEvent.touches,
          });
          if (touches.length === 2) {
            console.log("passe par la ? ");
            setOrigin([
              { x: touches[0].x, y: touches[0].y },
              { x: touches[1].x, y: touches[1].y },
            ]);
          }
        }
      },
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log(scale);

        if (evt.nativeEvent.touches) {
          let touches = touchesCoordinateAdapter({
            touches: evt.nativeEvent.touches,
          });
          if (touches.length === 2) {
            setScale(
              distanceDifference({
                currentScale: scale,
                origin: origin,
                touches: touches,
              })
            );
            setOrigin(touches);
          }
          Animated.event([null, { dx: pan.x, dy: pan.y }])(evt, gestureState);
        }
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.titleText}>Drag this box!</Text>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }, { scale }],
        }}
      >
        <View style={styles.box} />
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});

export default Pan;
