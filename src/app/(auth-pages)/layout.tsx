export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="content-grid">{children}</div>
  );
}
