import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Image,
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native';
import logo from '../assets/logo.png';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default function Login({ navigation }) {
	const [ email, setEmail ] = useState('');
	const [ techs, setTechs ] = useState('');

	useEffect(() => {
		AsyncStorage.getItem('user').then((user) => {
			if (user) {
				navigation.navigate('List');
			}
		});
	}, []);

	async function handleSubmit() {
		const response = await api.post('/sessions', {
			email
		});

		const { _id } = response.data;
		await AsyncStorage.setItem('user', _id);
		await AsyncStorage.setItem('techs', techs);

		navigation.navigate('List');
	}

	return (
		<View style={styles.container}>
			<Image source={logo} />
			<View style={styles.form}>
				<Text style={styles.label}>SEU EMAIL *</Text>
				<TextInput
					style={styles.input}
					placeholder="Seu e-mail"
					placeholderTextColor="#999"
					keyboardType="email-address"
					value={email}
					onChangeText={setEmail}
				/>
				<Text style={styles.label}>TECNOLOGIAS *</Text>
				<TextInput
					style={styles.input}
					placeholder="Tecnologias de interesse"
					placeholderTextColor="#999"
					autoCapitalize="words"
					autoCorrrect={false}
					value={techs}
					onChangeText={setTechs}
				/>
				<TouchableOpacity onPress={handleSubmit} style={styles.button}>
					<Text style={styles.buttonText}>Encontrar spots</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	form: {
		alignSelf: 'stretch',
		paddingHorizontal: 30,
		marginTop: 30
	},
	label: {
		color: '#444',
		fontWeight: 'bold',
		marginBottom: 8
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
	}
});
