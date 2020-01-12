import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export default function Book({ navigation }) {
	const [ date, setDate ] = useState('');
	const spot_id = navigation.getParam('id');

	async function handleSubmit() {
		const user_id = await AsyncStorage.getItem('user');
		await api.post(
			`spots/${spot_id}/bookings`,
			{ date },
			{
				headers: {
					user_id
				}
			}
		);
		Alert.alert('Solicitação de reserva enviada');

		navigation.navigate('List');
	}

	function handleCancel() {
		navigation.navigate('List');
	}

	return (
		<View style={styles.container}>
			<Text style={styles.label}>DATA DE INTERESSE *</Text>
			<TextInput
				style={styles.input}
				placeholder="Qual data você quer reservar?"
				placeholderTextColor="#999"
				autoCapitalize="words"
				autoCorrect={false}
				value={date}
				onChangeText={setDate}
			/>
			<TouchableOpacity onPress={handleSubmit} style={styles.button}>
				<Text style={styles.buttonText}>Solicitar reserva</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={handleCancel}
				style={[ styles.button, styles.cancelButton ]}
			>
				<Text style={styles.buttonText}>Cancelar</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		margin: 30
	},
	label: {
		color: '#444',
		fontWeight: 'bold',
		marginBottom: 8,
		marginTop: 30
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 2,
		paddingHorizontal: 30,
		fontSize: 16,
		color: '#444',
		height: 44,
		marginBottom: 20
	},
	button: {
		backgroundColor: '#f05a5b',
		height: 42,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 2
	},
	buttonText: {
		color: '#FFF',
		fontWeight: 'bold',
		fontSize: 16
	},
	cancelButton: {
		backgroundColor: '#ccc',
		marginTop: 10
	}
});
