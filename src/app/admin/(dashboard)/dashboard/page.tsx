import {
  StatCard,
  IoListOutline,
  IoCompassOutline,
  IoPeopleOutline,
  IoRepeatOutline,
  DASHBOARD_HEADING,
  DASHBOARD_DESCRIPTION,
  DASHBOARD_STAT_LABELS,
  DASHBOARD_STAT_HREFS,
  fetchDashboardStats,
} from "./import";

export default async function AdminDashboardPage() {
  const stats = await fetchDashboardStats();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl font-normal text-[#101010]">{DASHBOARD_HEADING}</h1>
        <p className="mt-1 font-sans text-sm text-[#10101099]">{DASHBOARD_DESCRIPTION}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label={DASHBOARD_STAT_LABELS.actions}
          value={stats.actionsCount}
          icon={<IoListOutline size={22} />}
          href={DASHBOARD_STAT_HREFS.actions}
        />
        <StatCard
          label={DASHBOARD_STAT_LABELS.areas}
          value={stats.areasCount}
          icon={<IoCompassOutline size={22} />}
          href={DASHBOARD_STAT_HREFS.areas}
        />
        <StatCard
          label={DASHBOARD_STAT_LABELS.authors}
          value={stats.authorsCount}
          icon={<IoPeopleOutline size={22} />}
          href={DASHBOARD_STAT_HREFS.authors}
        />
        <StatCard
          label={DASHBOARD_STAT_LABELS.frequencies}
          value={stats.frequenciesCount}
          icon={<IoRepeatOutline size={22} />}
          href={DASHBOARD_STAT_HREFS.frequencies}
        />
      </div>
    </div>
  );
}
