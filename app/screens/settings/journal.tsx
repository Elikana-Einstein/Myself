import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { formatDate } from '@/modules/task'
import  DateTimePicker from '@react-native-community/datetimepicker'
import { getJournal, insertJournal } from '@/database/personal'



const Journal = () => {

  const [open, setOpen] = useState(false)
  const [journals, setJournals] = useState([])
  const [showDate, setShowDate] = useState(false)
  
 const [form, setForm] = useState({
  date: new Date(),                 // raw
  displayDate: formatDate(new Date()),
  text: ''
});
useEffect(()=>{
  async function getsJournal() {
    const res = await getJournal()
    
    setJournals(res)
  }
  getsJournal()
},[])

const handleSubmit=()=>{
    insertJournal(form);
    setForm(
      {
  date: new Date(),                 // raw
  displayDate: formatDate(new Date()),
  text: ''
}
    )
  
}

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.entry}>{item.journalEntry}</Text>
    </View>
  )

  return (  
      <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Journal</Text>
      </View>

      {/* Journal List */}
      <FlatList
        data={journals}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No journal entries yet 🌱  
            Start writing your thoughts.
          </Text>
        }
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setOpen(true)}>
        <AntDesign name="plus" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={open} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New Journal Entry</Text>
            <TouchableOpacity onPress={()=>setShowDate(true)}>
              <TextInput value={form.displayDate} style={{fontWeight:'bold'}} readOnly/>
             
            </TouchableOpacity>
             {showDate && (
    <DateTimePicker
      mode="date"
      display="default"
      value={form.date}
      onChange={(event, selectedDate) => {
        setShowDate(false);
        if (selectedDate) {
          setForm(prev => ({
            ...prev,
            displayDate: formatDate(selectedDate),
          }));
        }
      }}
    />
  )}
            <TextInput
              style={styles.input}
              multiline
              placeholder="Write your thoughts here..."
              value={form.text}
              onChangeText={(text)=>setForm({...form,text:text})}
            />

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => setOpen(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.save}
                onPress={()=>handleSubmit()}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>

  )
}

export default Journal
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb'
  },
  header: {
    padding: 20,
    backgroundColor: '#5a4fcf'
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff'
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 15,
    elevation: 3
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5a4fcf',
    marginBottom: 8
  },
  entry: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24
  },
  empty: {
    textAlign: 'center',
    marginTop: 100,
    color: '#777',
    fontSize: 16
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#5a4fcf',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 15
  },
  input: {
    minHeight: 150,
    backgroundColor: '#f4f6fb',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    textAlignVertical: 'top'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  cancel: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#eee',
    marginRight: 10,
    alignItems: 'center'
  },
  cancelText: {
    fontWeight: '600',
    color: '#555'
  },
  save: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#5a4fcf',
    marginLeft: 10,
    alignItems: 'center'
  },
  saveText: {
    fontWeight: '700',
    color: '#fff'
  }
})
