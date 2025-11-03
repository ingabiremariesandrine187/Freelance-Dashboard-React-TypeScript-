import React, { createContext, useContext, useReducer, ReactNode } from "react";
import type { AppState, Action, Client, Project, Payment } from "../types";
import { initialClients, initialPayments, initialProjects } from "../data/seed";

/* initial state */
const initialState: AppState = {
  clients: initialClients,
  projects: initialProjects,
  payments: initialPayments
};

/* Reducer */
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ADD_CLIENT":
      return { ...state, clients: [...state.clients, action.payload.client] };

    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload.project] };

    case "ADD_PAYMENT": {
      const payment = action.payload.payment;

      // if payment references project that doesn't exist, ignore (validation should happen before dispatch)
      const projectExists = state.projects.some((p) => p.id === payment.projectId);
      if (!projectExists) return state;

      // add payment
      const payments = [...state.payments, payment];

      // if project exists and payment >0, mark project as paid
      const projects = state.projects.map((p) =>
        p.id === payment.projectId ? { ...p, paymentStatus: "paid" } : p
      );

      return { ...state, payments, projects };
    }

    case "MARK_PROJECT_PAID": {
      const projects = state.projects.map((p) =>
        p.id === action.payload.projectId ? { ...p, paymentStatus: "paid" } : p
      );
      return { ...state, projects };
    }

      case "UPDATE_PROJECT_STATUS": {
      const { projectId, status } = action.payload;
      return {
        ...state,
        projects: state.projects.map((p) => (p.id === projectId ? { ...p, status } : p))
      };
    }

    default:
      return state;
  }
}

/* Context Types */
interface AppContextProps {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  // helpers
  findClientById: (id?: string) => Client | undefined;
  countPaidProjects: () => { paid: number; unpaid: number };
  recordPayment: (payment: Payment) => { success: boolean; error?: string };
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

/* Provider */
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // utilities
  const findClientById = (id?: string) => {
    if (!id) return undefined;
    return state.clients.find((c) => c.id === id);
  };

  const countPaidProjects = () => {
    const paid = state.projects.filter((p) => p.paymentStatus === "paid").length;
    const unpaid = state.projects.length - paid;
    return { paid, unpaid };
  };

  const recordPayment = (payment: Payment) => {
    const project = state.projects.find((p) => p.id === payment.projectId);
    if (!project) return { success: false, error: "Project not found" };

    // example validation: amount must be > 0 and date a valid ISO string
    if (typeof payment.amount !== "number" || payment.amount <= 0) {
      return { success: false, error: "Invalid amount" };
    }
    if (Number.isNaN(Date.parse(payment.date))) {
      return { success: false, error: "Invalid date" };
    }

    // dispatch
    dispatch({ type: "ADD_PAYMENT", payload: { payment } });
    return { success: true };
  };

  return (
    <AppContext.Provider value={{ state, dispatch, findClientById, countPaidProjects, recordPayment }}>
      {children}
    </AppContext.Provider>
  );
};

/* Hook */
export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
};