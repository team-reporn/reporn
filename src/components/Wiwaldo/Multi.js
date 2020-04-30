import React, { useState } from "react";
import Animated from "react-native-reanimated";
import { Text, View, Dimensions } from "react-native";

let Multi = ({
  onPress = () => null,
  numberOfTouches = 2,
  setFirstTapX,
  setFirstTapY,
  setSecondTapX,
  setSecondTapY,
  firstTapX,
  firstTapY,
  secondTapX,
  secondTapY,
  children,
}) => {
  let [scale, setScale] = useState(1);
  let [translateX, setTranslateX] = useState(0);
  let [origin, setOrigin] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  let varia = 0;
  let windowWidth = Dimensions.get("window").width;
  let windowHeight = Dimensions.get("window").height;
  let touchesCoordinateAdapter = ({ touches }) => {
    return touches.map((touch) => {
      return { x: touch.locationX, y: touch.locationY };
    });
  };

  let distanceDifference = ({ touches }) => {
    var distOrigin = Math.sqrt(
      Math.pow((origin[0].x - origin[1].x) / windowWidth, 2) +
        Math.pow((origin[0].y - origin[1].y) / windowHeight, 2)
    );
    var dist = Math.sqrt(
      Math.pow((touches[0].x - touches[1].x) / windowWidth, 2) +
        Math.pow((touches[0].y - touches[1].y) / windowHeight, 2)
    );
    return scale + dist - distOrigin;
  };

  onStartShouldSetResponder = (evt) => {
    if (evt.nativeEvent.touches) {
      let touches = touchesCoordinateAdapter({
        touches: evt.nativeEvent.touches,
      });
      if (touches.length === numberOfTouches) {
        setOrigin([
          { x: touches[0].x, y: touches[0].y },
          { x: touches[1].x, y: touches[1].y },
        ]);
        return true;
      }
    }

    return false;
  };

  onResponderMove = (evt) => {
    if (evt.nativeEvent.touches) {
      let touches = touchesCoordinateAdapter({
        touches: evt.nativeEvent.touches,
      });
      if (
        touches.length === numberOfTouches &&
        evt.nativeEvent.identifier === 1
      ) {
        setFirstTapX(touches[0].x);
        setFirstTapY(touches[0].y);
        setSecondTapX(touches[1].x);
        setSecondTapY(touches[1].y);

        setScale(
          distanceDifference({
            touches: touches,
          }) > 1
            ? distanceDifference({
                touches: touches,
              })
            : 1
        );

        let centre = {
          x: (touches[0].x + touches[1].x) / 2,
          y: (touches[0].y + touches[1].y) / 2,
        };
        let centreOrigin = {
          x: (origin[0].x + origin[1].x) / 2,
          y: (origin[0].y + origin[1].y) / 2,
        };
        console.log("x ", evt.nativeEvent.locationX);
        // console.log("trans ", translateX);
        setTranslateX(translateX + centre.x - centreOrigin.x);

        setOrigin(touches);
      }
    }
  };

  onResponderRelease = (evt) => {
    onPress();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f00",
      }}
      onStartShouldSetResponder={this.onStartShouldSetResponder}
      onResponderRelease={this.onResponderRelease}
      onResponderMove={this.onResponderMove}
      // onStartShouldSetResponderCapture={(evt) => true}
      // onMoveShouldSetResponderCapture={(evt) => true}
    >
      <Animated.View
        style={[
          { height: windowHeight / 3, backgroundColor: "#ff0" },
          { transform: [{ translateX }, { scale }] },
        ]}
      >
        <Text>tentative</Text>
        {/* {children} */}
      </Animated.View>
    </View>
  );
};

export default Multi;
