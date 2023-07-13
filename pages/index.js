import {useEffect, useState} from 'react';

export default function Home() {
    const [demirLeft, setDemirLeft] = useState(0);
    const [mertLeft, setMertLeft] = useState(0);
    const [elgormusLeft, setElgormusLeft] = useState(0);
    const [coskunLeft, setCoskunLeft] = useState(0);

    const calculateDates = () => {
        console.log("log : hadi");
        // LAST DAYS
        const demir = new Date('2024-10-08');
        const coskun = new Date('2024-08-22');
        const mert = new Date('2025-02-25');
        const elgormus = new Date('2024-06-04');
        const today = new Date();

        // KALAN DAYS
        let demirLeft = 0;
        let mertLeft = 0;
        let elgormusLeft = 0;
        let coskunLeft = 0;

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

        console.log("log :", mertLeft);
        console.log("log :", demirLeft);
        console.log("log :", elgormusLeft);

        return {demirLeft, mertLeft, elgormusLeft,coskunLeft};
    };

    useEffect(() => {
        const {demirLeft, mertLeft, elgormusLeft,coskunLeft} = calculateDates();
        setDemirLeft(demirLeft);
        setMertLeft(mertLeft);
        setElgormusLeft(elgormusLeft);
        setCoskunLeft(coskunLeft);
    }, []);

    const countdownData = [
        {name: 'MERT', daysLeft: mertLeft},
        {name: 'DEMIR', daysLeft: demirLeft},
        {name: 'COSKUN', daysLeft: coskunLeft},
        {name: 'ELGORMUS', daysLeft: elgormusLeft},
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#000', color: '#00FF00' }}>
            <div>
                {countdownData.map((item) => (
                    <div key={item.name} style={{ marginBottom: '20px', fontFamily: 'monospace' }}>
                        <h2 style={{ fontSize: '24px', margin: '0', fontWeight: 'normal' }}>{item.name}</h2>
                        <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0', letterSpacing: '4px' }}>{item.daysLeft} days left</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}
