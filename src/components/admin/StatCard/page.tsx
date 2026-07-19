import { Link } from "./import";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  href?: string;
}

export default function StatCard({ label, value, icon, href }: StatCardProps) {
  const content = (
    <div className="flex items-center gap-4 rounded-2xl border border-[#DBDBDB] bg-white p-6 transition-colors hover:border-[#D89593]">
      {icon && (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#D89593]/10 text-[#D89593]">
          {icon}
        </div>
      )}
      <div>
        <p className="font-sans text-sm text-[#10101099]">{label}</p>
        <p className="font-display text-3xl font-normal text-[#101010]">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
