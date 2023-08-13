import React from 'react';
import {View, Image, Button, StyleSheet} from 'react-native';

const ImageUploader = ({handleChooseImage, image}) => {
  return (
    <View style={styles.imageView}>
      {image && <Image source={{uri: image.uri}} style={styles.image} />}
      <Button
        style={styles.imageBtn}
        title="Choose Image"
        onPress={handleChooseImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default ImageUploader;