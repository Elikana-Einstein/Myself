import { insertPlatform } from '@/database/transactions';
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


const InvestModal = ({ modalVisible, setModalVisible }: InvestModalProps) => {
  const handleCloseModal = () => {
    setModalVisible(false);
  };

const [form, setForm] = React.useState({
    platformName: '',
    targetAmount: '',
    duration: '',
});

const handleSubmit = async () => {

    if(!form.platformName || !form.targetAmount || !form.duration) {
        alert('Please fill in all fields');
        return;
    }
    const res = await insertPlatform(form);
    if (res) {
        alert('Platform with that name already exists');
        return;
    }
    
    setModalVisible(false);
    setForm({
        platformName: '',
        targetAmount: '',
        duration: '',
    });
  }

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
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Investment Platforms</Text>
                  <TouchableOpacity
                    onPress={handleCloseModal}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
                
                {/* Add your investment form/content here */}
                <View style={styles.modalBody}>
                 <View>
                    <Text>Platform Name</Text>
                    <TextInput
                        placeholder="Enter platform name"
                        style={styles.input}
                        value={form.platformName}
                        onChangeText={(text) => setForm({...form, platformName: text})}
                    />
                 </View>
                    <View>
                        <Text>Target amount</Text>
                        <TextInput
                            placeholder="Enter target amount"
                            keyboardType='numeric'
                            style={styles.input}
                            value={form.targetAmount}
                            onChangeText={(text) => setForm({...form, targetAmount: text})}
                        />
                    </View>
                     <View>
                        <Text>Duration</Text>
                        <TextInput
                            placeholder="Enter duration in months"
                            keyboardType='numeric'
                            style={styles.input}
                            value={form.duration}
                            onChangeText={(text) => setForm({...form, duration: text})}
                        />
                    </View>
                </View>
                
                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleCloseModal}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, styles.investButton]} onPress={handleSubmit}>
                    <Text style={styles.investButtonText}>Add</Text>
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

export default InvestModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#a3a9ecff',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    width: '90%',
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
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#d04141ff',
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
    backgroundColor: '#dbd167ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
    lineHeight: 28,
  },
  modalBody: {
    marginVertical: 20,
    gap: 15,
  },
  bodyText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e4c18dff',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
  },
  investButton: {
    backgroundColor: '#e03fecff',
  },
  investButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
    input: {
    borderWidth: 1,
    borderColor: '#e12f0bff',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#fff',},
});