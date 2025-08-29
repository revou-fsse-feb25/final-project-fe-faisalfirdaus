export default function AdminDashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <StatCard label="Today’s Bookings" value="—" subtext="live" />
      <StatCard label="Revenue" value="—" subtext="past 24h" />
      <StatCard label="Occupancy" value="—" subtext="top hour" />
    </div>
  );
}

function StatCard({
  label,
  value,
  subtext,
}: {
  label: string;
  value: string;
  subtext?: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-5 shadow-sm">
      <div className="text-sm text-neutral-400">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      {subtext ? (
        <div className="mt-1 text-xs text-neutral-500">{subtext}</div>
      ) : null}
    </div>
  );
}
