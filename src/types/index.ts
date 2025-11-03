export type ProjectStatus = "pending" | "in-progress" | "completed";
export type PaymentStatus = "paid" | "unpaid";

export interface Client {
  id: string;
  name: string;
  country: string;
  email?: string;
}

export interface Project {
  id: string;
  clientId: string;
  title: string;
  budget: number;
  status: ProjectStatus;
  paymentStatus: PaymentStatus;
}

export interface Payment {
  id: string;
  projectId: string;
  amount: number;
  date: string; // ISO
}

/* App state */
export interface AppState {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
}

/* Actions (discriminated union) */
export type Action =
  | { type: "ADD_CLIENT"; payload: { client: Client } }
  | { type: "ADD_PROJECT"; payload: { project: Project } }
  | { type: "ADD_PAYMENT"; payload: { payment: Payment } }
  | { type: "MARK_PROJECT_PAID"; payload: { projectId: string } }
  | { type: "UPDATE_PROJECT_STATUS"; payload: { projectId: string; status: ProjectStatus } };