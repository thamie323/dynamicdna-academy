import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { APP_TITLE } from "@/const";

/**
 * Local Development Login Page
 * 
 * This page is only for local development. It allows you to log in
 * with an email address that exists in your local database.
 * 
 * In production, this page should be disabled or removed, and OAuth
 * authentication should be used instead.
 */
export default function LocalLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      // Call the local login API endpoint
      const response = await fetch("/api/local-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      toast.success("Login successful!");
      
      // Redirect to admin dashboard
      setTimeout(() => {
        window.location.href = "/admin";
      }, 500);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Local Development Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your admin email to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@dynamicdna.co.za"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <p className="text-sm text-muted-foreground">
                Use the email address from your local database users table
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This login page is for local development only. 
                In production, OAuth authentication is used.
              </p>
            </div>

            <div className="mt-4 text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => setLocation("/")}
              >
                Back to Home
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="fixed bottom-4 right-4 text-sm text-muted-foreground">
        {APP_TITLE}
      </div>
    </div>
  );
}