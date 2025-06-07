import {useEffect, useState} from 'react';
import styles from '../styles/Home.module.css';

// Modularized: calculateDaysLeft moved to top-level
const calculateDaysLeft = (date, name) => {
    const today = new Date();
    if (date == null) {
        return {
            daysLeft: null,
            status: 'An application for ILR has not been submitted.'
        };
    }
    if (date > today) {
        return {
            daysLeft: Math.ceil((date.getTime() - today.getTime()) / (1000 * 3600 * 24)),
            status: 'left.'
        };
    } else {
        return {
            daysLeft: Math.floor((today.getTime() - date.getTime()) / (1000 * 3600 * 24)),
            status: name === 'ALMIRA BIRTHDAY' ? '' : 'passed.'
        };
    }
};

// Renamed and refactored: getCountdownData
const getCountdownData = () => {
    const dates = [
        {name: 'OZGUR', date: new Date('2026-03-03'), label: 'DEMIR'},
        {name: 'MERT', date: new Date('2025-01-24'), label: 'MERT'},
        {name: 'OGUZHAN', date: new Date('2024-12-27'), label: 'ELGORMUS'},
        {name: 'ALMIRA BIRTHDAY', date: new Date('2024-03-05'), label: 'ALMIRA BIRTHDAY'}
    ];
    return dates.map(({name, date, label}) => ({
        name,
        ...calculateDaysLeft(date, label)
    }));
};

export default function Home() {
    const [countdownData, setCountdownData] = useState([]);
    const [positions, setPositions] = useState({});
    const [draggingId, setDraggingId] = useState(null);

    useEffect(() => {
        const data = getCountdownData();
        setCountdownData(data);

        const initialPositions = {};
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        data.forEach((item) => {
            initialPositions[item.name] = {
                x: Math.floor(Math.random() * (containerWidth - 300)),
                y: Math.floor(Math.random() * (containerHeight - 200))
            };
        });

        setPositions(initialPositions);
    }, []);

    const handleMouseDown = (e, id) => {
        setDraggingId(id);
    };

    const handleMouseMove = (e) => {
        if (draggingId !== null) {
            setPositions(prev => ({
                ...prev,
                [draggingId]: {
                    x: e.clientX - 140,
                    y: e.clientY - 70
                }
            }));
        }
    };

    const handleMouseUp = () => {
        setDraggingId(null);
    };

    return (
        <div className={styles.container}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}
             style={{
                 position: 'relative',
                 height: '100vh',
                 padding: '40px',
                 fontFamily: 'monospace',
                 backgroundColor: '#f4f4f4'
             }}>
            {countdownData.map((item, index) => (
                <div
                    key={item.name}
                    onMouseDown={(e) => handleMouseDown(e, item.name)}
                    style={{
                        position: 'absolute',
                        left: positions[item.name]?.x || 100,
                        top: positions[item.name]?.y || index * 160 + 100,
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        padding: '28px',
                        minWidth: '280px',
                        fontSize: '18px',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.12)',
                        textAlign: 'center',
                        cursor: 'grab'
                    }}>
                    <h2 style={{
                        fontSize: '20px',
                        margin: '0 0 10px 0',
                        fontWeight: '600',
                        color: '#333'
                    }}>{item.name}</h2>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        margin: '0',
                        color: item.status === 'left.' ? '#28a745' : '#dc3545'
                    }}>
                        {item.daysLeft !== null ? `${Math.abs(item.daysLeft)} days ${item.status}` : item.status}
                    </h1>
                </div>
            ))}
        </div>
    );
}
