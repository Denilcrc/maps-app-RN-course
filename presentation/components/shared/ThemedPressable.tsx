import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface Props extends PressableProps {
  children: string;
}

const ThemedPressable = ({ children, ...props }: Props) => {
  return (
    <Pressable style={styles.btnPrimary} {...props}>
      <Text style={{ color: "white" }}>{children}</Text>
    </Pressable>
  );
};

export default ThemedPressable;

const styles = StyleSheet.create({
  btnPrimary: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    margin: 10,
  },
});
