import {useEffect, useState} from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [demirLeft, setDemirLeft] = useState(0);
    const [mertLeft, setMertLeft] = useState(0);
    const [elgormusLeft, setElgormusLeft] = useState(0);
    const [coskunLeft, setCoskunLeft] = useState(0);
    const [fatihLeft, setFatihLeft] = useState(0);

    const calculateDates = () => {
        console.log("log : hadi");
        // LAST DAYS
        const demir = new Date('2024-10-08');
        const coskun = new Date('2024-08-22');
        const mert = new Date('2025-02-25');
        const elgormus = new Date('2024-06-04');
        const fatih = new Date('2024-10-10');
        const today = new Date();

        // KALAN DAYS
        let demirLeft;
        let mertLeft;
        let elgormusLeft;
        let coskunLeft;
        let fatihLeft;

        // CALCULATE

        elgormusLeft = Math.ceil((elgormus.getTime() - today.getTime()) / (1000 * 3600 * 24));

        demirLeft = Math.ceil((demir.getTime() - today.getTime()) / (1000 * 3600 * 24));

        mertLeft = Math.ceil((mert.getTime() - today.getTime()) / (1000 * 3600 * 24));

        coskunLeft = Math.ceil((coskun.getTime() - today.getTime()) / (1000 * 3600 * 24));

        fatihLeft = Math.ceil((fatih.getTime() - today.getTime()) / (1000 * 3600 * 24));

        // console.log("log :", mertLeft);
        // console.log("log :", demirLeft);
        // console.log("log :", elgormusLeft);

        return {demirLeft, mertLeft, elgormusLeft,coskunLeft,fatihLeft};
    };

    useEffect(() => {
        const {demirLeft, mertLeft, elgormusLeft,coskunLeft, fatihLeft} = calculateDates();
        setDemirLeft(demirLeft);
        setMertLeft(mertLeft);
        setElgormusLeft(elgormusLeft);
        setCoskunLeft(coskunLeft);
        setFatihLeft(fatihLeft);
    }, []);

    const countdownData = [
        {name: 'MERT', daysLeft: mertLeft},
        {name: 'FATIH', daysLeft: fatihLeft},
        {name: 'DEMIR', daysLeft: demirLeft},
        {name: 'COSKUN', daysLeft: coskunLeft},
        {name: 'ELGORMUS', daysLeft: elgormusLeft},
    ];

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
                            {Math.abs(item.daysLeft)} {item.daysLeft < 0 ? 'days ago was eligible to apply for IRL' : 'days left'}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
}
