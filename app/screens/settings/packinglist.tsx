import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  getPackingTrips,
  insertPackingTrip,
  getPackingItems,
  insertPackingItem,
  togglePackedItem,
  deletePackingItem,
} from '@/database/personal';

const PackingList = () => {
  // trips
  const [trips, setTrips] = useState([]);
  const [activeTrip, setActiveTrip] = useState(null);

  // items
  const [items, setItems] = useState([]);

  // modal states
  const [tripModal, setTripModal] = useState(false);
  const [itemModal, setItemModal] = useState(false);

  // form
  const [tripName, setTripName] = useState('');
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  // reload trigger
  const [dataVersion, setDataVersion] = useState(0);
  const triggerReload = () => setDataVersion(v => v + 1);

  /* ---------------- FETCH DATA ---------------- */

  useEffect(() => {
    const fetchTrips = async () => {
      const data = await getPackingTrips();
      setTrips(data);
      if (!activeTrip && data.length > 0) {
        setActiveTrip(data[0]);
      }
    };
    fetchTrips();
  }, [dataVersion]);

  useEffect(() => {
    if (!activeTrip) return;

    const fetchItems = async () => {
      const data = await getPackingItems(activeTrip.id);
      setItems(data);
    };
    fetchItems();
  }, [activeTrip, dataVersion]);

  /* ---------------- ACTIONS ---------------- */

  const addTrip = async () => {
    if (!tripName.trim()) return;
    await insertPackingTrip(tripName);
    setTripName('');
    setTripModal(false);
    triggerReload();
  };

  const addItem = async () => {
    if (!itemName.trim() || !activeTrip) return;

    await insertPackingItem({
      item: itemName,
      quantity: quantity || 1,
      tripId: activeTrip.id,
    });

    setItemName('');
    setQuantity('');
    setItemModal(false);
    triggerReload();
  };

  const handleTogglePacked = async (item) => {
    await togglePackedItem(item.id, !item.packed);
    triggerReload();
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete item',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deletePackingItem(id);
            triggerReload();
          },
        },
      ]
    );
  };

  /* ---------------- PROGRESS ---------------- */

  const packedCount = items.filter(i => i.packed).length;
  const progress =
    items.length === 0 ? 0 : Math.round((packedCount / items.length) * 100);

  /* ---------------- RENDER ---------------- */

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemCard,
        item.packed && styles.packedCard,
      ]}
      onPress={() => handleTogglePacked(item)}
      onLongPress={() => handleDelete(item.id)}
    >
      <Text
        style={[
          styles.itemText,
          item.packed && styles.packedText,
        ]}
      >
        {item.item} (x{item.quantity})
      </Text>

      <MaterialCommunityIcons
        name={item.packed ? 'check-circle' : 'checkbox-blank-circle-outline'}
        size={22}
        color={item.packed ? 'green' : 'grey'}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Packing List</Text>
        <TouchableOpacity onPress={() => setTripModal(true)}>
          <MaterialCommunityIcons name="plus-circle" size={28} color="green" />
        </TouchableOpacity>
      </View>

      {/* TRIPS */}
      <FlatList
        horizontal
        data={trips}
        keyExtractor={item => item.id.toString()}
        style={{ maxHeight: 50 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.tripChip,
              activeTrip?.id === item.id && styles.activeTrip,
              {alignItems:'center',justifyContent:'center'}
            ]}
            onPress={() => setActiveTrip(item)}
          >
            <Text style={{ color: 'white' }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* PROGRESS */}
      <Text style={styles.progress}>
        Packed: {packedCount}/{items.length} ({progress}%)
      </Text>

      {/* ITEMS */}
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items yet</Text>
        }
      />

      {/* ADD ITEM BUTTON */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setItemModal(true)}
      >
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>

      {/* ADD TRIP MODAL */}
      <Modal visible={tripModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>New Trip</Text>
            <TextInput
              placeholder="Trip name"
              value={tripName}
              onChangeText={setTripName}
              style={styles.input}
            />
            <TouchableOpacity style={styles.saveBtn} onPress={addTrip}>
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ADD ITEM MODAL */}
      <Modal visible={itemModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add Item</Text>
            <TextInput
              placeholder="Item name"
              value={itemName}
              onChangeText={setItemName}
              style={styles.input}
            />
            <TextInput
              placeholder="Quantity"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              style={styles.input}
            />
            <TouchableOpacity style={styles.saveBtn} onPress={addItem}>
              <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PackingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fa',
    paddingTop: 40,
  },
  header: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
    marginBottom:10
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tripChip: {
    backgroundColor: 'grey',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTrip: {
    backgroundColor: 'green',
  },
  progress: {
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '600',
  },
  itemCard: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  packedCard: {
    backgroundColor: '#e6ffe6',
  },
  itemText: {
    fontSize: 16,
  },
  packedText: {
    textDecorationLine: 'line-through',
    color: 'grey',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: 'grey',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: 'green',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: 'white',
    width: '85%',
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  saveBtn: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
