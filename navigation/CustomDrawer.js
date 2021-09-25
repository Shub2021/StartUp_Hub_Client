import React from 'react';
import {createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer"
import { Image, TouchableOpacity, View } from 'react-native';
import { COLORS, icons } from '../constants';
import {Tabs} from '../navigation/tabs.js'
import {SIZES} from '../constants/index';

const Drawer = createDrawerNavigator()

const CustomDrawerContent = ({navigation}) => {
    return(
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{ flex: 1}}
        >
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.radius
                }}
            >
                {/* close */}
                <View 
                    style={{
                        alignItems: 'flex-start',
                        justifyContent : 'center'
                    }}
                >
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent:"center"
                        }}
                        onPress={() => navigation.closeDrawer()}
                    >
                        <Image 
                            source = {icons.cross}
                            style={{
                                height: 35,
                                width: 35,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>

                </View>

                {/* profile */}
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        marginTop: SIZES.radius,
                        alignItems: 'center'
                    }}
                >

                </TouchableOpacity>

                {/* Drawer Items */}

            </View>

        </DrawerContentScrollView>
    )
}

const CustomDrawer = () => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.primary
            }}
        >
            <Drawer.Navigator 
                drawerType="slide"
                overlayColor="transparent"
                drawerStyle={{
                    flex: 1,
                    width: '65%',
                    paddingRight: 20,
                    backgroundColor: 'transparent'

                }}
                initialRouteName="Tabs"
                drawerContent={props => {
                    return (
                        <CustomDrawerContent 
                            navigation={props.navigation}
                        />
                    )
                }}
            >
                <Drawer.Screen name="Tabs">
                    {props => <Tabs {...props} />}
                </Drawer.Screen>

            </Drawer.Navigator>

        </View>
    );
}

export default CustomDrawer;
