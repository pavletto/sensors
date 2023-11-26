import './SensorsPanel.css'
import {useState} from "react";
import Sensor, {SensorData} from "./Sensor.tsx";

function SensorsPanel({sensors}: { sensors: SensorData[] }) {
    const [filter, setFilter] = useState<(data: SensorData) => boolean>(() => () => true);
    return <>
        <h2>Sensors</h2>
        <div className={'filter'}>
            <input type="checkbox" id="toggle" onChange={(e) => {
                setFilter(e.target.checked ? () => (d: SensorData) => d.connected : () => () => true)
            }}/>
            <label htmlFor="toggle"></label>
            <span>Connected only</span>
        </div>
        <div className={`sensors-panel`}>
            {
                sensors.filter(filter).map((s) => <Sensor key={s.id} data={s}/>)
            }
        </div>
    </>

}

export default SensorsPanel
