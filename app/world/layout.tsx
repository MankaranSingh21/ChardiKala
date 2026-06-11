import WorldSubnav from "@/components/WorldSubnav";

export default function WorldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="worldWing">
      <WorldSubnav />
      {children}
    </div>
  );
}
