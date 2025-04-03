"use client"
import "../judge/page.css"
import React, { useState, useEffect } from "react";
import Navbar from "../../components-judge/Navbar";
import Sidebar from "../../components-judge/Sidebar";
import ActiveCases from "../../components-judge/ActiveCases";
import CaseDetails from "../../components-judge/CaseDetails";
import casesData from "../../data-judges/cases.json";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [caseComplexity, setCaseComplexity] = useState("Select");
  const [selectedCase, setSelectedCase] = useState(null);
  const [cases] = useState(casesData);
  const caseCounts = {
    all: 25,
    urgent: 5,
    pending: 10,
    completed: 10,
  };

  useEffect(() => {
    setSelectedCase(null);
  }, [caseComplexity]);


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex pt-16">
        <Sidebar
          caseComplexity={caseComplexity}
          setCaseComplexity={setCaseComplexity}
          caseCounts={caseCounts}
        />
        <main className="ml-64 flex flex-1 p-6 gap-6">
          <ActiveCases
            cases={cases}
            caseComplexity={caseComplexity}
            setSelectedCase={setSelectedCase}
            selectedCase={selectedCase}
          />
          <CaseDetails selectedCase={selectedCase} />
        </main>
      </div>
    </div>
  );
};

export default App;
