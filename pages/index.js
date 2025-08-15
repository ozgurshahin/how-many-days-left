const quotes = require("../public/quotes.json");
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

// Modularized: calculateDaysLeft moved to top-level
const calculateDaysLeft = (date, name) => {
  const today = new Date();
  if (date == null) {
    return {
      daysLeft: null,
      status: "An application for ILR has not been submitted.",
    };
  }
  if (date > today) {
    return {
      daysLeft: Math.ceil(
        (date.getTime() - today.getTime()) / (1000 * 3600 * 24),
      ),
      status: "left.",
    };
  } else {
    return {
      daysLeft: Math.floor(
        (today.getTime() - date.getTime()) / (1000 * 3600 * 24),
      ),
      status: name === "ALMIRA BIRTHDAY" ? "" : "passed.",
    };
  }
};

// Renamed and refactored: getCountdownData
const getCountdownData = () => {
  const dates = [
    { name: "OZGUR", date: new Date("2026-03-03"), label: "DEMIR" },
    {
      name: "Mert’s British now!",
      date: new Date("2025-08-08"),
      label: "MERT",
    },
    { name: "OGUZHAN", date: new Date("2026-04-16"), label: "ELGORMUS" },
    {
      name: "Almira’s British now!",
      date: new Date("2025-08-15"),
      label: "ALIMRA PASAPORT",
    },
    {
      name: "ALMIRA BIRTHDAY",
      date: new Date("2024-03-05"),
      label: "ALMIRA BIRTHDAY",
    },
  ];
  return dates.map(({ name, date, label }) => ({
    name,
    ...calculateDaysLeft(date, label),
  }));
};

export default function Home() {
  const [countdownData, setCountdownData] = useState([]);
  const [positions, setPositions] = useState({});
  const [draggingId, setDraggingId] = useState(null);
  const [quote, setQuote] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [liveMsg, setLiveMsg] = useState("");

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
        y = Math.floor(
          Math.random() * (containerHeight - cardHeight - padding),
        );
        overlaps = placedCards.some(
          (pos) =>
            Math.abs(pos.x - x) < cardWidth + padding &&
            Math.abs(pos.y - y) < cardHeight + padding,
        );
        attempts++;
      } while (overlaps && attempts < 200);

      placedCards.push({ x, y });
      initialPositions[item.name] = { x, y };
    });

    setPositions(initialPositions);
  }, []);

  // ---- Mouse/Touch drag helpers + live region updates ----
  const startDrag = (id) => {
    setDraggingId(id);
    setLiveMsg(`${id} selected for dragging`);
  };
  const endDrag = () => {
    if (draggingId) setLiveMsg(`Dropped ${draggingId}`);
    setDraggingId(null);
  };

  const handleMouseDown = (e, id) => {
    startDrag(id);
  };
  const handleTouchStart = (e, id) => {
    startDrag(id);
  };
  const handleMouseMove = (e) => {
    if (draggingId !== null) {
      setPositions((prev) => ({
        ...prev,
        [draggingId]: {
          x: e.clientX - 140,
          y: e.clientY - 70,
        },
      }));
    }
  };
  const handleTouchMove = (e) => {
    if (draggingId !== null) {
      const touch = e.touches[0];
      setPositions((prev) => ({
        ...prev,
        [draggingId]: {
          x: touch.clientX - 140,
          y: touch.clientY - 70,
        },
      }));
    }
  };
  const handleMouseUp = () => endDrag();
  const handleTouchEnd = () => endDrag();

  // ---- Keyboard accessibility ----
  const handleKeyDown = (e, id) => {
    const keys = [
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      " ",
      "Enter",
      "Escape",
    ];
    if (keys.includes(e.key)) e.preventDefault();

    const step = e.shiftKey ? 1 : 10;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      setPositions((prev) => {
        const current = prev[id] ?? { x: 100, y: 100 };
        switch (e.key) {
          case "ArrowUp":
            return { ...prev, [id]: { ...current, y: current.y - step } };
          case "ArrowDown":
            return { ...prev, [id]: { ...current, y: current.y + step } };
          case "ArrowLeft":
            return { ...prev, [id]: { ...current, x: current.x - step } };
          case "ArrowRight":
            return { ...prev, [id]: { ...current, x: current.x + step } };
          default:
            return prev;
        }
      });
    }

    if (e.key === " " || e.key === "Enter") {
      setDraggingId((curr) => {
        const next = curr === id ? null : id;
        setLiveMsg(next ? `${id} selected for dragging` : `Dropped ${id}`);
        return next;
      });
    }
    if (e.key === "Escape") {
      setLiveMsg(`Cancelled dragging ${id}`);
      setDraggingId(null);
    }
  };

  if (!acknowledged) {
    return (
      <>
        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
        <div
          className={styles.container}
          style={{
            padding: "40px",
            fontFamily: "Georgia, serif",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(to right, #f0f2f5, #ffffff)",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontStyle: "italic",
              marginBottom: "40px",
              maxWidth: "700px",
              lineHeight: "1.6",
              color: "#2c3e50",
              textAlign: "center",
              backgroundColor: "#ecf0f1",
              padding: "20px 30px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              animation: "fadeIn 1s ease-in",
            }}
          >
            {quote ? quote : "Yükleniyor..."}
          </div>
          <button
            onClick={() => setAcknowledged(true)}
            style={{
              padding: "12px 30px",
              fontSize: "16px",
              borderRadius: "8px",
              backgroundColor: "#3498db",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            Okudum, anladım
          </button>
        </div>
      </>
    );
  }

  return (
    <div
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        height: "100vh",
        padding: "40px",
        fontFamily: "monospace",
        backgroundColor: "#f4f4f4",
      }}
    >
      {/* SR live region */}
      <div
        aria-live="polite"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(1px, 1px, 1px, 1px)",
        }}
      >
        {liveMsg}
      </div>

      {countdownData.map((item, index) => {
        const isMert = item.name === "Mert’s British now!";
        const isAlmira = item.name === "Almira’s British now!";
        const baseCardStyle = {
          position: "absolute",
          left: positions[item.name]?.x || 100,
          top: positions[item.name]?.y || index * 160 + 100,
          backgroundColor: "#fff",
          backgroundImage: isMert || isAlmira
            ? "url('https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/2560px-Flag_of_the_United_Kingdom.svg.png')"
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "12px",
          padding: "20px",
          minWidth: window.innerWidth < 600 ? "220px" : "280px",
          fontSize: "16px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.12)",
          textAlign: "center",
          cursor: "grab",
          touchAction: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "180px",
          color: "#000", // tüm yazılar siyah
          outline: "none",
        };

        return (
          <div
            key={item.name}
            role="button"
            tabIndex={0}
            aria-label={`Drag ${item.name} card`}
            aria-roledescription="draggable card"
            aria-pressed={draggingId === item.name}
            onKeyDown={(e) => handleKeyDown(e, item.name)}
            onMouseDown={(e) => handleMouseDown(e, item.name)}
            onTouchStart={(e) => handleTouchStart(e, item.name)}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,0,0,0.25)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.12)";
            }}
            style={baseCardStyle}
          >
            <h2
              style={{
                fontSize: "20px",
                margin: "0 0 -8px 0", // iki satır arası dar
                fontWeight: "600",
                color: isMert || isAlmira ? "#000" : "#333",
              }}
            >
              {item.name}
            </h2>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                margin: "0",
                color: isMert || isAlmira
                  ? "#000"
                  : item.status === "left."
                    ? "#28a745"
                    : "#dc3545",
              }}
            >
              {item.daysLeft !== null
                ? `${Math.abs(item.daysLeft)} days ${item.status}`
                : item.status}
            </h1>
          </div>
        );
      })}
    </div>
  );
}
