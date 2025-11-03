import React from "react";
import type { Client } from "../types";

interface Props {
  client: Client;
}

const ClientCard: React.FC<Props> = ({ client }) => {
  return (
    <div className="bg-white/5 p-4 rounded-lg shadow-sm border border-white/5">
      <h3 className="font-semibold text-lg text-yellow-100">{client.name}</h3>
      <p className="text-sm text-yellow-200/80">Country: {client.country}</p>
      <p className="text-sm text-yellow-200/70">Email: {client.email ?? "Not Provided"}</p>
    </div>
  );
};

export default ClientCard;