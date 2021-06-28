import React from 'react';
import { StyleSheet, Text, View, Image, FlatList,  } from 'react-native';
import { Card, Button, IconButton, Colors  } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Notifications=()=>{

    const data = [
        {id:1, cName:'Ravindu Perera', cType:'Retail Business'},
        {id:2, cName:'Ravindu Perera', cType:'Retail Business'},
        {id:3, cName:'Ravindu Perera', cType:'Retail Business'},
        {id:4, cName:'Ravindu Perera', cType:'Retail Business'},
        {id:5, cName:'Ravindu Perera', cType:'Retail Business'},

    ]
    const startupList = ((item)=>{
        return(
            <Card style={styles.comDetails} kety={item.id}>
                <View style={styles.allCards}>
                    <Image 
                    style={{width:80, height:80, borderRadius:40,marginTop:15}}
                    source={{uri:'https://image.freepik.com/free-photo/handsome-young-businessman-shirt-eyeglasses_85574-6228.jpg'}}
                    />
                    <View>
                        <Text style = {styles.cardTitle}>Startup Name</Text>
                        <Text style={{marginLeft: 20,fontSize: 20}}>{item.cName}</Text>
                        
                        <Text style = {styles.cardTitle}>Startup Type</Text>
                        <Text style={{marginLeft: 20}}>{item.cType}</Text>
                        

                        <View
                        style={{flexDirection:'row', marginLeft:5, marginTop:20}}
                        >
                            <Button icon="checkbox-marked-circle-outline" 
                                theme={atheme}
                                mode="Text button" onPress={() => console.log('Pressed')}>
                                    Add Startup
                            </Button>
                            <Button 
                                icon="delete" 
                                theme={dtheme}
                                mode="Text button" onPress={() => console.log('Pressed')}>
                                    Delete
                            </Button>  
                        </View>
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
        marginLeft: 10,
        marginRight: 10,
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

export default Notifications;