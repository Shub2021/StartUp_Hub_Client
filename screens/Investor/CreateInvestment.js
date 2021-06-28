import React, {useState} from 'react';
import { StyleSheet, Text, CheckBox, View } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';

const CreateInvestment = (props)=>{
    
    const [isSelected, setSelection] = useState(false);
    const [Title, setTitle] = useState('')
    const [contact, setContact] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')  
    const [condition, setCondition] = useState('')

    return(
        <View style={styles.root}>
            <TextInput
            style={styles.inputStyles}
                label="Title"
                value={Title}
                theme={theme}
                mode='outlined'
                onChangeText={text => setTitle()}
            />
            <TextInput
            style={styles.inputStyles}
                label="Contact Number"
                value={Title}
                theme={theme}
                keyboardType='number-pad'
                mode='outlined'
                onChangeText={Number => setContact()}
            />
            <TextInput
            style={styles.inputStyles}
                label="E-mail"
                value={Title}
                theme={theme}
                mode='outlined'
                onChangeText={text => setEmail()}
            />

            <Text style={styles.inputStyles}>Period of Calculation interest</Text>
                <Card style={{margin:10}}>
                <View style={styles.card}>
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'space-between',
                          }}>
                        <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            style={styles.checkbox}
                        />
                            <Text style={styles.label}>Annual </Text>

                        <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                            style={styles.checkbox}
                        />
                            <Text style={styles.label}>Monthly </Text>
                            
                            {/* <Text style={styles.result}>Selected Period: {isSelected ? " Annual ✔" : "✖"}</Text> */}
                        </View>
                        
                    </View>
                

                </Card>
                

            <TextInput
            style={{ margin:10}}
                label="Description"
                value={Title}
                theme={theme}
                mode='outlined'
                multiline={true}
                numberOfLines={6}
                maxLength={600}
                onChangeText={text => setDescription()}
            />

            <TextInput
            style={{ margin:10}}
                label="Terms and Conditions"
                value={Title}
                theme={theme}
                mode='outlined'
                multiline={true}
                numberOfLines={4}
                maxLength={300}
                onChangeText={text => setCondition()}
            />

            <View style={{alignItems:'center', marginTop:30}}>
                <Button 
                    // onPress={()=>props.navigation.navigate('CreateInvestment')}
                    style={{backgroundColor:'#0396FF', width:200, padding: 3}}
                    icon="" mode="contained">
                        Publish
                </Button>
                <Button 
                    onPress={()=>props.navigation.navigate('ViewPlan')}
                    style={{ width:300, padding: 3, marginTop:50}}
                    color='#0396FF'
                    icon="cursor-default-click-outline" mode="outlined">
                        View Plan
                </Button>
            </View>
        </View>
    )
}

const theme = {
    colors:{
        primary:'#0396FF'
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    inputStyles: {
        margin:10,
    },
    label: {
        marginLeft: -110,
        marginTop:8
    },

    result: {
        marginRight:30,
        marginTop:8
    },


    card: {
        padding: 10,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default CreateInvestment;