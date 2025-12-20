import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import React, { useEffect, useRef, useState } from 'react';
import {  week } from '../../modules/task';
import { MaterialIcons } from '@expo/vector-icons';
import { deleteTodos, editTodos, getDays, getTodos, insertDay, updateDay } from '@/database/db';
import Modalform from '../modal';
const Index = () => {
 const [edit, setEdit] = useState(false);
 const [editDay, setEditDay] = useState(false);
 const [add, setAdd] = useState(false);
const [day, setDay] = useState('Monday');
const [data, setData] = useState([]);
const [timtable, setTimetable] = useState([]);
const [dayModal,setDayModal] = useState(false);
const [dayForm,setDayForm] = useState({
  time:'',
  event:'',
  venue:''
});
  async function fetchData(){
      const data=await getTodos();
      setData(data);
      
    }

  useEffect(()=>{
  
    fetchData();
  },[add,edit])

  useEffect(()=>{
  const date = new Date();
  const dey = date.getDay();

  switch (dey) {
    case 1:
      setDay('Monday')
      break;
  case 2:
      setDay('Tuesday')
      break;
  case 3:
      setDay('Wednesday')
      break
  case 4:
      setDay('Thursday')
      break;
  case 5:
      setDay('Friday')
      break;
    default:
      break;
  }
  },[])

  useEffect(()=>{
     async function fecthDay() {
     const res = await getDays(day)
      setTimetable(res)
    }
    fecthDay();
  },[day,editDay])
  const [image, setImage] = useState(require('../../assets/images/est.webp'));
  const [bg, setBg] = useState('white');
  const [quote, setQuote] = useState(
    'Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.'
  );

  const [selectedTask, setSelectedTask] = useState(null);
  const [form, setForm] = useState({
    id:'',
    title: '',
    description: '',
    priority: '',
    status: '',
    time: '',
  });
  const [dayEditForm,setDayEditForm]=useState({
    id: '',
    time:'',
    event:'',
    venue:''
  })

  const images = [
    require('../../assets/images/elon.webp'),
    require('../../assets/images/falcon.webp'),
    require('../../assets/images/est.webp'),
  ];

  const currentIndex = useRef(0);
  const changeImageAndQuote = () => {
    const index = currentIndex.current;
    setImage(images[index]);

    switch (index) {
      case 0:
        setQuote(
          'When something is important enough, you do it even if the odds are not in your favor.'
        );
        setBg('white');
        break;
      case 1:
        setQuote(
          'Failure is an option here. If things are not failing, you are not innovating enough.'
        );
        setBg('lightblue');
        break;
      case 2:
        setQuote(
          'Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.'
        );
        setBg('lightgreen');
        break;
    }
    currentIndex.current = (index + 1) % images.length;
  };

  useEffect(() => {
    const interval = setInterval(changeImageAndQuote, 5000);
    return () => clearInterval(interval);
  }, []);

  const openEditModal = (taskItem:any) => {
    setSelectedTask(taskItem);
    setForm({
      id: taskItem.id,
      title: taskItem.title,
      description: taskItem.description,
      priority: taskItem.priority || '',
      status:taskItem.status || '',
      time:taskItem.time || '',

    });
    setEdit(true);
  };

  const closeModal = () => {
    setEdit(false);
    setSelectedTask(null);
  };

  const handleSubmit = () => {
    editTodos(form)
    closeModal();
  };

  const markAsDone=(taskItem:any)=>{
    setForm({
      id: taskItem.id,
      title: taskItem.title,
      description: taskItem.description,
      priority: taskItem.priority || '',
      status:'completed',
      time:taskItem.time || '',

    });
    editTodos(form);
    fetchData();
  }
  const deleteTask=(id:any)=>{

      Alert.alert("Confirm delete","Are you sure you want to delete this task?",[{text:'Cancel',style:'cancel'},{text:'Delete',style:'destructive',onPress:async () => {
        deleteTodos(id);
        fetchData();

      }}])

      
  }

  const submitDay=(form:any)=>{

    if (!form.time.trim() || !form.venue.trim() || !form.event.trim()){
      alert('All fields are required')
      return;
    }
      insertDay(day,form);
      setDayModal(false)
      setDayForm({
          time:'',
          event:'',
          venue:''
        });
  }
  const handleEditDay =(dayItem:any)=>{
      setDayEditForm({
        id:dayItem.id,
        time:dayItem.time,
        event:dayItem.event,
        venue:dayItem.venue
      })
      setEditDay(true);
  }
const submitEditDay=(form:any)=>{
    updateDay(day,form);
    setEditDay(false);    
}

  return (
    <ScrollView>
      
      <View style={styles.top_banner}>
        <View style={[styles.top_banner_box, { backgroundColor: bg }]}>
          <Image source={image} style={styles.image} />
          <Text style={styles.quote}>{quote}</Text>
        </View>
      </View>

      <View>
        <View style={styles.todays_tasks}>
          <Text>Today&apos;s Tasks</Text>

          <View style={styles.task}>
            {data.map((taskItem) => (
              <View key={taskItem.id} style={styles.task_item}>
                <Text style={[styles.task_title,taskItem.status === 'completed'?{textDecorationLine:'line-through'}:{}]}>{taskItem.title}</Text>
                <Text style={[styles.task_description,taskItem.status === 'completed'?{textDecorationLine:'line-through'}:{}]}>
                  {taskItem.description}
                </Text>
                <Text style={styles.task_time}>{taskItem.time}</Text>

                <View style={styles.action_buttons}>
                  <MaterialIcons 
                  name="delete"
                   size={15} 
                   color="red"
                   onPress={()=>deleteTask(taskItem.id)}
                   />
                  <MaterialIcons name="done" 
                  size={15} color="green"
                  onPress={()=>markAsDone(taskItem)}
                   />
                  <MaterialIcons
                    name="edit"
                    size={15}
                    color="blue"
                    onPress={() => openEditModal(taskItem)}
                  />
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.add} onPress={()=>{setAdd(prev=>!prev)}} >
              <MaterialIcons name='add' size={24} color={'red'}/>
          </TouchableOpacity>
        </View>
          </View>
          {
          add?
          <Modalform setModal={setAdd} modal={add}/>:
          <></>
          }
        <Modal
          animationType="slide"
          transparent
          visible={edit}
          onRequestClose={closeModal}
        >
          <View style={styles.modal}>
            <View style={styles.modal_header}>
              <Text style={styles.modal_text}>Edit task</Text>
              <MaterialIcons name="close" size={24} onPress={closeModal} />
            </View>

            <View style={styles.divider} />

            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={form.title}
              onChangeText={(text) =>
                setForm({ ...form, title: text })
              }
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={form.description}
              onChangeText={(text) =>
                setForm({ ...form, description: text })
              }
            />

            <Text style={styles.label}>Priority</Text>
            <TextInput
              style={styles.input}
              value={form.priority}
              onChangeText={(text) =>
                setForm({ ...form, priority: text })
              }
            />
             <Text style={styles.label}>Status</Text>
            <TextInput
              style={styles.input}
              value={form.status}
              onChangeText={(text) =>
                setForm({ ...form, status: text })
              }
            />
             <Text style={styles.label}>Time</Text>
            <TextInput
              style={styles.input}
              value={form.time}
              onChangeText={(text) =>
                setForm({ ...form, time: text })
              }
            />

            <TouchableOpacity
              style={styles.submit_btn}
              onPress={handleSubmit}
            >
              <Text style={styles.submit_text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={styles.actions_container}>
          <Text>Actions Tab</Text>

          <View style={styles.actions_row}>
            <TouchableOpacity style={styles.action_tab}>
              <Text>Weekly goals</Text>
              <MaterialIcons name="event" size={20} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.action_tab}>
              <Text>Monthly goals</Text>
              <MaterialIcons name="calendar-view-month" size={20} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.action_tab}>
              <Text>Yearly goals</Text>
              <MaterialIcons name="timeline" size={20} />
            </TouchableOpacity>
        </View>
        </View>

       <View style={{backgroundColor:'white'}}>
            <View  style={{flexDirection:'row',justifyContent:'space-between'}}>

        {
          Object.keys(week).map((key,idx)=>(
               <TouchableOpacity key={idx} style={[styles.day,day === key?{backgroundColor:'violet'}:{} ]} onPress={()=>setDay(key)}>
                 <Text>{key.slice(0,3)}</Text>
                  <Text>{week[key]}  {new Date().toLocaleString('default',{month:'short'})}</Text>
                </TouchableOpacity>
          ))
        }
        </View>
         
        <View style={{backgroundColor:'lightgrey',margin:5,padding:5}}>
          <View style={{flexDirection:'row'}}>
          <Text style={{marginHorizontal:'auto',fontSize:20,color:'blue',fontWeight:'bold'}}>{day}</Text>
          <TouchableOpacity onPress={()=>setDayModal(true)} style={{}} ><MaterialIcons color={'green'} name='add' size={24}/></TouchableOpacity>
          {dayModal ?<Modal
            animationType='fade'
            visible={dayModal}
            transparent
            onRequestClose={()=>setDayModal(false)}
            
          >
            <View style ={styles.dayModal}>
              <Text style={{marginHorizontal:'auto',marginTop:20,marginBottom:5, fontSize:23,textDecorationLine:'underline'}}>{day}</Text>
              <View style={styles.dayBlock}>
                <Text style = {{fontWeight:'bold'}}>Time</Text>
                <TextInput 
                placeholder='7 - 10' 
                style={styles.dayInput} 
                value={dayForm.time}
                onChangeText={(text)=>setDayForm({...dayForm,time:text})}
                />
              </View>
              <View style={styles.dayBlock}>
                <Text style = {{fontWeight:'bold'}}>Event</Text>
                <TextInput 
                placeholder='Computer programming 1' 
                style={styles.dayInput}
                value={dayForm.event}
                onChangeText={(text)=>setDayForm({...dayForm,event:text})}
                 />
              </View>
              <View style={styles.dayBlock}>
                <Text style = {{fontWeight:'bold'}}>Venue</Text>
                <TextInput 
                placeholder='NCLB 04' 
                style={styles.dayInput} 
                value={dayForm.venue}
                onChangeText={(text)=>setDayForm({...dayForm,venue:text})}
                />
              </View>
              <TouchableOpacity onPress={()=>submitDay(dayForm)} style={styles.daySave}><Text>Save</Text></TouchableOpacity>
            </View>
          </Modal> : <></>}
           {editDay ?<Modal
            animationType='fade'
            visible={editDay}
            transparent
            onRequestClose={()=>setEditDay(false)}
            
          >
            <View style ={styles.dayModal}>
              <Text style={{marginHorizontal:'auto',marginTop:20,marginBottom:5, fontSize:23,textDecorationLine:'underline'}}>{day}</Text>
              <View style={styles.dayBlock}>
                <Text style = {{fontWeight:'bold'}}>Time</Text>
                <TextInput 
                placeholder='7 - 10' 
                style={styles.dayInput} 
                value={dayEditForm.time}
                onChangeText={(text)=>setDayEditForm({...dayEditForm,time:text})}
                />
              </View>
              <View style={styles.dayBlock}>
                <Text style = {{fontWeight:'bold'}}>Event</Text>
                <TextInput 
                placeholder='Computer programming 1' 
                style={styles.dayInput}
                value={dayEditForm.event}
                onChangeText={(text)=>setDayEditForm({...dayEditForm,event:text})}
                 />
              </View>
              <View style={styles.dayBlock}>
                <Text style = {{fontWeight:'bold'}}>Venue</Text>
                <TextInput 
                placeholder='NCLB 04' 
                style={styles.dayInput} 
                value={dayEditForm.venue}
                onChangeText={(text)=>setDayEditForm({...dayEditForm,venue:text})}
                />
              </View>
              <TouchableOpacity onPress={()=>submitEditDay(dayEditForm)} style={styles.daySave}><Text>Update</Text></TouchableOpacity>
            </View>
          </Modal> : <></>}
          </View>
          {
            timtable.map((item)=>(
              <View style={{backgroundColor:'white'}} key={item.id}>
              <TouchableOpacity onPress={()=>handleEditDay(item)} style={{flexDirection:'row',gap:10,padding:6}}>
                
                  <Text style={{color:'red'}}><Text style={{color:'black'}}>Time: </Text>{item.time}</Text>
                  
                  <Text><Text style={{color:'grey'}}>Class: </Text>{item.event}</Text>
                  <Text><Text style={{color:'red'}}>Venue: </Text>{item.venue}</Text>
              </TouchableOpacity>
              <View style={{width:'100%',height:1,backgroundColor:'purple',}}></View>
              </View>
            ))
          }
         
            
          
        </View>
       </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  top_banner: {
    height: 180,
    width: '100%',
    backgroundColor: 'orange',
  },
  top_banner_box: {
    marginTop: 50,
    marginHorizontal: 10,
    height: 100,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 5,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  quote: {
    fontSize: 16,
    width: '60%',
  },
  todays_tasks: {
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: 'tomato',
    borderRadius: 10,
    padding: 10,
    position:'relative'
  },
  task: {
    marginTop: 10,
  },
  task_item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  task_title: {
    fontSize: 16,
    fontWeight: '600',
  },
  task_description: {
    fontSize: 14,
    color: '#555',
  },
  task_time: {
    fontSize: 12,
    color: '#999',
  },
  action_buttons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },
  modal: {
    height: '100%',
    marginTop: 90,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'pink',
    padding: 20,
  },
  modal_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modal_text: {
    fontSize: 23,
  },
  divider: {
    height: 2,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'green',
    padding: 10,
    marginVertical: 5,
  },
  submit_btn: {
    backgroundColor: 'lightgreen',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  submit_text: {
    fontSize: 20,
  },
  actions_container: {
    backgroundColor: 'red',
    margin: 20,
    padding: 10,
  },
  actions_row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  action_tab: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  timetable: {
    resizeMode: 'stretch',
    height: 100,
    marginHorizontal: 10,
    width: '95%',
  },
  day:{
    backgroundColor:'lightgrey',
    margin:5,
    width:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:4,
    shadowColor:'black',
    shadowOffset:{width:0,height:2},
    elevation:1,
    shadowOpacity:0.8,
    textShadowRadius:2,
  
  },
  add:{
      backgroundColor:'blue',
      width:40,
      height:40,
      borderRadius:20,
      alignItems:'center',
      justifyContent:'center',
      left:270,
      bottom:0,
      position:'absolute',
      zIndex:1,
  },
  dayModal:{
      backgroundColor:'lightgrey',
      marginVertical:'auto',
      marginHorizontal:10,
      borderRadius:12,
      borderWidth:2,
      borderColor:'blue'
  },
  dayInput:{
    borderWidth:1,
    borderColor:'indigo',
    height:40,
    width:'100%'
  },
  dayBlock:{
      backgroundColor:'white',
      marginHorizontal:10,
      padding:7,
      marginVertical:5,
  },
  daySave:{
      marginHorizontal:'auto',
      marginVertical:10,
      backgroundColor:'tomato',
      width:'60%',
      justifyContent:'center',
      alignItems:'center',
      padding:10,
      borderRadius:10

  }
});
