export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
    >
      {children}
    </div>
  );
}
