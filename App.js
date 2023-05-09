import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import Home from './src/Home';
import 'core-js/full/symbol/async-iterator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './src/Header';
import SettingDetails from './src/SettingDetails';


const Stack = createNativeStackNavigator();

Amplify.configure(awsconfig);

export default function App() {
	return (
		<View style={styles.container}>
      {/* <Header /> */}
			<StatusBar />
			<NavigationContainer>
				<Stack.Navigator>
					{/* <Home /> */}
					<Stack.Screen name='Home' component={Home} />
          <Stack.Screen name="Setting Details" component={SettingDetails} />
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		flex: 1,
	},
});
