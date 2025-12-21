import { insertInvestment, insertPlatform } from '@/database/transactions';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';

interface InvestModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}



const InvestmentModal = ({ modalVisible, setModalVisible }: InvestModalProps) => {
  const [form, setForm] = React.useState({
    platformName: '',
    amount: '',
    date: '',
  });
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleSubmit = async () => {
    if (!form.platformName || !form.amount || !form.date) {
      alert('Please fill in all fields');
      return;
    }


     

      insertInvestment(form);
      
      // Reset form and close modal
      setForm({
        platformName: '',
        amount: '',
        date: '',
      });
      setModalVisible(false);
      

  
  };

  return (
    <View>
      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={handleCloseModal}
        transparent={true}
        statusBarTranslucent={true}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Add Investment Platform</Text>
                  <TouchableOpacity
                    onPress={handleCloseModal}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.modalBody}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Platform Name</Text>
                    <TextInput
                      placeholder="e.g., Ziidi"
                      style={styles.input}
                      value={form.platformName}
                      onChangeText={(text) => setForm({...form, platformName: text})}
                      placeholderTextColor="#999"
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}> Amount</Text>
                    <TextInput
                      placeholder="Enter  amount"
                      keyboardType='numeric'
                      style={styles.input}
                      value={form.amount}
                      onChangeText={(text) => setForm({...form, amount: text})}
                      placeholderTextColor="#999"
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Date </Text>

                    <TextInput
                      placeholder="Enter date"
                      style={styles.input}
                      keyboardType='numeric'
                      value={form.date}
                      onChangeText={(text) => setForm({...form, date: text})}
                      placeholderTextColor="#999"
                      onPress={()=>setShowDatePicker(true)}
                    />

                    {
                        showDatePicker && (
                            <DateTimePicker
                                value={new Date()}
                                mode='date'
                                display='default'
                                onChange={(event, selectedDate) => {
                                    const currentDate = selectedDate || new Date();
                                    setShowDatePicker(false);
                                    setForm({...form, date: currentDate.toISOString().split('T')[0]});
                                }}
                            />
                        )
                    }
                  </View>
                </View>
                
                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleCloseModal}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.button, styles.investButton]} 
                    onPress={handleSubmit}
                  >
                    <Text style={styles.investButtonText}>Add Platform</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default InvestmentModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
    lineHeight: 28,
  },
  modalBody: {
    padding: 20,
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  investButton: {
    backgroundColor: '#007AFF', // Professional blue color
  },
  investButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});