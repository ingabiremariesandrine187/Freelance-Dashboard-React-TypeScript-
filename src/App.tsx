import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AppProvider, useAppContext } from "./state/GlobalState";
import ClientCard from "./components/ClientCard";
import ProjectList from "./components/ProjectList";
import DashboardStats from "./components/DashboardStats";
import type { Payment } from "./types";
import { v4 as uuidv4 } from "uuid";

/* small pages (inside App for clarity) */

const DashboardPage: React.FC = () => {
  return (
    <div className="px-12 pt-8">
      <h1 className="text-3xl font-extrabold text-violet-700 mb-4">Freelance Management</h1>
      <p className="text-violet-700 mb-8">Select an option from the sidebar to get started</p>
      <DashboardStats />
    </div>
  );
};

const ProjectsPage: React.FC = () => {
  const { state } = useAppContext();
  return (
    <div className="px-12 pt-8">
      <h2 className="text-2xl text-violet-700 font-bold mb-4">Projects</h2>
      <ProjectList projects={state.projects} />
    </div>
  );
};

const ClientsPage: React.FC = () => {
  const { state } = useAppContext();
  return (
    <div className="px-12 pt-8">
      <h2 className="text-2xl text-violet-700 font-bold mb-4">Clients</h2>
      <div className="grid grid-cols-2 gap-4">
        {state.clients.map((c) => (
          <ClientCard key={c.id} client={c} />
        ))}
      </div>
    </div>
  );
};

const PaymentsPage: React.FC = () => {
  const { state, recordPayment } = useAppContext();

  const addPayment = () => {
    // demo: make a payment to the first unpaid project
    const unpaidProject = state.projects.find((p) => p.paymentStatus === "unpaid");
    if (!unpaidProject) return alert("No unpaid project found");

    const payment: Payment = {
      id: uuidv4(),
      projectId: unpaidProject.id,
      amount: unpaidProject.budget,
      date: new Date().toISOString()
    };

    const res = recordPayment(payment);
    if (!res.success) alert("Payment failed: " + res.error);
    else alert("Payment recorded");
  };

  return (
    <div className="px-12 pt-8">
      <h2 className="text-2xl text-violet-700 font-bold mb-4">Payments</h2>

      <button onClick={addPayment} className="mb-4 px-4 py-2  bg-white rounded-md text-violet-700 font-medium">
        Record payment for first unpaid project
      </button>

      <div className="space-y-3">
        {state.payments.map((pay) => (
          <div key={pay.id} className="p-3 bg-black/40 rounded-lg border border-white/5">
            <div className=" text-violet-700 font-semibold">Project: {pay.projectId}</div>
            <div className="text-violet-700">Amount: ${pay.amount}</div>
            <div className="text-violet-700 text-sm">Date: {pay.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AppRoutes: React.FC = () => (
    <BrowserRouter>
    <Navbar />
    
    <div className="md:pl-64 min-h-screen bg-white text-violet-700">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
      </Routes>
    </div>
  </BrowserRouter>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;