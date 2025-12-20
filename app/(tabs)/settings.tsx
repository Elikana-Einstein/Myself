import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Settings = () => {
  const[mode,setMode]=useState(false)
  return (
    <View style={{}}>
      <View  style={styles.first_ban}>
        <Image source={require('../../assets/images/est.webp')} style={{width:60,height:60,borderRadius:25}}/>
        <View style={styles.second_ban}>
          <Text style={{color:'white',marginLeft:20,fontSize:19}}>Elikana Mwangi</Text>
          <Text style={styles.quote}>I just need to be a little patience and a little hardworking, the rest nature will figure out</Text>
        </View>
      </View>
      <Text style={styles.line}></Text>
      <View style={styles.third_ban}>
        <MaterialCommunityIcons name='account' color={'white'} size={18}/>
        <View>
          <Text style={{color:'white',fontSize:17}}>Account</Text>
          <Text style={{color:'lightgrey'}}>Security notifications </Text>
        </View>
      </View>
      <Text style={styles.line}></Text>
      <View style={styles.third_ban}>
        <MaterialCommunityIcons name='security' color={'white'} size={18}/>
        <View>
          <Text style={{color:'white',fontSize:17}}>Privacy</Text>
          <Text style={{color:'lightgrey'}}>Secrets, private stuff </Text>
        </View>
      </View>
      <Text style={styles.line}></Text>
      <View style={styles.third_ban}>
        <MaterialCommunityIcons name='book' color={'white'} size={18}/>
        <View>
          <Text style={{color:'white',fontSize:17}}>Diary</Text>
          <Text style={{color:'lightgrey'}}>Write something sensitive </Text>
        </View>
      </View>
      <Text style={styles.line}></Text>
      <View style={styles.third_ban}>
        <MaterialCommunityIcons name='switch' color={'white'} size={18}/>
        <View>
          <Text style={{color:'white',fontSize:17}}>Dark mode</Text>
          <Text style={{color:'lightgrey'}}>Switch between dark mode </Text>
        </View>
        <TouchableOpacity onPress={()=>setMode(prev=>!prev)} style={styles.button} >
          {
            mode?

            <View style={styles.switch1}></View>
            :
            <View style={styles.switch2}></View>

          }
        </TouchableOpacity>
      </View>
      <Text style={styles.line}></Text>
       <View style={styles.third_ban}>
        <MaterialCommunityIcons name='email' color={'white'} size={18}/>
        <View>
          <Text style={{color:'white',fontSize:17}}>Email notfications</Text>
          <Text style={{color:'lightgrey'}}>Manage email notifications </Text>
        </View>
      </View>
      <Text style={styles.line}></Text>
       <View style={styles.third_ban}>
        <MaterialCommunityIcons name='key' color={'white'} size={18}/>
        <View>
          <Text style={{color:'white',fontSize:17}}>Personality</Text>
          <Text style={{color:'lightgrey'}}>Track your behaviours </Text>
        </View>
      </View>
      <Text style={styles.line}></Text>
      <View style={styles.third_ban}>
        <MaterialCommunityIcons name='message' color={'white'} size={18}/>
        <View>
          <Text style={{color:'white',fontSize:17}}>Notifications</Text>
          <Text style={{color:'lightgrey'}}>Manage your notifications </Text>
        </View>
      </View>
      <Text style={styles.line}></Text>


    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
    first_ban:{
      marginTop:50,
      marginHorizontal:10,
      flexDirection:'row',
      gap:12,
      alignItems:'center',
      width:'70%',
      marginBottom:10,
    },
    line:{
      backgroundColor:'lightgrey',
      width:'100%',
      height:1
    },
    quote:{
      color:'white',
      textOverflow:'wrap',
      borderColor:'maroon',
      borderWidth:1,
      borderRadius:50,
      padding:7,
      paddingLeft:10,



    },
    second_ban:{
      gap:6,
      marginLeft:10,
      flexDirection:'column'
    },
    third_ban:{
      flexDirection:'row',
      gap:10,
      marginHorizontal:20,
      marginVertical:10,  
      alignItems:'center',   
    },
    button:{
        width:60,
        backgroundColor:'white',
        height:30,
        borderRadius:50,
        left:120
    },
    switch1:{
      height:30,
      width:30,
      borderRadius:15,
      backgroundColor:'blue'
    },
     switch2:{
      height:30,
      width:30,
      borderRadius:15,
      backgroundColor:'black',
      left:30,
    },
})