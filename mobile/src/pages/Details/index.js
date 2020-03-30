import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;

    const message = `Dear ${incident.name}, I would like to contact you regarding the case of the ${incident.title}, to donate the value of USD ${incident.value}`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Hero of the case: ${incident.title}`,
            recipients: [`${incident.email}`],
            body: message
        });
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container} >
            <View style={styles.header} >
                <Image source={logoImg} />
                
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>

                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>NGO:</Text>
                <Text style={styles.incidentValue}>{incident.name} from {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASE:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALUE:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('en-US', { style: 'current', currency: 'USD'}).format(incident.value)}</Text>

            </View>

            <View style={styles.contactBox} >
                <Text style={styles.heroTitle}>Save the day!</Text>
                <Text style={styles.heroTitle}>Be the hero on this case!</Text>

                <Text style={styles.heroDescription}>Contact this NGO</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}