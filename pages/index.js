const quotes = require('../public/quotes.json');
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
        {name: 'MERT', date: new Date('2025-05-20'), label: 'MERT'},
        {name: 'OGUZHAN', date: new Date('2026-04-16'), label: 'ELGORMUS'},
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
    const [quote, setQuote] = useState('');
    const [acknowledged, setAcknowledged] = useState(false);

    useEffect(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(`${randomQuote.content} — ${randomQuote.author}`);

        const data = getCountdownData();
        setCountdownData(data);

        const initialPositions = {};
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        const cardWidth = containerWidth < 600 ? 240 : 300;
        const cardHeight = containerWidth < 600 ? 140 : 180;
        const padding = 20;

        const placedCards = [];

        data.forEach((item) => {
          let x, y;
          let overlaps;
          let attempts = 0;

          do {
            x = Math.floor(Math.random() * (containerWidth - cardWidth - padding));
            y = Math.floor(Math.random() * (containerHeight - cardHeight - padding));
            overlaps = placedCards.some(pos =>
              Math.abs(pos.x - x) < cardWidth + padding &&
              Math.abs(pos.y - y) < cardHeight + padding
            );
            attempts++;
          } while (overlaps && attempts < 200);

          placedCards.push({ x, y });
          initialPositions[item.name] = { x, y };
        });

        setPositions(initialPositions);
    }, []);

    const handleMouseDown = (e, id) => {
        setDraggingId(id);
    };

    const handleTouchStart = (e, id) => {
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

    const handleTouchMove = (e) => {
      if (draggingId !== null) {
        const touch = e.touches[0];
        setPositions(prev => ({
          ...prev,
          [draggingId]: {
            x: touch.clientX - 140,
            y: touch.clientY - 70
          }
        }));
      }
    };

    const handleMouseUp = () => {
        setDraggingId(null);
    };

    const handleTouchEnd = () => {
      setDraggingId(null);
    };

    if (!acknowledged) {
        return (
            <>
              <style jsx global>{`
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              <div className={styles.container} style={{
                padding: '40px',
                fontFamily: 'Georgia, serif',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(to right, #f0f2f5, #ffffff)'
              }}>
                <div style={{
                  fontSize: '22px',
                  fontStyle: 'italic',
                  marginBottom: '40px',
                  maxWidth: '700px',
                  lineHeight: '1.6',
                  color: '#2c3e50',
                  textAlign: 'center',
                  backgroundColor: '#ecf0f1',
                  padding: '20px 30px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  animation: 'fadeIn 1s ease-in'
                }}>
                  {quote ? quote : 'Yükleniyor...'}
                </div>
                <button
                  onClick={() => setAcknowledged(true)}
                  style={{
                    padding: '12px 30px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    backgroundColor: '#3498db',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                  }}
                >
                  Okudum, anladım
                </button>
              </div>
            </>
        );
    }

    return (
        <div className={styles.container}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}
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
                    onTouchStart={(e) => handleTouchStart(e, item.name)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                        position: 'absolute',
                        left: positions[item.name]?.x || 100,
                        top: positions[item.name]?.y || index * 160 + 100,
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        padding: '20px',
                        minWidth: window.innerWidth < 600 ? '220px' : '280px',
                        fontSize: '16px',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.12)',
                        textAlign: 'center',
                        cursor: 'grab',
                        touchAction: 'none'
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
