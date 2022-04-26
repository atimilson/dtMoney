import { useEffect } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

export function TrasactionTable(){
    useEffect(() =>{
        api.get('Trasaction')
           .then(response => console.log(response.data))  
        
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
                   <tr>
                       <td>Desenlvimento de website</td>
                       <td className="deposit">R$ 12.000,00</td>
                       <td>Desenlvimento</td>
                       <td>20/02/2021</td>
                   </tr>
                   <tr>
                       <td>Aluguel</td>
                       <td className="withdraw">- R$ 1.000,00</td>
                       <td>Casa</td>
                       <td>17/02/2021</td>
                   </tr>
                   <tr>
                       <td>Desenlvimento de website</td>
                       <td className="deposit">R$ 18.000,00</td>
                       <td>Desenlvimento</td>
                       <td>30/02/2021</td>
                   </tr>
               </tbody>
           </table>
       </Container>
    );
}