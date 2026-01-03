import { Image, StyleSheet, Text, TouchableOpacity, View ,ScrollView} from 'react-native'
import React, {  use, useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { navigate } from 'expo-router/build/global-state/routing'
import TransactionModal from '../modals/transactionModal'
import { getAllTransactions } from '@/database/transactions'
const Expense = () => {
  const [transactions,setTransactions]=useState([])
   const totalExpense = transactions.filter(item=>item.TransactionType.toLowerCase() === 'expense').reduce((sum,{amount})=>sum + Number(amount),0);
    const totalIncome = transactions.filter(item=>item.TransactionType.toLowerCase() === 'income').reduce((sum,{amount})=>sum + Number(amount),0);
    const totalInvest = transactions.filter(item=>item.TransactionType.toLowerCase() === 'invest').reduce((sum,{amount})=>sum + Number(amount),0);
    
  const[modal,setModal]=useState(false);
 const onClose= ()=>{
      setModal(false)
 }
 useEffect(()=>{
  async function fecthTransactions() {
   const result = await getAllTransactions();
   setTransactions(result)
  }
  fecthTransactions();
 },[modal])
   

  return (
    <View style={{backgroundColor:'lightgray',height:'100%'}}>
      <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:50,backgroundColor:'purple',padding:12,alignItems:'center'}}>
          <Image  source={require('../../assets/images/est.webp')} style={{width:50,height:50,borderRadius:25}} />
          <Text style={{fontSize:23}}>Hello Elikana</Text>
      </View>
      <View style={{padding:10}}>

        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
        <TouchableOpacity style={styles.action} onPress={()=>navigate('/screens/expense')}>
          <Text>Expense</Text>
          <MaterialCommunityIcons name='calculator' size={20}/>
        </TouchableOpacity>
         <TouchableOpacity style={styles.action} onPress={()=>navigate('/screens/income')}>
          <Text>Income</Text>
          <MaterialCommunityIcons name='wallet-outline' size={20}/>
        </TouchableOpacity>
         <TouchableOpacity style={styles.action} onPress={()=>navigate('/screens/investment')}>
          <Text>Invest</Text>
          <MaterialCommunityIcons name='finance' size={20}/>
        </TouchableOpacity>
      </View>
     <View>
       <ScrollView style={styles.list}>
        {transactions.map((item)=>
        (
            <View key={item.id} style={styles.list_items}> 
              <View>
                <Text style={[styles.transaction,item.TransactionType.toLowerCase() === 'expense'?{color:'red'}:{color:'green'}]}>{item.TransactionType}</Text>
                <View style={{flexDirection:'row',gap:40}}>
                  <Text style={[item.TransactionType.toLowerCase() === 'expense'?{color:'red',fontSize:15}:{color:'green'}]} >{item.amount} <Text style={{color:'black',fontSize:12,fontStyle:'italic',fontWeight:'bold'}}>ksh</Text></Text>
                  <Text style={[{fontSize:15},item.for?{color:'blue'}:{color:'purple'}]} >{item.for || item.description}</Text>
                </View>
              </View>
              <View>

                { item.TransactionType === 'Expense'?
                  <MaterialCommunityIcons name='arrow-down' color={'red'} size={18}/>:
                  <MaterialCommunityIcons name='arrow-up' color={'green'} size={15}/>


                }
              </View>
            </View>
          
        ))}
      </ScrollView>
        {
          modal? <TransactionModal  onClose={onClose} visible={modal}/>:<></>
        }
     </View>

     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View style={styles.list1_items}>
        <Text>Total expense </Text>
        <Text style={{fontSize:15,color:'blue',fontWeight:'bold'}}>{totalExpense}.00 <Text style={{color:'black',fontSize:12,fontStyle:'italic',fontWeight:'bold'}}>Ksh</Text></Text>
      </View>
      <View style={styles.list1_items} >
        <Text>Total income</Text>
        <Text style={{fontSize:15,color:'darkgreen',fontWeight:'bold'}}>{totalIncome}.00 <Text style={{color:'black',fontSize:12,fontStyle:'italic',fontWeight:'bold'}}>Ksh</Text></Text>

      </View>
      <View style={styles.list1_items}>
        <Text>Total invest</Text>
        <Text style={{fontSize:15,color:'blue',fontWeight:'bold'}}>{totalInvest}.00 <Text style={{color:'black',fontSize:12,fontStyle:'italic',fontWeight:'bold'}}>Ksh</Text></Text>

      </View>
     </View>
        <TouchableOpacity style={styles.button} onPress={()=>setModal(true)}>
          <MaterialCommunityIcons style={{position:'relative'}} name='plus' size={30} color={'blue'}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Expense

const styles = StyleSheet.create({
  action:{
      alignItems:'center',
      backgroundColor:'orange',
      padding:10,
      borderRadius:6,
      width:100
  },
  list:{
    padding:10,
    backgroundColor:'lightblue',
    marginVertical:20,
    height:550,

  },
  list_items:{
    backgroundColor:'white',
    margin:5,
    padding:5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:23
  },
  transaction:{
    fontSize:18
  },
  list1_items:{
    backgroundColor:'tomato',
    padding:12,
    alignItems:'center',
    borderRadius:4,
  },
  button:{
    backgroundColor:'orange',
    width:50,
    height:50,
    borderRadius:25,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:90,
    right:30
  }
  
})