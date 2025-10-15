import Chat from "../components/chat/chat";
import { ApiProvider } from "../contexts/ApiContext";

export default function Home() {


    return (
        <ApiProvider>
            <Chat />
        </ApiProvider >
    );
}