import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      {/* Sidebar */}
      {/* Header */}

      <main>
        <Outlet />
      </main>
    </div>
  );
}