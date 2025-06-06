import React, { useState } from "react";
import MapView from "./components/MapView";
import Navbar from "./components/Navbar";

export default function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <MapView startDate={startDate} endDate={endDate} />
    </div>
  );
}