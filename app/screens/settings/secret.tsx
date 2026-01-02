import {  FlatList, ImageBackground, Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getGoals, insertGoal, updateGoal } from '@/database/personal';
const Secret = () => {


const [modalVisible, setModalVisible] = useState(false);
const [editingGoal, setEditingGoal] = useState(false)
const [form,setForm]=useState({
  id:'',
  goal:'',
  duration:'',
  achieved:false,
  
})

  const [selectedTab, setSelectedTab] = useState('Goals');

  // Sample data for each tab
  const [data,setData]=useState([])
  const setUpdate=(item)=>{
    setEditingGoal(true)
    setModalVisible(true)
    setForm({
       id:item.id,
        goal:item.goal,
        duration:item.duration,
        achieved:false,
  
    })
  }
  const handleSubmit=()=>{
    if (editingGoal){
      updateGoal(form)


    }else{
      insertGoal(form)
    }
  }
  useEffect(()=>{
    async function getGOals() {
      const res = await getGoals()
      setData(res)
    }
    
    getGOals()
    
  },[modalVisible])

  const render=({item})=>{
    return(
      <View style={styles.item}>
        
        <View style={{flexDirection:'row',gap:4}}>
          {
            item.achieved ?
          
            <MaterialCommunityIcons color={'green'} name='close-circle'/>
            :
            <MaterialCommunityIcons color={'red'} name='circle'/>
          }
        <Text>{item.goal}</Text>
        <Text style={{color:'#fff'}}>{item.duration} months</Text>
        </View>
       
        <TouchableOpacity onPress={()=>setUpdate(item)}>
          <MaterialCommunityIcons color={'white'} name='pen' size={20}/>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ImageBackground source={require('@/assets/images/robot.jpg')} style={styles.background}>
      <SafeAreaView style={{ flex: 1 }}>
       
        <View style={styles.buttonss}>
           
         <View  style={styles.buttons}>
           {['Goals', 'Passwords', 'Stories'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.button, selectedTab === tab && styles.selectedButton]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.buttons_text, selectedTab === tab && styles.selectedText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
         </View>
          <View>
          <FlatList
          data={data}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: 20 }}
          renderItem={render}
        />
          </View>

        </View>
          <TouchableOpacity onPress={()=>setModalVisible(true)} style={styles.add}>
            <MaterialCommunityIcons name='plus' size={34}/>
          </TouchableOpacity>
          <Modal
  visible={modalVisible}
  transparent
  animationType="slide"
  onRequestClose={()=>setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalBox}>
      <Text style={styles.modalTitle}>
        {editingGoal ? 'Edit Goal' : 'New Goal'}
      </Text>

      <TextInput
        placeholder="Goal name"
        value={form.goal}
        onChangeText={(text)=>setForm({...form,goal:text})}
        style={styles.modalInput}
      />

      <TextInput
        placeholder="Target duration (e.g. 6 months)"
        value={form.duration}
        onChangeText={(text)=>setForm({...form,duration:text})}
        style={styles.modalInput}
      />
      {editingGoal &&( 
        <View style={{alignItems:'center'}}>
          <Text>
            Mark as achieved
          </Text>
          <Switch value={form.achieved} // boolean value 
            onValueChange={(val) => setForm({ ...form, achieved: val })}
          trackColor={{ false: '#ccc', true: '#4CAF50' }}
           thumbColor={form.achieved ? '#fff' : '#f4f3f4'}
          />
          
        </View>
       
        )
      }

      <View style={styles.modalActions}>
        <TouchableOpacity  onPress={()=>handleSubmit()} style={styles.saveBtn}>
          <Text style={{ color: '#fff' }}>Save</Text>
        </TouchableOpacity>

        {editingGoal && (
          <TouchableOpacity
           
            style={styles.deleteBtn}
          >
            <Text style={{ color: '#fff' }}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        onPress={() => {setModalVisible(false);setEditingGoal(false)}}
        style={styles.cancelBtn}
      >
        <Text>Cancel</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      </SafeAreaView>
    </ImageBackground>
  );
};

export default Secret;

const styles = StyleSheet.create({
  background: { flex: 1 },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  
  },
  buttonss:{
  backgroundColor: '#ea52523b',
  },

  button: {
    backgroundColor: '#160cd63f',
    padding: 10,
    borderRadius: 10,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#1e90ff',
  },
  buttons_text: {
    color: 'red',
    fontWeight: 'bold',
  },
  selectedText: {
    color: 'white',
  },
  item: {
    backgroundColor: '#ffffff21',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection:'row',
    justifyContent:'space-between'    
  },
  itemText: {
    fontSize: 16,
  },
 add: {
  position: 'absolute',
  bottom: 20,
  right: 20,
  backgroundColor: '#0a0df1ff',
  width: 56,
  height: 56,
  borderRadius: 28,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 6, // Android shadow
  shadowColor: '#000', // iOS shadow
  shadowOpacity: 0.3,
  shadowRadius: 4,
},
modalOverlay: {
 marginVertical:'auto'
},
modalBox: {
  backgroundColor: '#f7edf7d5',
  padding: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
},
modalTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
},
modalInput: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  padding: 10,
  marginBottom: 10,
},
modalActions: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
},
saveBtn: {
  backgroundColor: '#1e90ff',
  padding: 12,
  borderRadius: 10,
  flex: 1,
  alignItems: 'center',
  marginRight: 10,
},
deleteBtn: {
  backgroundColor: '#ff4d4d',
  padding: 12,
  borderRadius: 10,
  flex: 1,
  alignItems: 'center',
},
cancelBtn: {
  alignItems: 'center',
  marginTop: 10,
},
achievedItem: {
  backgroundColor: '#d4ffd4',
},
achievedText: {
  textDecorationLine: 'line-through',
  color: '#555',
},
durationText: {
  fontSize: 12,
  color: '#777',
},


});
