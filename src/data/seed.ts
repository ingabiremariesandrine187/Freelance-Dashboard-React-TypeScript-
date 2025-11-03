import type { Client, Project, Payment } from "../types";

export const initialClients: Client[] = [
  { id: "c1", name: "Amani Tech", country: "Rwanda", email: "contact@amani.tech" },
  { id: "c2", name: "Irembo Labs", country: "Rwanda" } // email optional
];

export const initialProjects: Project[] = [
  {
    id: "p1",
    clientId: "c1",
    title: "Website revamp",
    budget: 800,
    status: "in-progress",
    paymentStatus: "unpaid"
  },

  {
    id: "p2",
    clientId: "c2",
    title: "Mobile app MVP",
    budget: 1500,
    status: "pending",
    paymentStatus: "paid"
  }
];

export const initialPayments: Payment[] = [
  {
    id: "pay1",
    projectId: "p2",
    amount: 1500,
    date: new Date().toISOString()
  }
];