import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Header from './Header';
import AddSettingModal from './AddSettingModal';
import SettingList from './SettingList';

const Home = ({ navigation }) => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			{/* <Header /> */}
			<SettingList navigation={navigation} />
			<Pressable
				onPress={() => {
					setModalVisible(true);
				}}
				style={[styles.buttonContainer, styles.floatingButton]}
			>
				<Text style={styles.buttonText}>+</Text>
			</Pressable>
			<AddSettingModal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	buttonText: {
		color: '#fff',
		fontWeight: '600',
		padding: 16,
	},
	buttonContainer: {
		alignSelf: 'flex-end',
		backgroundColor: '#4696ec',
		borderRadius: 99,
		paddingHorizontal: 8,
	},
	floatingButton: {
		position: 'absolute',
		bottom: 44,
		elevation: 6,
		shadowOffset: {
			height: 4,
			width: 1,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
});

export default Home;
