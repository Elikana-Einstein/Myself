import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { addShopping, getShopping, getShoppingDates, insertShoppingList, updateShopping } from '../../../database/personal.js'
import { color } from '@/constants/theme'

const Shoppinglist = () => {
 const[dates,setDates]=useState([])
 const[items,setitems]=useState([])

  const [modalVisible, setModalVisible] = useState(false)
  const [editingItem, setEditingItem] = useState(false)
  const [show,setShow]=useState('latest')
  const [what,setWhat]=useState('')
  // Form state
 
  const [form,setForm]=useState({
    id:'',
    name:'',
    date:'',
    quantity:'',
    price:''
  })

  // ➕ Add or ✏️ Update item
  const handleSubmit = () => {
    
if(show === 'all'){
    addShopping(form)
}else if(show === 'latest'){
  
    updateShopping(form)
}else if(show === 'new'){
  
  insertShoppingList(form);
  setShow('latest')
}
   resetForm()
  }
useEffect(()=>{
  async function getDates() {
    const res  = await getShoppingDates()
    setDates(res)
    setWhat(res.at(-1).date)
  }
  getDates()
},[form])
useEffect(()=>{
  async function getItems() {
    const res = await getShopping(what)
    setitems(res)
  }
  getItems()
},[form,what])
  
const handleEdit =(item)=>{
  if(show === 'latest'){
  setForm(
       {
    name:item.item,
   id:item.id,
    quantity:String(item.quantity),
    price:String(item.price),
     date:'',
  }
    )}else{
       setForm(
       {
        id:'',
    date:item.date,
    name:'',
    quantity:'',
    price:''
  }
    )
    }
    setEditingItem(true)
    setModalVisible(true)
  
    
}
  

  const resetForm = () => {
   setForm(
    {
      id:'',
    name:'',
    date:'',
    quantity:'',
    price:''
  }
   )
    setEditingItem(false)
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Packing List</Text>
      <View style={{backgroundColor:'#fff',flexDirection:'row',borderRadius:20,height:40,marginBottom:20}}>
        <TouchableOpacity onPress={()=>setShow('latest')} style={[show === 'latest' && (styles.button1),{ width:'50%',alignItems:'center',justifyContent:'center',}]}>
          <Text>Latest</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setShow('all')} style={[show === 'all' && (styles.button2),{ width:'50%',alignItems:'center',justifyContent:'center',}]}><Text>All</Text></TouchableOpacity>
      </View>
      <FlatList
        data={show === 'latest'? items : dates}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
  <View style={styles.card}>
    {show === 'latest' ? (
      <View>
        <View style={styles.cardContent}>
          <Text style={styles.itemName}>{item.item}</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={styles.meta}>Qty: {item.quantity}</Text>
            <Text style={styles.meta}>Price: {item.price}</Text>
          </View>
        </View>

      
      </View>
    ) : (
      <Text>{item.date.split(' ')[0]}</Text>
    )}


 

  <View style={styles.actions}>
    <TouchableOpacity
      style={styles.iconButton}
      onPress={() => handleEdit(item)}
    >
      <MaterialCommunityIcons
        name="pen"
        size={20}
        color="#2563eb"
      />
    </TouchableOpacity>
  </View>
</View>

        )}
      />

      {/* ➕ Add Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>{ setModalVisible(true);setShow('new')}}
      >
        <Text style={styles.addText}>+ Add Item</Text>
      </TouchableOpacity>

      {/* 🪟 Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingItem ? 'Edit Item' : 'Add Item'}
            </Text>

            <TextInput
              placeholder="Item name"
              placeholderTextColor={color.placeholder}
              value={form.name}
              onChangeText={(text)=>setForm({...form,name:text})}
              style={styles.input}
            />

            <TextInput
              placeholder="Quantity"
              placeholderTextColor={color.placeholder}
              value={form.quantity}
              onChangeText={(text)=>setForm({...form,quantity:text})}
              keyboardType="numeric"
              style={styles.input}
            />
                 <TextInput
              placeholder="Price"
              placeholderTextColor={color.placeholder}
              value={form.price}
              onChangeText={(text)=>setForm({...form,price:text})}
              keyboardType="numeric"
              style={styles.input}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity onPress={resetForm}>
                <Text style={styles.cancel}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>handleSubmit()}>
                <Text style={styles.save}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default Shoppinglist

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button1:{
    backgroundColor:'#2f26daff',
    width:'50%',
    alignItems:'center',
    justifyContent:'center',
    borderTopLeftRadius:20,
    borderBottomRightRadius:20
  },
  button2:{
    backgroundColor:'#2f26daff',
    width:'50%',
    alignItems:'center',
    justifyContent:'center',
    borderTopRightRadius:20,
    borderBottomLeftRadius:20
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
  },



  edit: {
    color: '#0066cc',
  },
  delete: {
    color: '#cc0000',
  },
  addButton: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    position:'absolute',
    bottom:20,
    right:0
  },
  addText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancel: {
    color: '#999',
  },
  save: {
    color: '#0066cc',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#ffffff5b',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // Android shadow
    elevation: 3,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  cardContent: {
    flex: 1,
  },

  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },

  meta: {
    fontSize: 13,
    color: '#f2f4f7ff',
  },

  actions: {
    marginLeft: 10,
  },

  iconButton: {
    backgroundColor: '#eff6ff',
    padding: 8,
    borderRadius: 10,
  },
})
