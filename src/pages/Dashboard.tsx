import React from "react";
import Form from "../components/Form";
import Memories from "../components/Memories";

function Dashboard() {
  return (
    <div className="w-100 flex h-screen">
      <Memories />
      <Form />
    </div>
  );
}

export default Dashboard;
