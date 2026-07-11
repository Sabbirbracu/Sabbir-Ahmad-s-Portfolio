import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  Calendar,
  Clock,
  Code2,
  Eye,
  FileText,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import dashboard sections
import AppointmentsSection from "@/components/admin/AppointmentsSection";
import ArticlesSection from "@/components/admin/ArticlesSection";
import ExperiencesSection from "@/components/admin/ExperiencesSection";
import ProjectsSection from "@/components/admin/ProjectsSection";
import SkillsSection from "@/components/admin/SkillsSection";

type TabType = "overview" | "articles" | "experiences" | "skills" | "projects" | "appointments" | "settings";

const sidebarItems = [
  { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
  { id: "articles" as const, label: "Articles", icon: FileText },
  { id: "experiences" as const, label: "Experiences", icon: Briefcase },
  { id: "skills" as const, label: "Skills", icon: Code2 },
  { id: "projects" as const, label: "Projects", icon: FolderOpen },
  { id: "appointments" as const, label: "Appointments", icon: Calendar },
  { id: "settings" as const, label: "Settings", icon: Settings },
];

const stats = [
  { label: "Total Views", value: "12,543", change: "+12%", icon: Eye, color: "text-blue-500" },
  { label: "Articles", value: "24", change: "+3", icon: FileText, color: "text-green-500" },
  { label: "Appointments", value: "8", change: "+2", icon: Calendar, color: "text-purple-500" },
  { label: "Avg. Read Time", value: "4.2m", change: "+0.5m", icon: Clock, color: "text-orange-500" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewContent />;
      case "articles":
        return <ArticlesSection />;
      case "experiences":
        return <ExperiencesSection />;
      case "skills":
        return <SkillsSection />;
      case "projects":
        return <ProjectsSection />;
      case "appointments":
        return <AppointmentsSection />;
      case "settings":
        return <SettingsContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen bg-card border-r border-border transition-all duration-300",
          sidebarOpen ? "w-64" : "w-0 lg:w-20"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-lg"
              >
                Admin Panel
              </motion.span>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:flex hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={cn(
                "w-full justify-start gap-3 text-muted-foreground hover:text-destructive",
                !sidebarOpen && "justify-center"
              )}
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-4 lg:px-8 bg-card/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <h1 className="text-xl font-semibold capitalize">{activeTab}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">AD</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

// Overview Content Component
const OverviewContent = () => (
  <div className="space-y-8">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </p>
                </div>
                <div className={cn("p-3 rounded-xl bg-muted/50", stat.color)}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>

    {/* Charts Placeholder */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Page Views
          </CardTitle>
          <CardDescription>Last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground text-sm">Chart will be rendered here</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Popular Articles
          </CardTitle>
          <CardDescription>Top performing content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">#{i}</span>
                  <span className="text-sm">Sample Article Title {i}</span>
                </div>
                <span className="text-xs text-muted-foreground">{1000 - i * 100} views</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Recent Activity */}
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { action: "Published article", item: "Getting Started with React 19", time: "2 hours ago" },
            { action: "Updated project", item: "E-commerce Platform", time: "5 hours ago" },
            { action: "New appointment", item: "John Doe - Career Consultation", time: "1 day ago" },
            { action: "Added skill", item: "TypeScript", time: "2 days ago" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.action}</span>
                  <span className="text-muted-foreground"> - {activity.item}</span>
                </p>
              </div>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

// Settings Content Component
const SettingsContent = () => (
  <Card className="bg-card/50 backdrop-blur-sm border-border/50">
    <CardHeader>
      <CardTitle>Settings</CardTitle>
      <CardDescription>Manage your admin preferences</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">Settings panel coming soon...</p>
    </CardContent>
  </Card>
);

export default Dashboard;
