import React from "react";
import { useAppContext } from "../state/GlobalState";

const DashboardStats: React.FC = () => {
  const { state, countPaidProjects } = useAppContext();
  const { paid, unpaid } = countPaidProjects();
 return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 bg-black/40 rounded-lg border border-white/5">
        <div className="text-sm text-yellow-200">Total Clients</div>
        <div className="text-2xl font-bold text-yellow-50">{state.clients.length}</div>
      </div>
         <div className="p-4 bg-black/40 rounded-lg border border-white/5">
        <div className="text-sm text-yellow-200">Total Projects</div>
        <div className="text-2xl font-bold text-yellow-50">{state.projects.length}</div>
      </div>

      <div className="p-4 bg-black/40 rounded-lg border border-white/5">
        <div className="text-sm text-yellow-200">Payments (paid / unpaid)</div>
        <div className="text-2xl font-bold text-yellow-50">{paid} / {unpaid}</div>
      </div>
        </div>
  );
};

export default DashboardStats;