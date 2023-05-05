import React, { useState, useEffect } from "react";

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "https://date.nager.at/api/v3/NextPublicHolidays/US";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setHolidays(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!holidays.length) {
    return <div>Loading holiday data...</div>;
  }

  return (
    <div className="holidays">
      <h2>Holidays</h2>
      <ul>
        {holidays.map((holiday) => (
          <li key={holiday.date}>
            {holiday.name} - {holiday.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Holidays;
