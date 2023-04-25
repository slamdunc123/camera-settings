import React, { useState } from 'react';
import { DataStore, Storage } from 'aws-amplify';
import {
	Pressable,
	Text,
	TextInput,
	View,
	StyleSheet,
	Modal,
} from 'react-native';
import ImageUploader from './ImageUploader';
import * as ImagePicker from 'expo-image-picker';
import { Setting } from './models';

const AddSettingModal = ({ modalVisible, setModalVisible }) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);

	async function pathToImageFile() {
		try {
			const response = await fetch(image.uri);
			const blob = await response.blob();

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

	const formatImageUri = () => {
		const { uri } = image;

		const fileName = uri.substring(uri.lastIndexOf('/') + 1, uri.length);

		return fileName;
	};

	async function addSetting() {
		const fileName = image && formatImageUri();

		await DataStore.save(
			new Setting({
				name,
				description,
				isComplete: false,
				image: fileName,
			})
		);

		if (!!image) pathToImageFile();
		setModalVisible(false);
		setName('');
		setDescription('');
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