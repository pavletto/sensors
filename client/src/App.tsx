import {useEffect, useState} from "react";
import type {SensorData} from "./Sensor.tsx";
import useWebSocket, {ReadyState} from "react-use-websocket";
import SensorsPanel from "./SensorsPanel.tsx";
import SensorsControls from "./SensorsControls.tsx";

function App() {
    const {lastJsonMessage, sendJsonMessage, readyState} = useWebSocket("ws://localhost:5000");
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
    switch (readyState) {
        case ReadyState.CONNECTING:
            return <div>Connecting...</div>
        case ReadyState.OPEN:
            return <>
                <SensorsPanel sensors={sensors}/>
                <SensorsControls sensors={sensors} sendJsonMessage={sendJsonMessage}/>
            </>
        case ReadyState.CLOSING:
            return <div>Disconnecting...</div>
        case ReadyState.CLOSED:
            return <div>Disconnected</div>
    }
}

export default App;