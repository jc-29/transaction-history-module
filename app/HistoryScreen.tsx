import { View, Text, Image, TouchableOpacity, ScrollView, Alert, RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import TransactionDetails from './TransactionDetails';
import { Transaction } from '../types/Transaction';

export default function HistoryScreen() {

    const [data, setData] = useState<Transaction[]>([
        {
          amount: 150,
          date: "2024-01-02",
          description: "Payment to Jane Smith",
          type: 1,
          location: 'Manhattan',
          category: 'Services'
        },
        {
          amount: 200,
          date: "2024-01-05",
          description: "Refund from Store A",
          type: 2,
          location: 'Texas',
          category: 'Food & Beverage'
        },
        {
          amount: 75,
          date: "2024-01-10",
          description: "Payment to Alex Johnson",
          type: 1,
          location: 'New York',
          category: 'Services'
        },
        {
          amount: 300,
          date: "2024-01-15",
          description: "Invoice #123 Payment",
          type: 1,
          location: 'Kuala Lumpur',
          category: 'Services'
        },
        {
          amount: 50,
          date: "2024-01-18",
          description: "Refund from Vendor B",
          type: 2,
          location: 'Kuala Lumpur',
          category: 'Food & Beverage'
        },
        {
          amount: 90,
          date: "2024-01-20",
          description: "Payment to Mary Lee",
          type: 1,
          location: 'Kuala Lumpur',
          category: 'Charity'
        },
        {
          amount: 180,
          date: "2024-01-22",
          description: "Payment to Daniel Craig",
          type: 1,
          location: 'Negeri Sembilan',
          category: 'Charity'
        },
        {
          amount: 125,
          date: "2024-01-25",
          description: "Refund from Store C",
          type: 2,
          location: 'Terengganu',
          category: 'Furniture'
        },
        {
          amount: 60,
          date: "2024-01-28",
          description: "Payment to Sarah Connor",
          type: 1,
          location: 'Perak',
          category: 'Entertainment'
        },
        {
          amount: 220,
          date: "2024-02-01",
          description: "Refund from Vendor D",
          type: 2,
          location: 'Kedah',
          category: 'Ticketing'
        },
        {
          amount: 350,
          date: "2024-02-05",
          description: "Invoice #456 Payment",
          type: 1,
          location: 'Penang',
          category: 'Services'
        },
        {
          amount: 80,
          date: "2024-02-08",
          description: "Payment to Jack Ryan",
          type: 1,
          location: 'Las Vegas',
          category: 'Furniture'
        },
        {
          amount: 95,
          date: "2024-02-10",
          description: null,
          type: 2,
          location: 'Beijing',
          category: 'Insurance'
        },
        {
          amount: 250,
          date: "2024-02-15",
          description: "Payment to Emma Watson",
          type: 1,
          location: 'Bali',
          category: 'Medical'
        },
        {
          amount: 175,
          date: "2024-02-18",
          description: "Payment to Robert Downey",
          type: 1,
          location: 'Vietnam',
          category: 'Medical'
        },
        {
          amount: 140,
          date: "2024-02-20",
          description: "Refund from Store F",
          type: 2,
          location: 'Malacca',
          category: 'IT Equipment'
        },
        {
          amount: 310,
          date: "2024-02-25",
          description: "Invoice #789 Payment",
          type: 1,
          location: 'Singapore',
          category: 'Services'
        },
        {
          amount: 45,
          date: "2024-02-28",
          description: null,
          type: 2,
          location: 'Kuala Lumpur',
          category: 'Food & Beverage'
        },
        {
          amount: 100,
          date: "2024-03-01",
          description: "Payment to Monica Geller",
          type: 1,
          location: 'Bangkok',
          category: 'E-hailing'
        },
        {
          amount: 190,
          date: "2024-03-05",
          description: "Payment to Chandler Bing",
          type: 1,
          location: 'Ho Chi Minh City',
          category: 'Online Shopping'
        }
      ]
      );
      const [isReveal, setIsReveal] = useState(-1); // -1 means no sensitive transaction data is revealed, otherwise it's the index of the transaction
      const [refreshing, setRefreshing] = useState(false);
      const [viewTransaction, setViewTransaction] = useState(false);
      const [transactionData, setTransactionData] = useState<Transaction>({
        amount: 0,
        date: "",
        description: "",
        type: 1,
        location: '',
        category: ''
      });
      const onRefresh = useCallback(() => { // refreshing adds a new transaction to the data array
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
          setData((prevData) => [
            ...prevData, // spreading the previous data
            {
                amount: 250,
                date: "2024-03-10",
                description: "Payment to Rachel Green",
                type: 1,
                location: 'Singapore',
                category: 'Online Shopping'
            },
        ]);
        }, 2000);    
      }, []);

      const handleReveal = async (index: number) => {
        // Note: This example is intended to only reveal the content for one transaction at a time.

        if (isReveal == index) { // hide the content if it's already revealed
            setIsReveal(-1);
            return;
        }
        try {
            const result = await LocalAuthentication.authenticateAsync({
              promptMessage: 'Authenticate to view transaction details',
              fallbackLabel: 'Enter Password',
              disableDeviceFallback: false,
            });
      
            if (result.success) {
              setIsReveal(index);
            } else {  
              Alert.alert('Error', 'Authentication failed or canceled.');
            }
          } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred.');
            console.error(error);
          }
      };

      const handlePress = (index: number) => {
        setViewTransaction(true);
        setTransactionData(data[index]);
      };

    return <View className='w-screen h-screen justify-center bg-black pt-20 pb-10'>
        <Text className='text-white text-3xl font-bold mb-5 text-center'>Transaction History</Text>
        <View className='relative flex flex-row items-center'>
            <Text className='text-white mb-1 ml-2 text-lg font-bold'>Count: {data.length}</Text>
            <Text className='text-white text-center mb-1 absolute left-1/2 -translate-x-1/2'>Pull down to refresh...</Text>
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} className='w-full px-3 overflow-y-auto border border-gray-500 rounded-lg'>
            {data.map((item, index) => {
                return <View key={index} className='w-full flex flex-row justify-between items-center border-b border-gray-500 py-3'>
                    <TouchableOpacity onPress={() => handlePress(index)} className='flex flex-col'>
                        <Text className='text-white text-lg'><Text className='font-semibold'>Amount:</Text> <Text>{isReveal == index ? item.amount : '***'}</Text></Text>
                        <Text className='text-white text-lg'><Text className='font-semibold'>Date:</Text> {item.date}</Text>
                        <Text className='text-white text-lg'><Text className='font-semibold'>Description:</Text> {item.description}</Text>
                        <Text className='text-white text-lg'><Text className='font-semibold'>Type:</Text> {item.type == 1 ? 'Debit' : 'Credit'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='size-7 mr-10' onPress={() => handleReveal(index)}>
                        <Image source={require('../images/view-hidden.png')} className='size-full'  />
                    </TouchableOpacity>
                </View>
            })}
        </ScrollView>
            {viewTransaction && <TransactionDetails data={transactionData} setViewTransaction={setViewTransaction} setTransactionData={setTransactionData} />}
    </View>
};