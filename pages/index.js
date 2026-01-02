const quotes = require("../public/quotes.json");
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const normalizeDate = (date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const getYearsMonthsDaysDiff = (startDate, endDate) => {
  const start = normalizeDate(startDate);
  const end = normalizeDate(endDate);
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = end.getMonth() - 1 < 0 ? 11 : end.getMonth() - 1;
    const prevMonthYear =
      end.getMonth() - 1 < 0 ? end.getFullYear() - 1 : end.getFullYear();
    days += daysInMonth(prevMonthYear, prevMonth);
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months, days };
};

const formatYilAyGun = (date, status) => {
  const today = new Date();
  const isFuture = normalizeDate(date) > normalizeDate(today);
  const start = isFuture ? today : date;
  const end = isFuture ? date : today;
  const { years, months, days } = getYearsMonthsDaysDiff(start, end);
  const suffix = status ? ` ${status}` : "";
  return `${years} yil ${months} ay ${days} gun${suffix}`;
};

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
      name: "Mert's British now!",
      date: new Date("2025-08-08"),
      label: "MERT",
    },
    { name: "OGUZHAN", date: new Date("2026-04-16"), label: "ELGORMUS" },
    {
      name: "Almira's British now!",
      date: new Date("2025-08-15"),
      label: "ALIMRA PASAPORT",
    },
    {
      name: "ALMIRA BIRTHDAY",
      date: new Date("2024-03-05"),
      label: "ALMIRA BIRTHDAY",
    },
    {
      name: "??",
      date: new Date("2025-11-28"),
      label: "??",
    },
    {
      name: "XX",
      date: new Date("2026-04-22"),
      label: "XX",
    },
    {
      name: "XY",
      date: new Date("2026-05-06"),
      label: "XY",
    },
  ];
  const result = dates.map(({ name, date, label }) => ({
    name,
    date,
    ...calculateDaysLeft(date, label),
  }));

  // Tarihe göre sırala (en yakın tarih önce)
  return result.sort((a, b) => {
    if (a.date === null) return 1;
    if (b.date === null) return -1;
    return a.date - b.date;
  });
};

export default function Home() {
  const [countdownData, setCountdownData] = useState([]);
  const [quote, setQuote] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(`${randomQuote.content} — ${randomQuote.author}`);

    const data = getCountdownData();
    setCountdownData(data);
  }, []);

  if (!acknowledged) {
    return (
      <>
        <style>{`
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
            {quote || "Yükleniyor..."}
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
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "monospace",
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        alignContent: "flex-start",
      }}
    >
      {countdownData.map((item) => {
        const isMert = item.name === "Mert's British now!";
        const isAlmira = item.name === "Almira's British now!";
        const isAlmiraBirthday = item.name === "ALMIRA BIRTHDAY";
        let statusColor = "#dc3545";
        if (isMert || isAlmira) {
          statusColor = "#000";
        } else if (item.status === "left.") {
          statusColor = "#28a745";
        }

        let valueText = item.status;
        if (item.daysLeft != null) {
          valueText = isAlmiraBirthday
            ? formatYilAyGun(item.date, item.status)
            : `${Math.abs(item.daysLeft)} days ${item.status}`;
        }
        const baseCardStyle = {
          backgroundColor: "#fff",
          backgroundImage:
            isMert || isAlmira
              ? "url('https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/2560px-Flag_of_the_United_Kingdom.svg.png')"
              : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "12px",
          padding: "20px",
          width: window.innerWidth < 600 ? "220px" : "280px",
          fontSize: "16px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.12)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "180px",
          color: "#000",
        };

        return (
          <div key={item.name} style={baseCardStyle}>
            <h2
              style={{
                fontSize: "20px",
                margin: "0 0 -8px 0",
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
                color: statusColor,
              }}
            >
              {valueText}
            </h1>
          </div>
        );
      })}
    </div>
  );
}
