import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

interface Trasactions{
  id : number;
  title : string;
  amount : number;
  type : string;
  category : string;
  createAt : string;  
}

export function TrasactionTable(){
    const [transactions , setTransactions] = useState<Trasactions[]>([]);

    useEffect(() =>{
        api.get('/transactions')
           .then(response => setTransactions(response.data.transactions))  
        
    },[])
    return(
       <Container>
           <table>
               <thead>
                  <tr>
                      <th>Titulo</th>
                      <th>Valor</th>
                      <th>Category</th>
                      <th>Data</th>
                  </tr>  
               </thead>
               <tbody>
               {transactions.map(transaction => (
                        <tr key={transaction.id}>
                        <td>{transaction.title}</td>
                        <td className={transaction.type}>{transaction.amount}</td>
                        <td>{transaction.category}</td>
                        <td>{transaction.createAt}</td>
                        </tr>
                    ))}
                  
               </tbody>
           </table>
       </Container>
    );
}