import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { insertTodo } from '../database/db'
import { color } from '@/constants/theme'

const Modalform = ({ modal, setModal }) => {

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority:'',
    status:'Pending',
    time: '',
  })

  async function handleSubmitted() {
    if (!form.title.trim() || !form.description.trim()  || !form.priority.trim() || !form.status.trim() || !form.time.trim()   ) {
      alert("All fields are required")
      return
    }

    await insertTodo(form)

    setForm({ title:'', description:'',priority:'',status:'', time:'' })
    setModal(false)
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modal}
      onRequestClose={() => setModal(false)}
    >
      <View style={styles.modal}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.modal_text}>Add task</Text>
          <MaterialIcons
            name="close"
            size={24}
            onPress={() => setModal(false)}
          />
        </View>

        <View style={styles.divider} />

        {/* Title */}
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={form.title}
          onChangeText={text => setForm({ ...form, title: text })}
          placeholder="Task title"
          placeholderTextColor={color.placeholder}
        />

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={form.description}
          onChangeText={text => setForm({ ...form, description: text })}
          placeholder="Task description"
          placeholderTextColor={color.placeholder}
        />

        {/* priority */}
        <Text style={styles.label}>Priority</Text>
        <TextInput
          style={styles.input}
          value={form.priority}
          onChangeText={text => setForm({ ...form, priority: text })}
          placeholder="Low || High || Medium"
          placeholderTextColor={color.placeholder}
        />
         {/* status */}
        <Text style={styles.label}>Status</Text>
        <TextInput
          style={styles.input}
          value={form.status}
          onChangeText={text => setForm({ ...form, status: text })}
          placeholder="Pending"
          placeholderTextColor={color.placeholder}
        />
   {/* time */}
        <Text style={styles.label}>Time</Text>
        <TextInput
          style={styles.input}
          value={form.time}
          onChangeText={text => setForm({ ...form, time: text })}
          placeholder="Task time"
          placeholderTextColor={color.placeholder}
        />


        {/* Submit */}
        <TouchableOpacity style={styles.btn} onPress={handleSubmitted}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>

      </View>
    </Modal>
  )
}

export default Modalform
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    marginTop: 100,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#dc0bd56c',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modal_text: {
    fontSize: 23,
    fontWeight: '600'
  },
  divider: {
    height: 2,
    backgroundColor: 'black',
    marginVertical: 10
  },
  label: {
    fontSize: 18,
    marginTop: 15
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'green',
    padding: 10
  },
  btn: {
    backgroundColor: 'lightgreen',
    height: 45,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600'
  }
})
