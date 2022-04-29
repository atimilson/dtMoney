import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Transactions{
    id : number;
    title : string;
    amount : number;
    type : string;
    category : string;
    createAt : string;  
  }

// interface TransactionInput {
//     title : string;
//     amount : number;
//     type : string;
//     category : string; 
// }  

type TransactionInput = Omit<Transactions , 'id' | 'createAt'>

interface TransactionsProviderProps{
    children : ReactNode;
}

interface TransactionsContextData {
    transactions: Transactions[];
    createTransactions: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions , setTransactions] = useState<Transactions[]>([]);
    useEffect(() =>{
        api.get('/transactions')
           .then(response => setTransactions(response.data.transactions))
    },[]);

    async function createTransactions(transactionInput: TransactionInput){        
        const response =  await api.post('/transactions',{
           ...transactionInput,
           createAt : new Date(), 
        });
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction,
        ]);    
    }
     
    return (
       <TransactionsContext.Provider value={{ transactions, createTransactions }}>
           {children}
       </TransactionsContext.Provider> 
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);
    return context;
}
