import {useEffect, useState} from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [countdownData, setCountdownData] = useState([]);

    const calculateDates = () => {
        const demir = new Date('2024-11-02');
        const coskun = new Date('2024-09-19');
        const mert = new Date('2025-02-25');
        // const elgormus = new Date('2024-06-04');
        const elgormus = null;
        const tanya = new Date('2024-03-05');
        const today = new Date();

        const calculateDaysLeft = (date) => {
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
                    status: 'passed.'
                };
            }
        };

        return [
            {name: 'MERT', ...calculateDaysLeft(mert)},
            {name: 'DEMIR', ...calculateDaysLeft(demir)},
            {name: 'COSKUN', ...calculateDaysLeft(coskun)},
            {name: 'ELGORMUS', ...calculateDaysLeft(elgormus)},
            {name: 'ALMIRA BIRTHDAY', ...calculateDaysLeft(tanya)}
        ];
    };

    useEffect(() => {
        setCountdownData(calculateDates());
    }, []);

    return (
        <div className={styles.container}>
            <div>
                {countdownData.map((item) => (
                    <div key={item.name} style={{marginBottom: '20px', fontFamily: 'monospace'}}>
                        <h2 style={{fontSize: '24px', margin: '0', fontWeight: 'normal'}}>{item.name}</h2>
                        <h1 style={{
                            fontSize: '36px',
                            fontWeight: 'bold',
                            margin: '0',
                            letterSpacing: '4px'
                        }}>
                            {item.daysLeft !== null ? `${Math.abs(item.daysLeft)} days -  ${item.status}` : item.status}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
}
