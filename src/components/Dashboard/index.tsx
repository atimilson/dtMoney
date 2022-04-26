import { Summary } from "../Summary";
import { TrasactionTable } from "../TrasactionsTable";
import { Container } from "./styles";

export function Dashboard(){
    return(
        <Container>
            <Summary />
            <TrasactionTable />
        </Container>
    ) 
}