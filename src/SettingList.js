import React, { useEffect, useState } from 'react';
import { DataStore, Storage } from 'aws-amplify';
import { FlatList, Image, Pressable, StyleSheet, Text } from 'react-native';
import { Setting } from './models';

const SettingList = ({ navigation }) => {
	const [settings, setSettings] = useState([]);

	useEffect(() => {
		//query the initial settinglist and subscribe to data updates

		// const resetDataStore = async () => {
		// 	await DataStore.clear();
		// };

		// resetDataStore();

		const subscription = DataStore.observeQuery(Setting).subscribe(
			(snapshot) => {
				//isSynced can be used to show a loading spinner when the list is being loaded.
				const { items, isSynced } = snapshot;

				async function getImageFromStorage() {
					const _settings = await Promise.all(
						items.map(async (item) => {
							const url = await Storage.get(item.name);
							item.image = url;
							return item;
						})
					);

					setSettings(_settings);
				}

				getImageFromStorage();
			}
		);

		//unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
		return function cleanup() {
			subscription.unsubscribe();
		};
	}, []);

	async function deleteSetting(setting) {
		try {
			await DataStore.delete(setting);
		} catch (e) {
			console.log(`Delete failed: ${e}`);
		}
	}

	async function setComplete(updateValue, setting) {
		//update the setting item with updateValue
		await DataStore.save(
			Setting.copyOf(setting, (updated) => {
				updated.isComplete = updateValue;
			})
		);
	}

	const renderItem = ({ item }) => {
		return (
			<Pressable
				onLongPress={() => {
					deleteSetting(item);
				}}
				onPress={() => {
					navigation.navigate('Setting Details', { itemId: item.id });
				}}
				style={styles.settingContainer}
			>
				<Text>
					<Text style={styles.settingHeading}>{item.name}</Text>
					{`\n${item.description}`}
				</Text>
				{item.image && (
					<Image
						source={{ uri: item.image }}
						style={styles.settingImage}
					/>
				)}
			</Pressable>
		);
	};

	return (
		<FlatList
			data={settings}
			keyExtractor={({ id }) => id}
			renderItem={renderItem}
		/>
	);
};

const styles = StyleSheet.create({
	settingContainer: {
		alignSelf: 'center',
		width: '80%',
		height: 100,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#fff',
		borderRadius: 2,
		elevation: 4,
		flexDirection: 'row',
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
		width: 75,
		height: 75,
		backgroundColor: 'grey',
	},
});

export default SettingList;
