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

    useEffect(() => {
        setCountdownData(getCountdownData());
    }, []);

    return (
        <div className={styles.container}
             style={{padding: '40px', fontFamily: 'monospace', backgroundColor: '#f4f4f4'}}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '24px',
                width: '100%',
                margin: '0 auto'
            }}>
                {countdownData.map((item) => (
                    <div key={item.name} style={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        padding: '28px',
                        marginBottom: '24px',
                        minWidth: '280px',
                        fontSize: '18px',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.12)',
                        textAlign: 'center',
                        transition: 'transform 0.3s ease',
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
        </div>
    );
}
