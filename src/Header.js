import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = () => (
	<View style={styles.headerContainer}>
		<Text style={styles.headerTitle}>Camera Settings</Text>
	</View>
);

const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: '#4696ec',
		paddingTop: Platform.OS === 'ios' ? 44 : 0,
	},
	headerTitle: {
		color: '#fff',
		fontSize: 20,
		fontWeight: '600',
		paddingVertical: 16,
		textAlign: 'center',
	},
});

export default Header;
