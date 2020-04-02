import React, {useState , useEffect} from 'react';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import { View, FlatList ,Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';
import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function imoveis(){
    const [imoveis, setImoveis] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigationToDetail(imovel){
      navigation.navigate('Details', {imovel});  
    }

    async function loadImoveis(){
        if(loading){
            return;
        }

        if(total > 0 && imoveis.length === total){
            return;
        }
        setLoading(true);

        const response = await api.get('imoveis', {
        params:{page}
        });

        setImoveis([ ... imoveis, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
    loadImoveis();
    }, []);

    return (
        <View style={styles.container}> 
        
            <View style={styles.header}> 
            <Image source={logoImg} />
            <Text style={styles.headerText}>

            Total de <Text style={styles.headerTextBold}> {total} caso </Text>
                </Text>
            </View>
            <Text style={styles.title}> Bem-vindo</Text>
            <Text style={styles.description}> Esses são os imóveis disponiveis para você.</Text>
        
        <FlatList 
        data={ imoveis}
        style={styles.incidentsList}
        keyExtractor={imovel => String(imovel.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadImoveis}
        onEndReachedThreshold={0.2}
        renderItem={({item: imovel}) => (
            <View style={styles.incident}>
            
            <Text style={styles.incidentProperty}> Titulo:</Text> 
            <Text style={styles.incidentValue}>{imovel.titulo}</Text> 

            <Text style={styles.incidentProperty}> Propietario:</Text> 
            <Text style={styles.incidentValue}>{imovel.Nome_Completo}</Text> 

            <Text style={styles.incidentProperty}> Valor:</Text> 
            <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR', 
                {style: 'currency',
                currency: 'BRL'
                }).format(imovel.valor)}
                </Text> 
            
            <TouchableOpacity
             style={styles.detailsButton}
             onPress={() => navigationToDetail(imovel)}
            >
                 <Text style={styles.detailsButtonText}> Ver mais informações </Text>
                  <Feather name="arrow-right" size={16} color="#EB611D"/>
            </TouchableOpacity> 
         </View>
        )}
        
        />
        </View>
    );
}