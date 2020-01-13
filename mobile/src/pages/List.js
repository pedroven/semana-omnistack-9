import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';
import socketio from 'socket.io-client';

export default function List() {
	const [ techs, setTechs ] = useState([]);

	useEffect(() => {
		AsyncStorage.getItem('user').then((user_id) => {
			const socket = socketio('http://10.0.2.2:8888', {
				query: {
					user_id
				}
			});
			socket.on('booking_response', (booking) => {
				Alert.alert(
					`Sua reserva em ${booking.spot
						.company} em ${booking.date} foi ${booking.approved
						? 'APROVADA'
						: 'REJEITADA'} `
				);
			});
		});
	}, []);

	useEffect(() => {
		AsyncStorage.getItem('techs').then((techs) => {
			const techsList = techs.split(',').map((tech) => tech.trim());
			setTechs(techsList);
		});
	}, []);

	return (
		<View style={styles.container}>
			<Image source={logo} style={styles.logo} />
			<ScrollView>
				{techs.map((tech) => <SpotList key={tech} tech={tech} />)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	logo: {
		height: 32,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginTop: 10,
		marginBottom: 10
	}
});
