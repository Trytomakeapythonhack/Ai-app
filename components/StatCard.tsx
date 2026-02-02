import { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
};

export default function StatCard({ label, value, helper, icon }: StatCardProps) {
  return (
    <div className="app-card flex items-start justify-between p-5">
      <div>
        <p className="text-sm text-slate-500">{label}</p>
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
        {helper && <p className="text-xs text-slate-500">{helper}</p>}
      </div>
      {icon && <div className="text-2xl text-oat-600">{icon}</div>}
    </div>
  );
}
