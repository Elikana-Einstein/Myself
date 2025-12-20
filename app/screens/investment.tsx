import { StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import {invests,invested} from '../../modules/invest'
import { navigate } from 'expo-router/build/global-state/routing'
const investment = () => {
  return (
    <View style={{backgroundColor:'grey',height:'100%'}}>
      <View style={{backgroundColor:'white',marginTop:40,height:50,alignItems:'center'}}>
        <Text style={{margin:'auto',fontSize:20,color:'red'}}>Analytics of your investment journey</Text>

      </View>
      <View>
         <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <TouchableOpacity style={styles.action} >
          <Text>Ziidi</Text>
          <MaterialCommunityIcons name='calculator' color={'white'} size={20}/>
        </TouchableOpacity>
         <TouchableOpacity style={styles.action} >
          <Text>Mshwari Lock saving account</Text>
          <MaterialCommunityIcons name='wallet-outline' color={'white'} size={20}/>
        </TouchableOpacity>
         <TouchableOpacity style={styles.action} >
          <Text>Post Bank</Text>
          <MaterialCommunityIcons name='finance' color={'white'} size={20}/>
        </TouchableOpacity>
      </View>
      </View>
     <View style={{ backgroundColor: 'green', padding: 10 }}>
  <Text>Your target</Text>

  <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
    {Object.keys(invests).map((ke) => (
      <View style={styles.save} key={ke}>
        <Text
          style={{
            color: 'blue',
            fontSize: 12,
            textDecorationLine: 'underline',
          }}
        >
          {ke}
        </Text>

        {Object.keys(invests[ke]).map((key) => (
          <View style={{ flexDirection: 'row' }} key={`${ke}-${key}`}>
            <Text>{key}:</Text>
            <Text style={{ color: 'purple' }}>
              {' '}
              {invests[ke][key]}
            </Text>
          </View>
        ))}
      </View>
    ))}
  </View>
</View>

      <View style={{backgroundColor:'lightgreen',marginVertical:20,height:450}}>
          <ScrollView>
            {
              invested.inv.map((item,index)=>(
                <View style={{backgroundColor:'white',padding:10,margin:10}} key={index}>
                      <Text style={{color:'blue',textDecorationLine:'underline'}}>{item.Where}</Text>
                      <View style={{flexDirection:'row',gap:20}}>
                        <Text><Text style={{color:'tomato'}}>Amount:</Text> {item.Amount}</Text>
                        <Text><Text style={{color:'tomato'}}>Date:</Text> {item.date}</Text>
                      </View>
                </View>
              ))
            }
          </ScrollView>

        </View>
        <View >
          <Text>Actions</Text>
          <View style = {{flexDirection:'row',justifyContent:'space-evenly'}}>
            <TouchableOpacity style={styles.invest} onPress={()=>navigate('/screens/weeklyreview')}>
              <Text>Weekly review</Text>
              <MaterialCommunityIcons name='bank' size={15} color={'red'}/>
              </TouchableOpacity>
            <TouchableOpacity style={styles.invest} onPress={()=>navigate('/screens/monthlyreview')}>
              <Text>Monthly review</Text>

              <MaterialCommunityIcons name='bank' size={15} color={'red'}/>
              </TouchableOpacity>
            <TouchableOpacity style={styles.invest} onPress={()=>navigate('/screens/yearlyreview')}>
              <Text>Yearly review</Text>

              <MaterialCommunityIcons name='wallet' size={15} color={'red'}/>
              </TouchableOpacity>
          </View>
        </View>
    </View>
  )
}

export default investment

const styles = StyleSheet.create({
  action:{
 alignItems:'center',
      backgroundColor:'tomato',
      padding:10,
      borderRadius:6,
      width:100,
      marginVertical:20,
  },
  save:{
    backgroundColor:'white',
    width:100,
    padding:10,
    borderRadius:5
  },
  invest:{
    width:100,
    backgroundColor:'white',
    padding:5,
    alignItems:'center',
    borderRadius:7,
  }
})