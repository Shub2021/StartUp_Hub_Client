import React from 'react';
import { StyleSheet, Text, View, Image, FlatList,  } from 'react-native';
import { Card, Button  } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const HomeInvestor=()=>{

    const data = [
        {id:1, cName:'Ravindu Perera', cType:'Retail Business'},
        {id:2, cName:'Ravindu Perera', cType:'Retail Business'},
        {id:3, cName:'Ravindu Perera', cType:'Retail Business'},
        {id:4, cName:'Ravindu Perera', cType:'Retail Business'},
        {id:5, cName:'Ravindu Perera', cType:'Retail Business'},
        {id:6, cName:'Ravindu Perera', cType:'Retail Business'},
        {id:7, cName:'Ravindu Perera', cType:'Retail Business'},
    ]
    const startupList = ((item)=>{
        return(
            <Card style={styles.comDetails} kety={item.id}>
                <View style={styles.allCards}>
                    <Image 
                    style={{width:90, height:90, borderRadius:45, marginTop:10}}
                    source={{uri:'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'}}
                    />
                    <View>
                        <Text style = {styles.cardTitle}>Startup Name</Text>
                        <Text style={{marginLeft: 20,fontSize: 20}}>{item.cName}</Text>
                        
                        <Text style = {styles.cardTitle}>Startup Type</Text>
                        <Text style={{marginLeft: 20}}>{item.cType}</Text>
                        
                        <Button 
                        style={{marginTop:10, marginLeft:20, backgroundColor:'#0396FF'}}
                        icon=""  mode="contained" onPress={() => console.log('Pressed')}>
                            Add Startup
                        </Button>
                    </View>    
                </View>    
            </Card>
        )
    })

    return(
        <View>
            <FlatList
                data = {data}
                renderItem = {({item})=>{
                  return startupList(item)
                }}
                keyExtractor = {item=>`${item.id}`}
            />
        </View> 
    )
    
}

const styles = StyleSheet.create({
    comDetails: {
        margin: 5,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,     
    },

    allCards: {
        flexDirection: 'row',
        padding: 20,
    },

    cardTitle: {
        marginTop: 5,
        marginLeft: 20,
        fontWeight: 'bold'
    },


})

export default HomeInvestor;