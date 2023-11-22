import './SensorsPanel.css'
import useWebSocket from "react-use-websocket";
import {useEffect, useState} from "react";
import Sensor, {SensorData} from "./Sensor.tsx";

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
            <div className={`sensors-panel`}>
                {
                    sensors.map((s) => <Sensor key={s.id} data={s}/>)
                }
            </div>
    )
}

export default SensorsPanel
