import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Alert, TextInput, Button, ImageBackground } from 'react-native';
import React, {   use, useEffect, useMemo, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createEvent, getEventDates, getEvents } from '@/database/db';
const MonthSelectorCalendar = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');
  const months = Array.from({ length: 12}, (_, i) => `2025-${String(i + 1).padStart(2, '0')}-01`);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [dates,setDates]=useState([]);
  const [eventD,setEventD]=useState('');
  const [events,setEvents]=useState([]);
  
  const [modal,setModal]=useState(false);
  const [form,setForm]=useState({
    date:'',
    eventName:'',
    venue:'',
    time:'11:00 PM'
  })
  const handleSave=async()=>{
    if(!form.date || !form.eventName || !form.venue){
      Alert.alert('Error','Please fill all fields');
      return;
    }
    await createEvent(form);
    setModal(false);
    // Reset form
    setForm({
      date:'',
      eventName:'',
      venue:'',
      time:'11:00 PM'
    });
  }
useEffect(()=>{
  const fetchDates=async()=>{
    const result=await getEventDates();
    const formattedDates = [...new Set(result.map(item => item.date))];
    setDates(formattedDates);
    setEventD(formattedDates[0] || '');
    
  }
  fetchDates();
},[form])

useEffect(()=>{
  async function fetchEvents(){
    const result=await getEvents(eventD);
    setEvents(result);
  }
  fetchEvents();
},[eventD])
  return (
    <View style={{ flex: 1,   }}>
     <ImageBackground source={require('@/assets/images/nature.jpg')} style={{flex:1}}>


      {/* Calendar */}
     <Calendar
            style={{backgroundColor:'#9e0c0c88',marginTop:40}}
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              setModal(true);
              setForm(prevForm => ({
                ...prevForm,
                date: day.dateString
              }));
            }}
            enableSwipeMonths={true}
            markedDates={{
              [selectedDate]: { 
                selected: true, 
                selectedColor: '#00adf5',
                selectedTextColor: '#ffffff'
              },
            }}
            current={currentMonth}
            theme={{
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              arrowColor: '#00adf5',
              monthTextColor: '#00adf5',
              textMonthFontWeight: 'bold',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
            
            }}
            //minDate={new Date().toISOString().split('T')[0]} // Prevent past dates
          />
 {/* Month Buttons */}
        <View style={{height:70}}> 
      <ScrollView horizontal={true} style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 10 }}>
        {months.map((month) => {
          const monthName = new Date(month).toLocaleString('default', { month: 'short' });
          return (
            <TouchableOpacity
              key={month}
              onPress={() => setCurrentMonth(month)}
              style={[{
                padding: 5,
                margin: 3,
                backgroundColor: '#00adf5',
                borderRadius: 5,
              },currentMonth === month?{backgroundColor:'violet'}:{}]}
            >
              <Text style={{ color: 'white' }}>{monthName}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      </View>
      {/* Selected Date Info */}
      {selectedDate ? (
        <View style={{ marginTop: 20, padding: 15, backgroundColor: '#f0f0f0', marginHorizontal: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 16 }}>Selected Date: {selectedDate}</Text>
        </View>
      ) : null}
      <View >
        <View style={{backgroundColor:'lightgrey',margin:5,padding:5}}>
          <View style={{flexDirection:'row',gap:5,backgroundColor:'grey',padding:10}}>

          {
            dates.map((key,idx)=>(
              <TouchableOpacity onPress={()=>setEventD(key)} style={[styles.dateContainer,eventD === key?{backgroundColor:'violet'}:{}]} key={idx}>
                  <Text>{key.split('-')[2] } <Text style={{color:'green'}}> {new Date(2024,parseInt(key.split('-')[1])-1,1).toLocaleString('default',{month:'short'})}</Text></Text>
              </TouchableOpacity>
            ))
          }
          </View>

          <View style={{marginVertical:10,gap:2}}>

           { events.map((event,k) => (
            <View key={k} style={{backgroundColor:'white',padding:5}}>
              <Text style={{fontWeight:'bold',fontSize:16}}>{event.eventName}</Text>
              <View style={{marginLeft:20}}>
              <Text style={{color:'grey',fontWeight:'condensedBold'}}>{event.venue}</Text>
              <Text>{event.time}</Text>

              </View>

            </View>))}
             
              {modal &&
                <Modal visible={modal} 
                transparent
                onRequestClose={()=>setModal(false)}
                animationType="slide">
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <Text style={styles.title}>Event Details</Text>

                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Date</Text>
                          <TextInput 
                            style={styles.input}
                            placeholder="Select date"
                            value={form.date}
                            onChangeText={(text) => setForm({...form, date:text})}
                          />
                        </View>

                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Event</Text>
                          <TextInput 
                            style={styles.input}
                            placeholder="Event name"
                            value={form.eventName}
                            onChangeText={(text)=>setForm({...form, eventName:text})}
                          />
                        </View>

                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Venue</Text>
                          <TextInput 
                            style={styles.input}
                            placeholder="Venue location"
                            value={form.venue}
                            onChangeText={(text) => setForm({...form, venue:text})}
                          />
                        </View>
                         <View style={styles.inputContainer}>
                          <Text style={styles.label}>Time</Text>
                         <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                            <TextInput
                              style={styles.input}
                              placeholder="08:00"
                              value={form.time}
                              editable={false}
                              pointerEvents="none"
                            />
                          </TouchableOpacity>
                        </View>
                        {showTimePicker && (
                         <DateTimePicker
                            value={new Date()}
                            mode="time"
                            is24Hour={false}
                            display="default"
                            onChange={(event, selectedDate) => {
                              setShowTimePicker(false);
                              if (selectedDate) {
                                const hours = selectedDate.getHours();
                                const minutes = selectedDate.getMinutes();
                                const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
                                setForm({...form, time: formattedTime});
                              }
                            }}
                         
                         />
                          
                        )}

                        <View style={styles.buttonContainer}>
                          <Button title="Cancel" onPress={() => setModal(false)} />
                          <Button title="Save" onPress={handleSave} />
                        </View>
                      </View>
                    </View>
                  </Modal>
             
              }


          
          </View>
        </View>
      </View> 
      </ImageBackground>
    </View>
  );
};

export default MonthSelectorCalendar;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',

  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  timePickerModal: {
    justifyContent: 'center',
    alignItems:'center',
   flex:1,
    backgroundColor:'#rgba(91, 69, 69, 0.3)',
    
  },
  timeContainer:{
    height:100,
    width:300,

  },
  timeText:{
      fontSize:40,
      color:'grey'
  },
  dateContainer:
   {backgroundColor:'white',padding:3,borderRadius:2,borderColor:'pink',borderWidth:1}
  
});