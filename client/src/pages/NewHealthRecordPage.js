import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NewHealthRecordPage() {
  const navigate = useNavigate();
  const { doctorId, petId } = useParams();
  const [healthRecord, setHealthRecord] = useState("");

  const saveHealthRecord = async () => {
    if (!healthRecord) {
      // Health record is empty, handle validation or display error message
      return;
    }

    try {
      // Send an HTTP request to create the health record
      await fetch("http://localhost:3000/Pets/CreateRecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: doctorId,
          petId: petId,
          record: healthRecord,
          date:new Date(),
        }),
      });

      // Redirect back to the PetCard page
      navigate(`/PetCard/${petId}`);
    } catch (error) {
      console.error("Error creating health record:", error);
    }
  };

  return (
    <div>
      <h2>Create New Health Record</h2>
      <textarea
        rows="5"
        cols="50"
        value={healthRecord}
        onChange={(e) => setHealthRecord(e.target.value)}
        placeholder="Enter health record"
      ></textarea>
      <br />
      <button className="btn btn-primary" onClick={saveHealthRecord}>
        Save
      </button>
    </div>
  );
}

export default NewHealthRecordPage;
