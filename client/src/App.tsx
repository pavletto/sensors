import './App.css'
import useWebSocket from "react-use-websocket";


function App() {
    const {lastJsonMessage} = useWebSocket("ws://localhost:5000");
    console.log(lastJsonMessage);

    return (
        <>
            <main>
                Hi there!
            </main>
        </>
    )
}

export default App
