import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { getDiary } from '@/database/personal'
import { SafeAreaView } from 'react-native-safe-area-context'

const ITEM_HEIGHT = 260;

const Diary = () => {
  const [diary, setDiary] = useState([])
  const [expanded, setExpanded] = useState(false)
  const [selectedId, setselectedId] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    (async () => {
      const res = await getDiary()
      setDiary(res)
    })()
  }, [])

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
  }, [expanded])

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
          <TouchableOpacity style={styles.button}>
            <Text>Have sth in mind?</Text>
          </TouchableOpacity>
        </View>

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
}

})