import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [countdownData, setCountdownData] = useState([]);

    const calculateDates = () => {
        const demir = new Date('2024-11-02');
        const mert = new Date('2025-01-20');
        const elgormus = new Date('2025-01-22');
        const tanya = new Date('2024-03-05'); // Almira's birthday
        const today = new Date();

        const calculateDaysLeft = (date, name) => {
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
                // Check if the event is "ALMIRA BIRTHDAY" and avoid showing "passed."
                return {
                    daysLeft: Math.floor((today.getTime() - date.getTime()) / (1000 * 3600 * 24)),
                    status: name === 'ALMIRA BIRTHDAY' ? '' : 'passed.'
                };
            }
        };

        return [
            { name: 'MERT', ...calculateDaysLeft(mert, 'MERT') },
            { name: 'DEMIR', ...calculateDaysLeft(demir, 'DEMIR') },
            { name: 'ELGORMUS', ...calculateDaysLeft(elgormus, 'ELGORMUS') },
            { name: 'ALMIRA BIRTHDAY', ...calculateDaysLeft(tanya, 'ALMIRA BIRTHDAY') }
        ];
    };

    useEffect(() => {
        setCountdownData(calculateDates());
    }, []);

    return (
        <div className={styles.container}>
            <div>
                {countdownData.map((item) => (
                    <div key={item.name} style={{ marginBottom: '20px', fontFamily: 'monospace' }}>
                        <h2 style={{ fontSize: '24px', margin: '0', fontWeight: 'normal' }}>{item.name}</h2>
                        <h1 style={{
                            fontSize: '36px',
                            fontWeight: 'bold',
                            margin: '0',
                            letterSpacing: '4px'
                        }}>
                            {item.daysLeft !== null ? `${Math.abs(item.daysLeft)} days - ${item.status}` : item.status}
                        </h1>
                    </div>
                ))}
            </div>
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: '#333333', // Koyu arka plan
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5)', // Daha yumuşak gölge
                color: '#ffffff', // Metin rengi beyaz
                fontFamily: 'monospace'
            }}>
                <h4 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>Examples of the number of days between fingerprint submission and ILR result:</h4>
                <p style={{ margin: '0', fontSize: '14px' }}>1st Example: Fingerprint Date: 06/09/2024 | ILR Decision Date: 04/12/2024 | Total Days Passed: 89</p>
                <p style={{ margin: '0', fontSize: '14px' }}>2nd Example: Fingerprint Date: 19/09/2024 | ILR Decision Date: 14/12/2024 | Total Days Passed: 86</p>
            </div>
        </div>
    );
}
