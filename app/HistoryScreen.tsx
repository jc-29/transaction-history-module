import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { SvgUri } from 'react-native-svg';

export default function HistoryScreen() {

    const [data, setData] = useState([
        {
          amount: 150,
          date: "2024-01-02",
          description: "Payment to Jane Smith",
          type: 1,
        },
        {
          amount: 200,
          date: "2024-01-05",
          description: "Refund from Store A",
          type: 2,
        },
        {
          amount: 75,
          date: "2024-01-10",
          description: "Payment to Alex Johnson",
          type: 1,
        },
        {
          amount: 300,
          date: "2024-01-15",
          description: "Invoice #123 Payment",
          type: 1,
        },
        {
          amount: 50,
          date: "2024-01-18",
          description: "Refund from Vendor B",
          type: 2,
        },
        {
          amount: 90,
          date: "2024-01-20",
          description: "Payment to Mary Lee",
          type: 1,
        },
        {
          amount: 180,
          date: "2024-01-22",
          description: "Payment to Daniel Craig",
          type: 1,
        },
        {
          amount: 125,
          date: "2024-01-25",
          description: "Refund from Store C",
          type: 2,
        },
        {
          amount: 60,
          date: "2024-01-28",
          description: "Payment to Sarah Connor",
          type: 1,
        },
        {
          amount: 220,
          date: "2024-02-01",
          description: "Refund from Vendor D",
          type: 2,
        },
        {
          amount: 350,
          date: "2024-02-05",
          description: "Invoice #456 Payment",
          type: 1,
        },
        {
          amount: 80,
          date: "2024-02-08",
          description: "Payment to Jack Ryan",
          type: 1,
        },
        {
          amount: 95,
          date: "2024-02-10",
          description: "Refund from Vendor E",
          type: 2,
        },
        {
          amount: 250,
          date: "2024-02-15",
          description: "Payment to Emma Watson",
          type: 1,
        },
        {
          amount: 175,
          date: "2024-02-18",
          description: "Payment to Robert Downey",
          type: 1,
        },
        {
          amount: 140,
          date: "2024-02-20",
          description: "Refund from Store F",
          type: 2,
        },
        {
          amount: 310,
          date: "2024-02-25",
          description: "Invoice #789 Payment",
          type: 1,
        },
        {
          amount: 45,
          date: "2024-02-28",
          description: "Refund from Vendor G",
          type: 2,
        },
        {
          amount: 100,
          date: "2024-03-01",
          description: "Payment to Monica Geller",
          type: 1,
        },
        {
          amount: 190,
          date: "2024-03-05",
          description: "Payment to Chandler Bing",
          type: 1,
        }
      ]
      );
      const [isReveal, setIsReveal] = useState(-1); // -1 means no sensitive transaction data is revealed, otherwise it's the index of the transaction

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

    return <View className='w-scrreen h-screen justify-center bg-black pt-20 pb-10'>
        <Text className='text-white text-3xl font-bold mb-5 text-center'>Transaction History</Text>
        <ScrollView className='w-full px-3 overflow-y-auto border border-gray-500 rounded-lg'>
            {data.map((item, index) => {
                return <View key={index} className='w-full flex flex-row justify-between items-center border-b border-gray-500 py-3'>
                    <TouchableOpacity className='flex flex-col'>
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

    </View>
};