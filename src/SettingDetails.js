//@ts-nocheck

import React, { useState, useEffect } from 'react';
import {
	Button,
	Image,
	StyleSheet,
	Text,
	TextInput,
	View,
	ScrollView,
} from 'react-native';
import { DataStore } from 'aws-amplify';
import { Setting } from './models';
import ImageUploader from './ImageUploader';
import * as ImagePicker from 'expo-image-picker';

const SettingDetails = ({ route, navigation }) => {
	const initialFormData = {
		name: '',
		description: '',
		aperture: '',
		shutter: '',
		iso: '',
		exposure_bracketing: '',
		white_balance: '',
		light_metering: '',
		image: '',
	};
	const { itemId } = route.params;
	const [formData, setFormData] = useState(initialFormData);
	const [image, setImage] = useState(null);

	const [currentSettingData, setCurrentSettingData] = useState(); // put the setting record  brought back from the api call for use in the update function
	const [isEditing, setIsEditing] = useState(false);

	const handleOnPressEdit = () => {
		setIsEditing(true);
	};
	const handleOnPressCancel = () => {
		setIsEditing(false);
		navigation.navigate('Home');
	};

	const handleChooseImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0]);
		}
	};

	const handleOnPressSubmit = async (formData, currentSettingData) => {
		try {
			await DataStore.save(
				Setting.copyOf(currentSettingData, (updated) => {
					updated.name = formData.name;
					updated.description = formData.description;
					updated.aperture = formData.aperture;
					updated.shutter = formData.shutter;
					updated.iso = formData.iso;
					updated.exposure_bracketing = formData.exposure_bracketing;
					updated.white_balance = formData.white_balance;
					updated.light_metering = formData.light_metering;
					image && (updated.image = image.uri);
				})
			);
			navigation.navigate('Home');
		} catch (error) {
			console.log(error.error);
		}
	};

	useEffect(() => {
		const fetchSetting = async () => {
			const settingData = await DataStore.query(Setting, itemId);
			setFormData(settingData);
			setCurrentSettingData(settingData);
		};
		fetchSetting();
	}, []);

	return (
		<>
			{!formData ? (
				<Text>No setting found</Text>
			) : (
				<ScrollView>
					<View style={styles.settingContainer}>
						{formData.image && (
							<Image
								source={{ uri: formData.image }}
								style={styles.settingImage}
							/>
						)}
						<Text style={styles.settingHeading}>
							{formData.name}
						</Text>
						<View style={styles.settingSettings}>
							{!isEditing ? (
								<>
									<Text>{formData.description}</Text>
									<View style={styles.settingText}>
										<Text>A: </Text>
										<Text>{formData.aperture}</Text>
									</View>
									<View style={styles.settingText}>
										<Text>S: </Text>
										<Text>{formData.shutter}</Text>
									</View>
									<View style={styles.settingText}>
										<Text>I: </Text>
										<Text>{formData.iso}</Text>
									</View>
									<View style={styles.settingText}>
										<Text>E: </Text>
										<Text>
											{formData.exposure_bracketing}
										</Text>
									</View>
									<View style={styles.settingText}>
										<Text>W: </Text>
										<Text>{formData.white_balance}</Text>
									</View>
									<View style={styles.settingText}>
										<Text>L: </Text>
										<Text>{formData.light_metering}</Text>
									</View>
									<View style={styles.buttonsContainer}>
										<Button
											title='Edit'
											color='blue'
											onPress={handleOnPressEdit}
										></Button>
									</View>
								</>
							) : (
								<>
									<View style={styles.settingInput}>
										<Text>N: </Text>
										<TextInput
											onChangeText={(text) =>
												setFormData({
													...formData,
													name: text,
												})
											}
											value={formData.name}
										/>
									</View>
									<View style={styles.settingInput}>
										<Text>D: </Text>
										<TextInput
											onChangeText={(text) =>
												setFormData({
													...formData,
													description: text,
												})
											}
											value={formData.description}
										/>
									</View>
									<View style={styles.settingInput}>
										<Text>A: </Text>
										<TextInput
											onChangeText={(text) =>
												setFormData({
													...formData,
													aperture: text,
												})
											}
											value={formData.aperture}
										/>
									</View>
									<View style={styles.settingInput}>
										<Text>S: </Text>
										<TextInput
											onChangeText={(text) =>
												setFormData({
													...formData,
													shutter: text,
												})
											}
											value={formData.shutter}
										/>
									</View>
									<View style={styles.settingInput}>
										<Text>I: </Text>
										<TextInput
											onChangeText={(text) =>
												setFormData({
													...formData,
													iso: text,
												})
											}
											value={formData.iso}
										/>
									</View>
									<View style={styles.settingInput}>
										<Text>E: </Text>
										<TextInput
											onChangeText={(text) =>
												setFormData({
													...formData,
													exposure_bracketing: text,
												})
											}
											value={formData.exposure_bracketing}
										/>
									</View>
									<View style={styles.settingInput}>
										<Text>W: </Text>
										<TextInput
											onChangeText={(text) =>
												setFormData({
													...formData,
													white_balance: text,
												})
											}
											value={formData.white_balance}
										/>
									</View>
									<View style={styles.settingInput}>
										<Text>L: </Text>
										<TextInput
											onChangeText={(text) =>
												setFormData({
													...formData,
													light_metering: text,
												})
											}
											value={formData.light_metering}
										/>
									</View>
									<View style={styles.imageContainer}>
										<ImageUploader
											handleChooseImage={
												handleChooseImage
											}
											image={image}
										/>
									</View>

									<View style={styles.buttonsContainer}>
										<Button
											title='Submit'
											color='blue'
											onPress={() =>
												handleOnPressSubmit(
													formData,
													currentSettingData
												)
											}
										></Button>
										<Button
											title='Cancel'
											color='blue'
											onPress={handleOnPressCancel}
										></Button>
									</View>
								</>
							)}
						</View>
					</View>
				</ScrollView>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	settingContainer: {
		alignSelf: 'center',
		width: '80%',
		height: '100vh',
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: '#fff',
		borderRadius: 2,
		elevation: 4,
		flexDirection: 'column',
		marginHorizontal: 8,
		marginVertical: 4,
		padding: 8,
		shadowOffset: {
			height: 1,
			width: 1,
		},
		shadowOpacity: 0.3,
		shadowRadius: 2,
	},
	settingHeading: {
		fontSize: 20,
		fontWeight: '600',
	},
	settingSettings: {
		flexDirection: 'column',
		width: '100%',
	},
	settingText: {
		flexDirection: 'row',
	},
	settingInput: {
		flexDirection: 'row',
		borderWidth: 0.5,
		marginBottom: 5,
	},
	settingImage: {
		width: 200,
		height: 200,
		backgroundColor: 'grey',
	},
	imageContainer: {
		alignItems: 'center',
	},
	buttonsContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default SettingDetails;
