import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { DataStore } from 'aws-amplify';
import { Setting } from './models';

const SettingDetails = ({ route }) => {
	const { itemId } = route.params;
	const [setting, setSetting] = useState('');

	useEffect(() => {
		const fetchSetting = async () => {
			const _setting = await DataStore.query(Setting, itemId);
			setSetting(_setting);
		};
		fetchSetting();
	}, []);

	return (
		<View style={styles.settingContainer}>
			{setting.image && (
				<Image
					source={{ uri: setting.image }}
					style={styles.settingImage}
				/>
			)}
			<Text style={styles.settingHeading}>{setting.name}</Text>
			<Text>{setting.description}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	settingContainer: {
		alignSelf: 'center',
		width: '80%',
		height: '90%',
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
	settingImage: {
		width: 200,
		height: 200,
		backgroundColor: 'grey',
	},
});

export default SettingDetails;
