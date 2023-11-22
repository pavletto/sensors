import './SensorsPanel.css'
import useWebSocket from "react-use-websocket";
import {useEffect, useState} from "react";

interface SensorData {
    id: string;
    name: string;
    connected: boolean;
    unit: string;
    value: string
}

function SensorsPanel() {
    const {lastJsonMessage} = useWebSocket("ws://localhost:5000");
    const [sensors, setSensors] = useState<SensorData[]>([]);
    useEffect(() => {
        if (lastJsonMessage) {
                const sensor: SensorData = lastJsonMessage as SensorData;
                setSensors(prevSensors => {
                        return [...prevSensors, sensor];
                });
        }
    }, [lastJsonMessage, setSensors]);
    return (
            <main>
                {
                    sensors.map((s) => <div>{s.name}</div>)
                }
            </main>
    )
}

export default SensorsPanel
