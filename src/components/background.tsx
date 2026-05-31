export function Background() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(37,99,235,0.28),transparent_34%),radial-gradient(circle_at_85%_8%,rgba(124,58,237,0.24),transparent_30%),linear-gradient(180deg,#020617_0%,#08111f_48%,#020617_100%)]" />
      <div className="enterprise-grid absolute inset-0 opacity-40" />
    </div>
  );
}
