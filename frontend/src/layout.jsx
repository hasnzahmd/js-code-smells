import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function Layout({ children }) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "25rem",
        "--sidebar-width-mobile": "20rem",
      }}
    >
      <div style={{ display: "flex", height: "100vh" }}>
        <AppSidebar />
        <main style={{ flex: 1, overflow: "auto" }}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
