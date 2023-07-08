import {useEffect, useState} from 'react';

export default function Home() {
    const [demirLeft, setDemirLeft] = useState(0);
    const [mertLeft, setMertLeft] = useState(0);
    const [elgormusLeft, setElgormusLeft] = useState(0);

    const calculateDates = () => {
        console.log("log : hadi");
        // LAST DAYS
        const demir = new Date('08-10-2024');
        const mert = new Date('02-25-2025');
        const elgormus = new Date('04-06-2024');
        const today = new Date();

        // KALAN DAYS
        let demirLeft = 0;
        let mertLeft = 0;
        let elgormusLeft = 0;

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

        console.log("log :", mertLeft);
        console.log("log :", demirLeft);
        console.log("log :", elgormusLeft);

        return {demirLeft, mertLeft, elgormusLeft};
    };

    useEffect(() => {
        const {demirLeft, mertLeft, elgormusLeft} = calculateDates();
        setDemirLeft(demirLeft);
        setMertLeft(mertLeft);
        setElgormusLeft(elgormusLeft);
    }, []);

    const countdownData = [
        {name: 'MERT', daysLeft: mertLeft},
        {name: 'DEMIR', daysLeft: demirLeft},
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
