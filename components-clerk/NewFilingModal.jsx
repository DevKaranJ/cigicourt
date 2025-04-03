import { faCloudUploadAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const NewFilingModal = ({ setShowNewFilingModal, setCases, cases }) => {
  const [newFilingForm, setNewFilingForm] = useState({
    caseTitle: "",
    caseType: "Criminal",
    partyA: "",
    partyB: "",
    partyAContact: { phone: "", email: "", address: "" },
    partyBContact: { phone: "", email: "", address: "" },
    description: "",
    filingDate: new Date().toISOString().split("T")[0],
    // documents: {
    //   chargesheet: null,
    //   evidences: [],
    //   statements: [],
    //   additionalDocs: [],
    // },
    documents: [],
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    chargeSheet: null,
    supportingEvidence: null,
    witnessStatements: null,
    additionalDocuments: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //this is the thing which i have changed
    const newCase = {
      id: `CIV-2025-${Math.floor(Math.random() * 1000)}`,
      title: newFilingForm.caseTitle,
      status: "Pending Filing",
      date: newFilingForm.filingDate,
      partyA: newFilingForm.partyA,
      partyB: newFilingForm.partyB,
      caseType: newFilingForm.caseType,
      filingFee: newFilingForm.filingFee,
      assignedJudge: newFilingForm.assignedJudge,
      partyAContact: newFilingForm.partyAContact,
      partyBContact: newFilingForm.partyBContact,
      description: newFilingForm.description,
      documents: uploadedFiles,
    };

    setCases([...cases, newCase]);
    setShowNewFilingModal(false);
  };

  // const handleFileUpload = (event, type) => {
  //   const file = event.target.files[0];
  //   if (file && file.type === "application/pdf") {
  //     setUploadedFiles((prev) => ({ ...prev, [type]: file }));
  //   } else {
  //     alert("Only PDF files are allowed.");
  //   }
  // };

  //this is which i have changed(document upload)
  const handleFileUpload = async (event, type) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          setUploadedFiles((prev) => ({ ...prev, [type]: data.filePath }));
        } else {
          alert("File upload failed. Try again.");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file.");
      }
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  
  return (
    <div  onDoubleClick={() => setShowNewFilingModal(false)}  className="fixed inset-0 bg-slate-900/50  flex items-center justify-center z-50">
      <div onDoubleClick={(event)=>{event.stopPropagation(); }} className="bg-white rounded-lg p-6 w-11/12 max-w-2xl mx-auto overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">New Case Filing</h3>

          {/* cross button */}
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setShowNewFilingModal(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Case Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={newFilingForm.caseTitle}
                onChange={(e) =>
                  setNewFilingForm({
                    ...newFilingForm,
                    caseTitle: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Filing Fee (₹)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={newFilingForm.filingFee}
                onChange={(e) =>
                  setNewFilingForm({
                    ...newFilingForm,
                    filingFee: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Assigned Judge
              </label>
              <select
                className="w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={newFilingForm.assignedJudge}
                onChange={(e) =>
                  setNewFilingForm({
                    ...newFilingForm,
                    assignedJudge: e.target.value,
                  })
                }
              >
                <option value="Hon. Sarah Chen">Hon. Sarah Chen</option>
                <option value="Hon. William Mitchell">
                  Hon. William Mitchell
                </option>
                <option value="Hon. Robert Thompson">
                  Hon. Robert Thompson
                </option>
                <option value="Hon. Michael Roberts">
                  Hon. Michael Roberts
                </option>
              </select>
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Case Type
              </label>
              <select
                className="w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={newFilingForm.caseType}
                onChange={(e) =>
                  setNewFilingForm({
                    ...newFilingForm,
                    caseType: e.target.value,
                  })
                }
              >
                <option value="Criminal">Criminal</option>
                <option value="Civil">Civil</option>
                <option value="Family">Family</option>
                <option value="Probate">Probate</option>
              </select>
            </div>
            <div>
              {/* Party A Information */}
              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Party A Information
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-3 py-2 border-2 rounded-lg"
                    value={newFilingForm.partyA}
                    onChange={(e) =>
                      setNewFilingForm({
                        ...newFilingForm,
                        partyA: e.target.value,
                      })
                    }
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-3 py-2 border-2 rounded-lg"
                    value={newFilingForm.partyAContact.phone}
                    onChange={(e) =>
                      setNewFilingForm({
                        ...newFilingForm,
                        partyAContact: {
                          ...newFilingForm.partyAContact,
                          phone: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-3 py-2 border-2 rounded-lg"
                    value={newFilingForm.partyAContact.email}
                    onChange={(e) =>
                      setNewFilingForm({
                        ...newFilingForm,
                        partyAContact: {
                          ...newFilingForm.partyAContact,
                          email: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Physical Address"
                    className="w-full px-3 py-2 border-2 rounded-lg"
                    value={newFilingForm.partyAContact.address}
                    onChange={(e) =>
                      setNewFilingForm({
                        ...newFilingForm,
                        partyAContact: {
                          ...newFilingForm.partyAContact,
                          address: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              {/* Party B Information */}
              <div>
                <label className="block text-md font-medium text-gray-700 mb-1">
                  Party B Information
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-3 py-2 border-2 rounded-lg"
                    value={newFilingForm.partyB}
                    onChange={(e) =>
                      setNewFilingForm({
                        ...newFilingForm,
                        partyB: e.target.value,
                      })
                    }
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-3 py-2 border-2 rounded-lg"
                    value={newFilingForm.partyBContact.phone}
                    onChange={(e) =>
                      setNewFilingForm({
                        ...newFilingForm,
                        partyBContact: {
                          ...newFilingForm.partyBContact,
                          phone: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-3 py-2 border-2 rounded-lg"
                    value={newFilingForm.partyBContact.email}
                    onChange={(e) =>
                      setNewFilingForm({
                        ...newFilingForm,
                        partyBContact: {
                          ...newFilingForm.partyBContact,
                          email: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Physical Address"
                    className="w-full px-3 py-2 border-2 rounded-lg"
                    value={newFilingForm.partyBContact.address}
                    onChange={(e) =>
                      setNewFilingForm({
                        ...newFilingForm,
                        partyBContact: {
                          ...newFilingForm.partyBContact,
                          address: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-md font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 h-32"
                value={newFilingForm.description}
                onChange={(e) =>
                  setNewFilingForm({
                    ...newFilingForm,
                    description: e.target.value,
                  })
                }
              ></textarea>
            </div>

            <div className="space-y-3">
              <label className="block text-md font-medium text-gray-700">
                Required Documents
              </label>
              <div className="space-y-2">
                {/* Charge Sheet / Main Petition */}
                <div className="border-2 rounded-lg p-3">
                  <label className="text-md font-medium text-gray-700 mb-2 block">
                    Charge Sheet / Main Petition
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-3 text-center relative">
                    <input
                      type="file"
                      accept=".pdf"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      onChange={(e) => handleFileUpload(e, "chargeSheet")}
                    />
                    <FontAwesomeIcon
                      icon={faCloudUploadAlt}
                      className="text-2xl text-gray-400 mb-1"
                    />
                    <p className="text-xs text-gray-500">
                      {uploadedFiles.chargeSheet
                        ? uploadedFiles.chargeSheet.name
                        : "Upload Charge Sheet (PDF only)"}
                    </p>
                  </div>
                </div>

                {/* Supporting Evidence */}
                <div className="border-2 rounded-lg p-3">
                  <label className="text-md font-medium text-gray-700 mb-2 block">
                    Supporting Evidence
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-3 text-center relative">
                    <input
                      type="file"
                      accept=".pdf"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      onChange={(e) =>
                        handleFileUpload(e, "supportingEvidence")
                      }
                    />
                    <FontAwesomeIcon
                      icon={faCloudUploadAlt}
                      className="text-2xl text-gray-400 mb-1"
                    />
                    <p className="text-xs text-gray-500">
                      {uploadedFiles.supportingEvidence
                        ? uploadedFiles.supportingEvidence.name
                        : "Upload evidence documents (PDF only)"}
                    </p>
                  </div>
                </div>

                {/* Witness Statements */}
                <div className="border-2 rounded-lg p-3">
                  <label className="text-md font-medium text-gray-700 mb-2 block">
                    Witness Statements
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-3 text-center relative">
                    <input
                      type="file"
                      accept=".pdf"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      onChange={(e) => handleFileUpload(e, "witnessStatements")}
                    />
                    <FontAwesomeIcon
                      icon={faCloudUploadAlt}
                      className="text-2xl text-gray-400 mb-1"
                    />
                    <p className="text-xs text-gray-500">
                      {uploadedFiles.witnessStatements
                        ? uploadedFiles.witnessStatements.name
                        : "Upload witness statements (PDF only)"}
                    </p>
                  </div>
                </div>

                {/* Additional Documents */}
                <div className="border-2 rounded-lg p-3">
                  <label className="text-md font-medium text-gray-700 mb-2 block">
                    Additional Documents
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-3 text-center relative">
                    <input
                      type="file"
                      accept=".pdf"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      onChange={(e) =>
                        handleFileUpload(e, "additionalDocuments")
                      }
                    />
                    <FontAwesomeIcon
                      icon={faCloudUploadAlt}
                      className="text-2xl text-gray-400 mb-1"
                    />
                    <p className="text-xs text-gray-500">
                      {uploadedFiles.additionalDocuments
                        ? uploadedFiles.additionalDocuments.name
                        : "Upload any additional supporting documents (PDF only)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="px-4 py-2 border-2 rounded-lg hover:bg-gray-50"
            onClick={() => setShowNewFilingModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            onClick={() => {
              const newCase = {
                id: `CIV-2025-${Math.floor(Math.random() * 1000)}`,
                title: newFilingForm.caseTitle,
                status: "Pending Filing",
                date: newFilingForm.filingDate,
                partyA: newFilingForm.partyA,
                partyB: newFilingForm.partyB,
                caseType: newFilingForm.caseType,
                filingFee: newFilingForm.filingFee,
                assignedJudge: newFilingForm.assignedJudge,

                partyAContact: {
                  phone: newFilingForm.partyAContact?.phone || "N/A",
                  email: newFilingForm.partyAContact?.email || "N/A",
                  address: newFilingForm.partyAContact?.address || "N/A",
                },

                partyBContact: {
                  phone: newFilingForm.partyBContact?.phone || "N/A",
                  email: newFilingForm.partyBContact?.email || "N/A",
                  address: newFilingForm.partyBContact?.address || "N/A",
                },

                documents: [
                  {
                    name: "Main Petition",
                    status: "Pending",
                    uploadDate: new Date().toISOString().split("T")[0],
                  },
                  {
                    name: "Supporting Evidence",
                    status: "Pending",
                    uploadDate: new Date().toISOString().split("T")[0],
                  },
                ],
              };

              setCases([newCase, ...cases]);
              setShowNewFilingModal(false);
              setSuccessMessage("New case has been filed successfully");
              setShowSuccessModal(true);
            }}
          >
            Submit Filing
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFilingModal;
