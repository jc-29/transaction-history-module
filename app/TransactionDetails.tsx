import { View, Text, TouchableOpacity } from 'react-native';
import { Transaction } from '../types/Transaction';

export default function TransactionDetails({data, setViewTransaction, setTransactionData} : {data: Transaction, setViewTransaction: Function, setTransactionData: Function}) {
    return (
    <View className='w-screen h-screen bg-black absolute top-0 left-0 pt-20 pb-10'>
        <Text className='text-center font-bold text-3xl text-white mb-5'>Transaction Details</Text>
        <View className='w-full px-5 flex justify-center'>
            <View className='flex flex-col border rounded-lg border-gray-500 p-2'>
                <Text className='text-white text-lg'><Text className='font-semibold'>Amount:</Text> {data.amount}</Text>
                <Text className='text-white text-lg'><Text className='font-semibold'>Date:</Text> {data.date}</Text>
                <Text className='text-white text-lg'><Text className='font-semibold'>Description:</Text> {data.description}</Text>
                <Text className='text-white text-lg'><Text className='font-semibold'>Type:</Text> {data.type == 1 ? 'Debit' : 'Credit'}</Text>
                <Text className='text-white text-lg'><Text className='font-semibold'>Location:</Text> {data.location}</Text>
                <Text className='text-white text-lg'><Text className='font-semibold'>Category:</Text> {data.category}</Text>
            </View>
            <TouchableOpacity onPress={() => {setViewTransaction(false); setTransactionData({});}} className='mt-5 border border-gray-500 rounded-lg p-2'>
                <Text className='text-white text-lg text-center'>Close</Text>
            </TouchableOpacity>
        </View>
    </View>
);
};