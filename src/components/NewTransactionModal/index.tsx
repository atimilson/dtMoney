import Modal from "react-modal";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps{
   isOpen : boolean;
   onRequestClose: () => void; 
}


export function NewTransactionModal({isOpen , onRequestClose} : NewTransactionModalProps){
    const { createTransactions } = useTransactions();
    
    const [title , setTitle] = useState('');
    const [amount,setAmount] = useState(0);
    const [category,setCategory] = useState('');
    const [type , setType ] = useState('deposit');



    async function handleCreateNewTransaction(event : FormEvent){
      event.preventDefault(); 

      await createTransactions({
        title,
        amount,
        category,
        type,
      })
      setTitle('');
      setAmount(0);
      setCategory('');
      setType('deposit');
      onRequestClose();  
    }

    return (
        <Modal
                 isOpen={isOpen}
                 onRequestClose={onRequestClose}
                 overlayClassName="react-modal-overlay"
                 className="react-modal-content"
                 >    

            <button type="button" onClick={onRequestClose} className="react-modal-close">
               <img src={closeImg}  alt="Fechar modal" />
            </button>                     
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Trasacao</h2>                    

                <input
                  placeholder="Titulo"
                  value={title}
                  onChange={event => setTitle(event.target.value)}       
                />

                <input 
                  type="number"
                  placeholder="valor"
                  value={amount}
                  onChange={event => setAmount(Number(event.target.value))}  
                />

                <TransactionTypeContainer>
                    <RadioBox type="button" 
                      onClick={() => {setType('deposit');}}
                      isActive={type === 'deposit'}
                      activeColor="green"
                    >
                        <img src={incomeImg} />
                        
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox type="button"
                      onClick={() => {setType('withdraw');}}
                      isActive={type === 'withdraw'}
                      activeColor="red"
                    >
                        <img src={outcomeImg} />
                        
                        <span>Saidas</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input
                   placeholder="Categoria"
                   value={category}
                   onChange={event => setCategory(event.target.value)}    
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>

      </Modal>
    )
}