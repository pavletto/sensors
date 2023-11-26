import type {SensorData} from "./Sensor.tsx";
import type {SendJsonMessage} from "react-use-websocket/dist/lib/types";
import './SensorsControls.css';

enum ConnectionState {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect'
}

interface Command {
    command: ConnectionState;
    id: string;
}

function SensorsControls({sensors, sendJsonMessage}: { sensors: SensorData[], sendJsonMessage: SendJsonMessage }) {
    const toggleConnectionState = (data: SensorData) => {
        const command: Command = {
            command: data.connected ? ConnectionState.DISCONNECT : ConnectionState.CONNECT,
            id: data.id
        }
        sendJsonMessage(command);
    }
    return <>
        <h2>Controls</h2>
        <div className={`sensors-controls`}>
            {
                sensors.map((s) =>
                    <button
                        className={`sensor-control sensor-control_${s.connected ? 'connected' : 'disconnected'}`}
                        key={s.id} onClick={() => toggleConnectionState(s)}>
                        {s.name}
                    </button>)
            }
        </div>
    </>
}

export default SensorsControls;