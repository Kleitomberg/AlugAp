import React from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';


import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail(){
    const navigation = useNavigation();
    const route = useRoute();
    const imovel = route.params.imovel;
    const message = `Olá sr, ${imovel.Nome_Completo}, estou interessado no seu Apartamento no valo de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(imovel.valor)}`;

        function navigateBack(){
            navigation.goBack()

        }
//Contatos
        function sendMail(){
            MailComposer.composeAsync({
                subject: `Herói do caso: ${imovel.titulo}`,
                recipients: [imovel.email],
                body:message,
            })
        }

        function sendWhatsApp(){
            Linking.openURL(`whatsapp://send?phone=${imovel.whatsapp}&text=${message}`);
        }

    return(
        <View style={styles.container}> 
         <View style={styles.header}> 
            <Image source={logoImg}/>

                <TouchableOpacity onPress={navigateBack} >
                    <Feather name='arrow-left' size={28} color="#EB611D"/>
                </TouchableOpacity>
            </View>  

            <View style={styles.incident}>
           

            <Text style={styles.incidentProperty}> Descrição:</Text> 
            <Text style={styles.incidentValue}>{imovel.descricao}</Text> 

            <Text style={styles.incidentProperty}> VALOR:</Text> 
            <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', 
                {style: 'currency',
                currency: 'BRL'
                }).format(imovel.valor)}
                </Text> 
                </View>  
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Curtiu?</Text>
                <Text style={styles.heroTitle}>Agende agora mesmo uma reunião com o propietario.</Text>

                <Text style={styles.heroDescription}> Entre em contato:</Text>

            <View style={styles.actions}>

                <TouchableOpacity style={styles.action} onPress={sendWhatsApp} >
               <Text style={styles.actionText}> WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.action} onPress={ sendMail} >
               <Text style={styles.actionText}> E-mail</Text>
                </TouchableOpacity>
                 </View>
             </View>
        </View>
    );
}