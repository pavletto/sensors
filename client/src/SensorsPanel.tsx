import './SensorsPanel.css'
import useWebSocket from "react-use-websocket";
import {useEffect, useState} from "react";
import Sensor, {SensorData} from "./Sensor.tsx";
enum ConnectionState {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect'
}

interface Command {
    command: ConnectionState;
    id: string;
}
function SensorsPanel() {
    const {lastJsonMessage,sendJsonMessage} = useWebSocket("ws://localhost:5000");
    const [sensors, setSensors] = useState<SensorData[]>([]);

    useEffect(() => {
        if (lastJsonMessage) {
                const sensor: SensorData = lastJsonMessage as SensorData;
            setSensors(prevSensors => {
                const sensorIndex = prevSensors.findIndex(existingSensor => existingSensor.id === sensor.id);

                if (sensorIndex !== -1) {
                    const newSensors = [...prevSensors];
                    newSensors[sensorIndex] = sensor;
                    return newSensors;
                } else {
                    return [...prevSensors, sensor];
                }
            });
        }
    }, [lastJsonMessage, setSensors]);
    const toggleConnectionState = (data: SensorData) => {
        const command: Command = {
            command: data.connected ? ConnectionState.DISCONNECT : ConnectionState.CONNECT,
            id: data.id
        }
        sendJsonMessage(command);
    }
    return (
            <div className={`sensors-panel`}>
                {
                    sensors.map((s) => <Sensor key={s.id} data={s} changeState={toggleConnectionState}/>)
                }
            </div>
    )
}

export default SensorsPanel
