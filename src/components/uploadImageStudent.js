import React, {useState} from 'react';
import {Button, Alert, ActivityIndicator, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ImageUploaderStudent = ({student}) => {
  const [uploading, setUploading] = useState(false);

  const updateImagePath = async imagePath => {
    const {image, ...rest} = student;
    console.log(
      JSON.stringify({
        ...rest,
        image: imagePath,
      }),
    );
    try {
      const response = await fetch(
        'https://jyssrmmas.pythonanywhere.com/api/UpdateImage/', // Trailing slash added here
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...rest,
            image: imagePath,
          }),
        },
      );

      // Check for HTTP status codes in the range 200-299, indicating success
      if (response.ok) {
        const data = await response.json();
        console.log('Image path updated successfully:', data);
      } else {
        // If the response status is not in the range 200-299, throw an error
        throw new Error(
          'Failed to update image path. Status: ' + response.status,
        );
      }
    } catch (error) {
      // Catch any errors that occur during the fetch operation
      console.error('Error updating image path:', error);
    }
  };

  const handleImageUpload = () => {
    launchImageLibrary({}, response => {
      if (!response.didCancel && !response.error) {
        const formData = new FormData();
        formData.append('uploadedFile', {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName || 'image.jpg',
        });
        formData.append('path', 'client/'); // Assuming 'client/' is the desired path on the server
        setUploading(true);

        fetch('https://jyssrmmas.pythonanywhere.com/api/saveImage/', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to upload image');
            }
            return response.json();
          })
          .then(async data => {
            await updateImagePath(data.path);
            setUploading(false);
            Alert.alert('Success', 'Image update successfully');
            console.log('Upload successful:', data.path);
          })
          .catch(error => {
            setUploading(false);
            Alert.alert('Error', error.message || 'Failed to upload image');
            console.error('Error uploading image:', error);
          });
      }
    });
  };

  return (
    <View style={{marginTop: 20}}>
      <Button
        title={uploading ? 'Uploading...' : 'mettre à jour la photo de profil'}
        onPress={handleImageUpload}
        disabled={uploading}
      />
      {uploading && <ActivityIndicator style={{marginTop: 10}} />}
    </View>
  );
};

export default ImageUploaderStudent;
