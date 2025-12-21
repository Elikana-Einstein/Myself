import { StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { navigate } from 'expo-router/build/global-state/routing'
import InvestmentModal from '../modals/investment'
import { getAllInvestments, getAllPlatforms } from '@/database/transactions'
import InvestModal from '../modals/investModal'
const Investment = () => {
      const [modalVisible, setModalVisible] = useState(false);
      const [investmentModalVisible, setInvestmentModalVisible] = useState(false);
      const [platforms,setPlatforms] = useState([]);
      const [investments,setInvestments] = useState([]);

      useEffect(()=>{
        const fetchPlatforms = async()=>{
          try{
            const data = await getAllPlatforms();
            const result  = await getAllInvestments();
            setInvestments(result);
            setPlatforms(data);
          }catch(error){
            console.error('Error fetching platforms:',error);
          }
          ;
        }
        fetchPlatforms();
      },[])

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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text>Your target</Text>
        <TouchableOpacity onPress={()=>setModalVisible(true)}><MaterialCommunityIcons name='pen' size={20} color={'#430feff9'} /></TouchableOpacity>
      </View>
<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} > 
  <View style={{ flexDirection: 'row',  justifyContent: 'space-between', gap: 20 ,marginHorizontal:20}}>
    { platforms.map((platform,index)=>(
      <View key={index} style={{ backgroundColor: 'white', padding: 10, borderRadius: 5, width: 150 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 ,textDecorationLine:'underline',color:'#7c1f35ff'}}>{platform.name}</Text>  
        <Text>Target:  <Text style={{color:'#6a0d0dff'}}>  {platform.target_amount}</Text> </Text>
        <Text>Duration:<Text style={{color:'#6b0808ff'}}>  {platform.duration}     </Text> </Text>
        <Text>Balance: <Text style={{color:'#730e0eff'}}> {platform.balance}       </Text> </Text>
      </View>
    )) }
  </View>
</ScrollView>
</View>
      <View style={{backgroundColor:'lightgreen',marginVertical:20,height:450}}>
        <View style={{flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderBottomColor:'grey',paddingBottom:5}}>
          <Text style={{fontSize:18,marginLeft:10}}>Your Investments</Text>
          <MaterialCommunityIcons name='plus-circle' size={25} color={'green'} style={{position:'absolute',right:10,top:0}} onPress={()=>setInvestmentModalVisible(true)}/>
        </View>
          <ScrollView>
            {
              investments.map((item,index)=>(
                <View style={{backgroundColor:'white',padding:10,margin:10}} key={index}>
                      <Text style={{color:'blue',textDecorationLine:'underline'}}>{item.platformName}</Text>
                      <View style={{flexDirection:'row',gap:20}}>
                        <Text><Text style={{color:'tomato'}}>Amount:</Text> {item.amount}</Text>
                        <Text><Text style={{color:'tomato'}}>Date:</Text> {item.date}</Text>
                      </View>
                </View>
              ))
            }
          </ScrollView>
          <InvestmentModal modalVisible={investmentModalVisible} setModalVisible={setInvestmentModalVisible} />
          <InvestModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
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

export default Investment

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