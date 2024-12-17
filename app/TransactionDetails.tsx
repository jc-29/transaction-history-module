import { View, Text, TouchableOpacity } from 'react-native';
import { Transaction } from '../types/Transaction';
import { useEffect, useState } from 'react';

export default function TransactionDetails({data, setViewTransaction} : {data: Transaction, setViewTransaction: Function}) {
    const [slideIn, setSlideIn] = useState(false); // for slide in animation
    useEffect(() => {
        setSlideIn(true); // trigger slide in animation
    }, []);
    return (
    <View className={`w-screen h-screen bg-black absolute top-0 left-0 pt-20 pb-10 transition-transform duration-200 ease-in-out ${slideIn ? 'translate-y-0' : ' translate-y-96'}`}>
        <Text className='text-center font-bold text-3xl text-white mb-5'>Transaction Details</Text>
        <View className='w-full px-5 flex justify-center'>
            <View className='flex flex-col gap-1 border rounded-lg border-gray-500 p-2 shadow-default'>
                <Text className='text-white text-lg'><Text className='font-semibold'>Amount:</Text> {data.amount}</Text>
                <Text className='text-white text-lg'><Text className='font-semibold'>Date:</Text> {data.date}</Text>
                <Text className='text-white text-lg'><Text className='font-semibold'>Description:</Text> {data.description == null ? '-' : data.description}</Text>
                <Text className='text-white text-lg'><Text className='font-semibold'>Type:</Text> {data.type == 1 ? 'Debit' : 'Credit'}</Text>
                <Text className='text-white text-lg'><Text className='font-semibold'>Location:</Text> {data.location}</Text>
                <Text className='text-white text-lg'><Text className='font-semibold'>Category:</Text> {data.category}</Text>
            </View>
            <TouchableOpacity onPress={() => {setViewTransaction(false)}} className='mt-5 border border-gray-500 rounded-lg p-2'>
                <Text className='text-white text-lg text-center'>Close</Text>
            </TouchableOpacity>
        </View>
    </View>
);
};