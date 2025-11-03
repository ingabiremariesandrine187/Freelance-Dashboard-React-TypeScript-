import type { Project, Payment } from "../types";

/* Filter projects by status or payment state */
export function filterProjects(projects: Project[], opts?: { status?: string; paymentStatus?: string }) {
  return projects.filter((p) => {
    if (opts?.status && p.status !== (opts.status as Project["status"])) return false;
    if (opts?.paymentStatus && p.paymentStatus !== (opts.paymentStatus as Project["paymentStatus"])) return false;
    return true;
  });
}

/* Search by name */
export function searchByName<T extends { name?: string; title?: string }>(list: T[], q: string) {
  const ql = q.trim().toLowerCase();
  if (!ql) return list;
  return list.filter((item) => (item.name ?? item.title ?? "").toLowerCase().includes(ql));
}

/* Type narrowing example */
export function ensureDateIso(d?: string | null) {
  if (!d) return undefined;
  const parsed = Date.parse(d);
  if (Number.isNaN(parsed)) return undefined;
  return new Date(parsed).toISOString();
}

/* Count paid vs unpaid from projects */
export function countPaidUnpaid(projects: Project[]) {
  const paid = projects.filter((p) => p.paymentStatus === "paid").length;
  return { paid, unpaid: projects.length - paid };
}

/* Quick payment validator */
export function validatePayment(payment: Payment) {
  if (!payment.projectId) return "Missing projectId";
  if (!payment.amount || payment.amount <= 0) return "Invalid amount";
  if (Number.isNaN(Date.parse(payment.date))) return "Invalid date";
  return null;
}