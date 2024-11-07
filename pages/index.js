import {useEffect, useState} from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [demirLeft, setDemirLeft] = useState(0);
    const [mertLeft, setMertLeft] = useState(0);
    const [elgormusLeft, setElgormusLeft] = useState(0);
    const [coskunLeft, setCoskunLeft] = useState(0);
    const [tanyaLeft, setTanyaLeft] = useState(0);

    const calculateDates = () => {
        console.log("log : hadi");
        // LAST DAYS
        const demir = new Date('2024-09-01');
        const coskun = new Date('2024-08-22');
        const mert = new Date('2025-02-25');
        const elgormus = new Date('2024-06-04');
        const tanya = new Date('2024-03-05');
        const today = new Date();

        // KALAN DAYS
        let demirLeft = 0;
        let mertLeft = 0;
        let elgormusLeft = 0;
        let coskunLeft = 0;
        let tanyaLeft;

        // CALCULATE
        if (elgormus > today) {
            elgormusLeft = Math.ceil((elgormus.getTime() - today.getTime()) / (1000 * 3600 * 24));
        }

        if (demir > today) {
            demirLeft = Math.ceil((demir.getTime() - today.getTime()) / (1000 * 3600 * 24));
        }

        if (mert > today) {
            mertLeft = Math.ceil((mert.getTime() - today.getTime()) / (1000 * 3600 * 24));
        }

        if (coskun > today) {
            coskunLeft = Math.ceil((coskun.getTime() - today.getTime()) / (1000 * 3600 * 24));
        }


        if (tanya > today) {
            tanyaLeft = Math.ceil((tanya.getTime() - today.getTime()) / (1000 * 3600 * 24));
        } else {
            tanyaLeft = Math.floor((today.getTime() - tanya.getTime()) / (1000 * 3600 * 24));
        }

        console.log("log :", mertLeft);
        console.log("log :", demirLeft);
        console.log("log :", elgormusLeft);

        return {demirLeft, mertLeft, elgormusLeft,coskunLeft,tanyaLeft};
    };

    useEffect(() => {
        const {demirLeft, mertLeft, elgormusLeft,coskunLeft,tanyaLeft} = calculateDates();
        setDemirLeft(demirLeft);
        setMertLeft(mertLeft);
        setElgormusLeft(elgormusLeft);
        setCoskunLeft(coskunLeft);
        setTanyaLeft(tanyaLeft);
    }, []);

    const countdownData = [
        {name: 'MERT', daysLeft: mertLeft},
        {name: 'DEMIR', daysLeft: demirLeft},
        {name: 'COSKUN', daysLeft: coskunLeft},
        {name: 'ELGORMUS', daysLeft: elgormusLeft},
        {name: 'tanya', daysLeft: tanyaLeft},
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
                            {Math.abs(item.daysLeft)} days {item.daysLeft >= 0 ? 'left' : 'passed'}
                        </h1>
                    </div>
                ))}
            </div>
        </div>
    );
}
