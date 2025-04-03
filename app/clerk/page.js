"use client"
import React, { useState, useEffect } from "react";
import "../clerk/page.css";
import * as echarts from "echarts";
import Navbar from "../../components-clerk/Navbar";
import Sidebar from "../../components-clerk/Sidebar";
import CaseList from "../../components-clerk/CaseList";
import CaseDetails from "../../components-clerk/CaseDetails";
import NewFilingModal from "../../components-clerk/NewFilingModal";
import PartyModal from "../../components-clerk/PartyModal";
import SuccessModal from "../../components-clerk/Success/SuccessModal";

const Clerk = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedCase, setSelectedCase] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNewFilingModal, setShowNewFilingModal] = useState(false);
  const [showPartyModal, setShowPartyModal] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [cases, setCases] = useState([
    {
      id: "CIV-2025-0301",
      title: "Divorce Proceedings",
      status: "Pending Filing",
      date: "2025-03-01",
      partyA: "Elizabeth Montgomery",
      partyB: "Richard Montgomery",
      partyAContact: "elizabeth@example.com",
      partyBContact: "richard@example.com",
      caseType: "Family Law",
      filingFee: 350.0,
      assignedJudge: "Hon. Sarah Chen",
      documents: [
        {
          name: "Divorce Petition",
          status: "Pending",
          uploadDate: "2025-03-01",
        },
        {
          name: "Financial Disclosure",
          status: "Pending",
          uploadDate: "2025-03-01",
        },
      ],
    },
    {
      id: "PRO-2025-0300",
      title: "Estate Administration",
      status: "Filed",
      date: "2025-02-28",
      partyA: "James Richardson Estate",
      partyB: "Beneficiaries",
      partyAContact: "james@example.com",
      partyBContact: "beneficiaries@example.com",
      caseType: "Probate",
      filingFee: 450.0,
      assignedJudge: "Hon. William Mitchell",
      nextHearing: "2025-03-15",
      documents: [
        { name: "Will Document", status: "Verified", uploadDate: "2025-02-28" },
        {
          name: "Asset Inventory",
          status: "Pending",
          uploadDate: "2025-02-28",
        },
      ],
    },
    {
      id: "LAB-2025-0320",
      title: "Workplace Harassment Case",
      status: "Scheduled",
      date: "2025-03-08",
      partyA: "Alice Johnson",
      partyB: "XYZ Corporation",
      partyAContact: "alicej@example.com",
      partyBContact: "legal@xyzcorp.com",
      caseType: "Labor Law",
      filingFee: 300.0,
      assignedJudge: "Hon. Lisa Carter",
      nextHearing: "2025-03-25",
      documents: [
        {
          name: "Complaint Document",
          status: "Submitted",
          uploadDate: "2025-03-08",
        },
        {
          name: "HR Investigation Report",
          status: "Under Review",
          uploadDate: "2025-03-10",
        },
      ],
    },
    
    {
      id: "BUS-2025-0330",
      title: "Breach of Contract",
      status: "Hearing Scheduled",
      date: "2025-03-10",
      partyA: "ABC Enterprises",
      partyB: "XYZ Industries",
      partyAContact: "legal@abcenterprises.com",
      partyBContact: "law@xyzindustries.com",
      caseType: "Business Dispute",
      filingFee: 500.0,
      assignedJudge: "Hon. Robert Williams",
      nextHearing: "2025-04-01",
      documents: [
        {
          name: "Contract Agreement",
          status: "Verified",
          uploadDate: "2025-03-10",
        },
        {
          name: "Breach Notice",
          status: "Pending",
          uploadDate: "2025-03-12",
        },
      ],
    },
  ]);

  useEffect(() => {
    const chart = echarts.init(document.getElementById("caseChart"));
    chart.setOption({
      title: {
        text: "Case Distribution",
        textStyle: { color: "#1a237e", fontSize: "1.2rem" },
      },
      tooltip: { trigger: "item" },
      series: [
        {
          name: "Cases",
          type: "pie",
          radius: ["40%", "70%"],
          center: ["50%", "55%"],
          // avoidLabelOverlap: true,
          // labelLine: { show: false },
          label: { show: false }, 
          labelLine: { show: false },
          data: [
            { value: 35, name: "Urgent" },
            { value: 25, name: "Pending" },
            { value: 20, name: "Complete" },
            { value: 20, name: "In Progress" },
          ],
          itemStyle: { borderRadius: 10, borderColor: "#fff", borderWidth: 2 },
        },
      ],
    });
  }, []);

  const handleDeleteCase = (caseId) => {
    const updatedCases = cases.filter((c) => c.id !== caseId);
    setCases(updatedCases);
    setSelectedCase(null);
    setSuccessMessage("Case has been deleted successfully");
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
      />

      {/* Main Content */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        {/* Main Content Area */}
        <main className="ml-64 flex-1 p-6">
          <div className="grid grid-cols-2 gap-6">

            <CaseList
              cases={cases}
              selectedCase={selectedCase}
              setSelectedCase={setSelectedCase}
              setShowNewFilingModal={setShowNewFilingModal}
              setShowPartyModal={setShowPartyModal}
            />

            <CaseDetails
              selectedCase={selectedCase}
              handleDeleteCase={handleDeleteCase}
              setShowPartyModal={setShowPartyModal}
            />
          </div>
        </main>
      </div>

      {/* Modals */}
      {showNewFilingModal && (
        <NewFilingModal
          setShowNewFilingModal={setShowNewFilingModal}
          setCases={setCases}
          cases={cases}
        />
      )}

      {showPartyModal && (
        <PartyModal
          showPartyModal={showPartyModal}
          setShowPartyModal={setShowPartyModal}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          successMessage={successMessage}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}
    </div>
  );
};

export default Clerk;