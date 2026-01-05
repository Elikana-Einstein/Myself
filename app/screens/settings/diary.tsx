import {
  Alert,
  FlatList,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import  DateTimePicker from '@react-native-community/datetimepicker'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { deleteDiary, getDiary, insertDiary } from '@/database/personal'
import { SafeAreaView } from 'react-native-safe-area-context'
import { formatDate } from '@/modules/task'

const ITEM_HEIGHT = 260;

const Diary = () => {
  const [diary, setDiary] = useState([])
  const [expanded, setExpanded] = useState(false)
  const [open, setOpen] = useState(false)
  const [showDate, setShowDate] = useState(false)
  const [selectedId, setselectedId] = useState(null)
  const listRef = useRef(null)
  const [reload, setReload] = useState(false);

  const [form, setForm] = useState({
  date: new Date(),                 // raw
  displayDate: formatDate(new Date()),
  text: ''
});
const triggerReload = () => {
  setReload(prev => !prev);
};

    const handleSubmit = ()=>{
      insertDiary(form);
      setForm(
        {
           date: new Date(),                 // raw
      displayDate: formatDate(new Date()),
      text: ''
        }
      )
    }

  useEffect(() => {
    (async () => {
      const res = await getDiary()
      setDiary(res)
    })()
  }, [form,reload])

  const scrollToIndex = (index) => {
    listRef.current?.scrollToIndex({ index, animated: true })
  }

  const renderItem = useCallback(({ item, index }) => {
    if (!expanded) {
      return (
        <TouchableOpacity
          style={styles.diary}
          onPress={() => {
            setExpanded(true)
            setTimeout(() => scrollToIndex(index), 0)
            setselectedId(item.id)
          }}
          onLongPress={()=>handleDelete(item)}
        >
          <Text style={styles.date}>{item.date}</Text>
          <Text>{item.diaryEntry.split('.')[0]}...</Text>
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity
        style={[styles.dia, item.id === selectedId && {borderColor:'red',backgroundColor:'#b513d12f'}]}
        onPress={() => setExpanded(false)}
      >
        <Text style={styles.diadate}>{item.date}</Text>
        <Text style={styles.para}>{item.diaryEntry}</Text>
      </TouchableOpacity>
    )
  },[expanded,selectedId])
const handleDelete = (item) => {
  Alert.alert(
    'Confirm delete',
    'Are you sure you want to delete?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteDiary(item.id);
            triggerReload()
          // call your delete function here
          // deleteTodo(item.id)
        },
      },
    ],
    { cancelable: true }
  );
};

  return (
    <ImageBackground
      source={require('@/assets/images/couch.jpg')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>

        {/* Search */}
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            placeholder="Are you looking for sth? Search it here"
          />
          <TouchableOpacity style={styles.button} onPress={()=>setOpen(true)}>
            <Text>Have sth in mind?</Text>
          </TouchableOpacity>
        </View>
          <Modal
            onRequestClose={()=>setOpen(false)}
            visible={open}
            animationType='fade'
          >
            <ImageBackground source={require('@/assets/images/car.jpg')} style={{flex:1}}>
           <View style={{marginTop:10,marginHorizontal:3}} >
    <SafeAreaView style={styles.dia_date}>
  <TouchableOpacity onPress={() => setShowDate(true)}>
    <TextInput
      value={form.displayDate}
      editable={false}
      pointerEvents="none"
    />
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
</SafeAreaView>

           
             <TextInput
              style={styles.dia_ent}
              multiline={true}
              value={form.text}
              onChangeText={(txt)=>setForm({...form,text:txt})}
              placeholder='Hello there?'
            />
           </View>
           <TouchableOpacity style={{backgroundColor:'#0d28f17b',height:40,marginHorizontal:20,marginTop:20,borderRadius:40,alignItems:'center',justifyContent:"center"}} onPress={()=>handleSubmit ()}>
            <Text style={{color:'red',fontSize:20}}>SAVE</Text>
           </TouchableOpacity>
            </ImageBackground>
          </Modal>
        <FlatList
          ref={listRef}
          data={diary}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />

      </SafeAreaView>
    </ImageBackground>
  )
}

export default Diary

const styles = StyleSheet.create({
diary:{
  marginVertical:10,
  marginHorizontal:5,
  backgroundColor:'#ffffff8f',
  padding:5,
  borderRadius:5

},
date:{
    color:'#1e16c1ff',
    fontSize:24,
    textDecorationLine:'underline'
},
search:{
  display:'flex',
  flexDirection:'row',
  marginHorizontal:5,
  justifyContent:'space-around',
  alignItems:'center',
  marginTop:3
},
input:{
  width:'60%',
  backgroundColor:'#b8c71342',
  borderRadius:20,
  paddingHorizontal:20

},
button:{
  backgroundColor:'#0fbd126c',
  padding:10,
  borderRadius:10
},
dia:{
    borderColor:'#fff',
    padding:10,
    borderWidth:1,
    minHeight:200,
    marginVertical:10,
    borderRadius:5
},
diadate:{
    color:'#fff',
    fontSize:23,

},
para:{
    marginTop:10,
    fontSize:18,
},
dia_ent:{
  backgroundColor:'#c5baba87',
  fontSize:18

},
dia_date:{
  backgroundColor:'#ca33ca4f',
  marginTop:20
}

})