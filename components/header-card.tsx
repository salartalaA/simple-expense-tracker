export default function HeaderCard({
  title,
  amount,
  customIcon,
}: {
  title: string;
  amount: number | null;
  customIcon: React.JSX.Element;
}) {
  return (
    <div className="rounded-xl border bg-white p-5 text-[#14181f] shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-[#676f7e] text-sm">{title}</p>
          <p className="mt-1 font-bold text-2xl">
            ${amount ? Math.round(amount) : 0}
          </p>
        </div>
        {customIcon}
      </div>
    </div>
  );
}
