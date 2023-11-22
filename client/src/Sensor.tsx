export interface SensorData {
    id: string;
    name: string;
    connected: boolean;
    unit: string;
    value: string
}

function Sensor({data}: { data: SensorData }) {
    return (
        <div className={`sensor`}>{data.name}</div>
    )
}

export default Sensor;