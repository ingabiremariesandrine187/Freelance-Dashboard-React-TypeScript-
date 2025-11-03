import React from "react";
import type { Project } from "../types";
import { useAppContext } from "../state/GlobalState";

interface Props {
  projects: Project[];
}

const ProjectList: React.FC<Props> = ({ projects }) => {
  const { findClientById, dispatch } = useAppContext();

  const markPaid = (projectId: string) => {
    dispatch({ type: "MARK_PROJECT_PAID", payload: { projectId } });
  };
   return (
    <div className="space-y-3">
      {projects.map((p) => {
        const client = findClientById(p.clientId);
        return (
          <div key={p.id} className="p-4 rounded-lg bg-black/40 border border-white/5 flex items-center justify-between">
            <div>
              <div className="font-semibold text-violet-700">{p.title}</div>
              <div className="text-sm text-white">
                Client: {client ? client.name : "Client not found"}
              </div>
              <div className="text-sm text-white">
                Status: <span className={`${p.status === "completed" ? "font-bold" : ""}`}>{p.status}</span> • Budget: ${p.budget}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  p.paymentStatus === "paid" ? "bg-green-600/60 text-white" : "bg-red-700/60 text-white"
                }`}
              >
                {p.paymentStatus}
              </span>
              {p.paymentStatus === "unpaid" && (
                <button
                  onClick={() => markPaid(p.id)}
                  className="px-3 py-1 rounded-lg bg-violet-700 text-black font-medium hover:brightness-95"
                >
                  Mark Paid
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;