import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useEffect } from "react";
import { useLocation } from "wouter";
import {
  LayoutDashboard,
  FileText,
  Users,
  UserCheck,
  GraduationCap,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  // ---------- AUTH GUARDS ----------
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      if (import.meta.env.DEV) {
        setLocation("/local-login");
      } else {
        window.location.href = getLoginUrl();
      }
    }
  }, [loading, isAuthenticated, setLocation]);

  useEffect(() => {
    if (!loading && isAuthenticated && user?.role !== "admin") {
      setLocation("/");
    }
  }, [loading, isAuthenticated, user, setLocation]);

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const enabled = isAuthenticated && user?.role === "admin";

  // ---------- DASHBOARD DATA QUERIES ----------
  const { data: publishedNews, isLoading: newsLoading } =
    trpc.news.getPublished.useQuery(undefined, { enabled });

  const { data: learnerApps, isLoading: learnerLoading } =
    trpc.learnerApplications.getAll.useQuery(undefined, { enabled });

  const { data: clientApps, isLoading: clientLoading } =
    trpc.clientApplications.getAll.useQuery(undefined, { enabled });

  const { data: publishedStories, isLoading: storiesLoading } =
    trpc.studentStories.getPublished.useQuery(undefined, { enabled });

  // ---------- DERIVED COUNTS ----------
  const totalNews = publishedNews?.length ?? 0;
  const pendingLearners =
    learnerApps?.filter((a) => a.status === "pending").length ?? 0;
  const pendingClients =
    clientApps?.filter((a) => a.status === "pending").length ?? 0;
  const totalStories = publishedStories?.length ?? 0;

  // (Adjust "pending" above if your status value is different.)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Top Navigation */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="dynamicDNA Academy" className="h-10" />
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  dynamicDNA Academy
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{user.name || "Admin"}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* News Articles */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                News Articles
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {newsLoading ? "…" : totalNews}
              </div>
              <p className="text-xs text-muted-foreground">
                Total published articles
              </p>
            </CardContent>
          </Card>

          {/* Learner Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Learner Applications
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {learnerLoading ? "…" : pendingLearners}
              </div>
              <p className="text-xs text-muted-foreground">
                Pending applications
              </p>
            </CardContent>
          </Card>

          {/* Client Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Client Applications
              </CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {clientLoading ? "…" : pendingClients}
              </div>
              <p className="text-xs text-muted-foreground">
                Pending applications
              </p>
            </CardContent>
          </Card>

          {/* Student Stories */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Student Stories
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {storiesLoading ? "…" : totalStories}
              </div>
              <p className="text-xs text-muted-foreground">
                Published stories
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                className="h-24 flex flex-col gap-2"
                variant="outline"
                onClick={() => setLocation("/admin/news")}
              >
                <FileText className="w-6 h-6" />
                <span>Manage News</span>
              </Button>
              <Button
                className="h-24 flex flex-col gap-2"
                variant="outline"
                onClick={() => setLocation("/admin/learner-applications")}
              >
                <Users className="w-6 h-6" />
                <span>Learner Applications</span>
              </Button>
              <Button
                className="h-24 flex flex-col gap-2"
                variant="outline"
                onClick={() => setLocation("/admin/client-applications")}
              >
                <UserCheck className="w-6 h-6" />
                <span>Client Applications</span>
              </Button>
              <Button
                className="h-24 flex flex-col gap-2"
                variant="outline"
                onClick={() => setLocation("/admin/student-stories")}
              >
                <GraduationCap className="w-6 h-6" />
                <span>Student Stories</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
