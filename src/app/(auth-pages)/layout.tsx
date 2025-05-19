import "@/styles/globals.css";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div className="content-grid">{children}</div>
      </body>
    </html>
  );
}
