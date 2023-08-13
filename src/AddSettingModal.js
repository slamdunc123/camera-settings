import React, { useState } from 'react';
import { DataStore, Storage } from 'aws-amplify';
import {
	Pressable,
	Text,
	TextInput,
	View,
	StyleSheet,
	Modal,
	ScrollView,
} from 'react-native';
import ImageUploader from './ImageUploader';
import * as ImagePicker from 'expo-image-picker';
import { Setting } from './models';

const AddSettingModal = ({ modalVisible, setModalVisible }) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [aperture, setAperture] = useState('');
	const [shutter, setShutter] = useState('');
	const [iso, setIso] = useState('');
	const [exposureBracketing, setExposureBracketing] = useState('');
	const [whiteBalance, setWhiteBalance] = useState('');
	const [lightMetering, setLightMetering] = useState('');
	const [image, setImage] = useState(null);

	async function createStoragePathToImageFile() {
		try {
			const response = await fetch(image.uri);
			const blob = await response.blob();
			// TODO: need to put image name into Storage not name
			await Storage.put(name, blob, {
				contentType: 'image/jpeg', // contentType is optional

				progressCallback(progress) {
					console.log(
						`Uploaded: ${progress.loaded}/${progress.total}`
					);
				},
			});
		} catch (err) {
			console.log('Error uploading file:', err);
		}
	}

	async function addSetting() {
		await DataStore.save(
			new Setting({
				name,
				description,
				aperture,
				shutter,
				iso,
				exposure_bracketing: exposureBracketing,
				white_balance: whiteBalance,
				light_metering: lightMetering,
				image: image.uri,
			})
		);

		if (!!image) createStoragePathToImageFile();
		setModalVisible(false);
		setName('');
		setDescription('');
		setAperture('');
		setShutter('');
		setIso('');
		setExposureBracketing('');
		setWhiteBalance('');
		setLightMetering('');
		setImage(null);
	}

	function closeModal() {
		setModalVisible(false);
	}

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

	return (
		<Modal
			animationType='fade'
			onRequestClose={closeModal}
			transparent
			visible={modalVisible}
		>
			<ScrollView>
				<View style={styles.modalContainer}>
					<View style={styles.modalInnerContainer}>
						<Pressable
							onPress={closeModal}
							style={styles.modalDismissButton}
						>
							<Text style={styles.modalDismissText}>X</Text>
						</Pressable>
						<TextInput
							onChangeText={setName}
							placeholder='Name'
							style={styles.modalInput}
						/>
						<TextInput
							onChangeText={setDescription}
							placeholder='Description'
							style={styles.modalInput}
						/>
						<TextInput
							onChangeText={setAperture}
							placeholder='Aperture'
							style={styles.modalInput}
						/>
						<TextInput
							onChangeText={setShutter}
							placeholder='Shutter'
							style={styles.modalInput}
						/>
						<TextInput
							onChangeText={setIso}
							placeholder='ISO'
							style={styles.modalInput}
						/>
						<TextInput
							onChangeText={setExposureBracketing}
							placeholder='Exposure Bracketing'
							style={styles.modalInput}
						/>
						<TextInput
							onChangeText={setWhiteBalance}
							placeholder='White Balance'
							style={styles.modalInput}
						/>
						<TextInput
							onChangeText={setLightMetering}
							placeholder='Light Metering'
							style={styles.modalInput}
						/>
						<ImageUploader
							handleChooseImage={handleChooseImage}
							image={image}
						/>

						<Pressable
							onPress={addSetting}
							style={styles.buttonContainer}
						>
							<Text style={styles.buttonText}>Save Setting</Text>
						</Pressable>
					</View>
				</View>
			</ScrollView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	buttonText: {
		color: '#fff',
		fontWeight: '600',
		padding: 16,
	},
	buttonContainer: {
		alignSelf: 'center',
		backgroundColor: '#4696ec',
		borderRadius: 99,
		paddingHorizontal: 8,
	},
	modalContainer: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		flex: 1,
		justifyContent: 'center',
		padding: 16,
	},
	modalInnerContainer: {
		backgroundColor: '#fff',
		borderRadius: 16,
		justifyContent: 'center',
		padding: 16,
	},
	modalInput: {
		borderBottomWidth: 1,
		marginBottom: 16,
		padding: 8,
	},
	modalDismissButton: {
		marginLeft: 'auto',
	},
	modalDismissText: {
		fontSize: 20,
		fontWeight: '700',
	},
});

export default AddSettingModal;
