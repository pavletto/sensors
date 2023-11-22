import "./Sensor.css";

export interface SensorData {
    id: string;
    name: string;
    connected: boolean;
    unit: string;
    value: string
}

function Sensor({data, changeState}: { data: SensorData, changeState: (data: SensorData) => void }) {
    return (
        <div className={`sensor`}>
            <div
                className={`sensor__status ${data.connected ? 'sensor__status_connected' : 'sensor__status_disconnected'}`}></div>
            <div className={`sensor__name`}>{data.name}</div>
            <div className={`sensor__value`}>{data.value || "___"} <span className={`sensor__unit`}>{data.unit}</span>
            </div>
            <button onClick={() => {
                changeState(data)
            }}>{data.connected ? 'OFF' : 'ON'}</button>
        </div>
    )
}

export default Sensor;