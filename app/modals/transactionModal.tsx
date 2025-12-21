import { 
  StyleSheet, 
  Text, 
  View, 
  Modal, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native'
import React, { useState } from 'react'
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { insertTransaction } from '@/database/transactions'
const TransactionModal = ({ visible, onClose }) => {
  const [transaction, setTransaction] = useState({
    amount: '',
    description: '',
    type: 'expense', // 'expense' or 'income'
    date: new Date().toISOString().split('T')[0]
  })
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handleSubmit = () => {
    if (!transaction.amount || !transaction.description) {
      Alert.alert('Missing Fields', 'Please fill in all required fields')
      return
    }
    //onSubmit(transaction)
    insertTransaction(transaction)
    setTransaction({
      amount: '',
      description: '',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    })
    onClose()
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>New Transaction</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <AntDesign name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Transaction Type Selector */}
              <View style={styles.typeSelector}>
                <TouchableOpacity 
                  style={[
                    styles.typeButton, 
                    transaction.type === 'expense' && styles.expenseActive
                  ]}
                  onPress={() => setTransaction({...transaction, type: 'expense'})}
                >
                  <MaterialIcons 
                    name="money-off" 
                    size={24} 
                    color={transaction.type === 'expense' ? '#FFF' : '#FF6B6B'} 
                  />
                  <Text style={[
                    styles.typeText,
                    transaction.type === 'expense' && styles.typeTextActive
                  ]}>
                    Expense
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[
                    styles.typeButton, 
                    transaction.type === 'income' && styles.incomeActive
                  ]}
                  onPress={() => setTransaction({...transaction, type: 'income'})}
                >
                  <FontAwesome 
                    name="money" 
                    size={24} 
                    color={transaction.type === 'income' ? '#FFF' : '#06D6A0'} 
                  />
                  <Text style={[
                    styles.typeText,
                    transaction.type === 'income' && styles.typeTextActive
                  ]}>
                    Income
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Amount Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Amount</Text>
                <View style={styles.amountContainer}>
                  <Text style={styles.currencySymbol}>Ksh</Text>
                  <TextInput
                    style={styles.amountInput}
                    placeholder="0.00"
                    keyboardType="decimal-pad"
                    value={transaction.amount}
                    onChangeText={(text) => setTransaction({...transaction, amount: text})}
                  />
                </View>
              </View>

              {/* Description Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="What was this for?"
                  value={transaction.description}
                  onChangeText={(text) => setTransaction({...transaction, description: text})}
                />
              </View>

            

              {/* Date Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Date</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateContainer}>
                    <AntDesign name="calendar" size={20} color="#666" />
                  <TextInput
                    style={[styles.textInput, styles.dateInput]}
                    value={transaction.date}
                    onChangeText={(text) => setTransaction({...transaction, date: text})}
                    placeholder="YYYY-MM-DD"
                    editable={false}
                    onPressIn={() => setShowDatePicker(true)}
                  />
                  {showDatePicker && (
                    <DateTimePicker
                      value={transaction.date ? new Date(transaction.date) : new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(false)
                        if (selectedDate) {
                          const dateString = selectedDate.toISOString().split('T')[0]
                          setTransaction({...transaction, date: dateString})
                        }
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>

             
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={onClose}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.submitButton,
                  transaction.type === 'expense' 
                    ? { backgroundColor: '#6560cbff' } 
                    : { backgroundColor: '#7e8519ff' }
                ]}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>
                  {transaction.type === 'expense' ? 'Add Expense' : 'Add Income'}
                </Text>
               
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default TransactionModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#da4141ff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  closeButton: {
    padding: 5,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    padding: 5,
    marginBottom: 25,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  expenseActive: {
    backgroundColor: '#6560cbff',
  },
  incomeActive: {
    backgroundColor: '#7e8519ff',
  },
  typeText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#666',
  },
  typeTextActive: {
    color: '#FFF',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    paddingHorizontal: 20,
    height: 60,
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginRight: 10,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: '700',
    color: '#075e27ff',
  },
  textInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#12077aff',
  },
  categoryScroll: {
    marginHorizontal: -5,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 5,
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 100,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  dateInput: {
    flex: 1,
    marginLeft: 10,
  },
  notesInput: {
    minHeight: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 15,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  submitButton: {
    flex: 2,
    flexDirection: 'row',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
})