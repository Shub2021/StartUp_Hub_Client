import React from 'react';
import { StyleSheet, Text, View, Image, FlatList,  } from 'react-native';
import { Card, Button, IconButton, Colors  } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const SubscribedStartups=(props)=>{

    const data = [
        {id:1, cDate:'2020-6-18', cType:'Retail Business'},
        {id:2, cDate:'2020-6-18', cType:'Retail Business'},
        {id:3, cDate:'2020-6-18', cType:'Retail Business'},
        {id:4, cDate:'2020-6-18', cType:'Retail Business'},
        {id:5, cDate:'2020-6-18', cType:'Retail Business'},
        
    ]
    const startupList = ((item)=>{
        return(
            <Card style={styles.comDetails} kety={item.id}>
                <View style={styles.allCards}>
                    <Image 
                    style={{width:60, height:60, borderRadius:40, marginTop:10}}
                    source={{uri:'https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=521&q=80'}}
                    />
                    <View style={styles.cardItem}>
                        <Text>Added Date: {item.cDate}</Text>
                        <Text>Investment Request: {item.cDate}</Text>
                    </View>
                    <Button 
                    style={{marginTop:50, marginLeft:30}}
                    onPress={()=>props.navigation.navigate('Notifications')}
                    color='#0396FF'
                    >
                        View Startup
                </Button>
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

const dtheme = {
    colors:{
        primary:'red'
    }
}
const atheme = {
    colors:{
        primary:'green'
    }
}

const styles = StyleSheet.create({
    comDetails: {
        margin: 5,
        marginLeft: 7,
        marginRight: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 3,     
    },

    allCards: {
        flexDirection: 'row',
        padding: 10,
    },

    cardItem: {
        marginTop: 20,
        marginLeft: 20,
        fontWeight: 'bold', 
    },
    

})

export default SubscribedStartups;