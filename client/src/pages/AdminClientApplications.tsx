import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Eye, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminClientApplications() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

    useEffect(() => {
    if (!loading && !isAuthenticated) {
      // In development, use local login page
      if (import.meta.env.DEV) {
        setLocation('/local-login');
      } else {
        window.location.href = getLoginUrl();
      }
    }
  }, [loading, isAuthenticated, setLocation]);

  useEffect(() => {
    if (!loading && isAuthenticated && user?.role !== 'admin') {
      setLocation('/');
    }
  }, [loading, isAuthenticated, user, setLocation]);

  const { data: allApplications, refetch: refetchAll } = trpc.clientApplications.getAll.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const updateStatusMutation = trpc.clientApplications.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Application status updated successfully");
      setIsDialogOpen(false);
      setSelectedApplication(null);
      setAdminNotes("");
      refetchAll();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setAdminNotes(application.adminNotes || "");
    setIsDialogOpen(true);
  };

  const handleUpdateStatus = (status: "approved" | "declined") => {
    if (!selectedApplication) return;
    
    updateStatusMutation.mutate({
      id: selectedApplication.id,
      status,
      adminNotes,
    });
  };

  const filteredApplications = allApplications?.filter(app => {
    if (activeTab === "all") return true;
    return app.status === activeTab;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const pendingCount = allApplications?.filter(app => app.status === 'pending').length || 0;
  const approvedCount = allApplications?.filter(app => app.status === 'approved').length || 0;
  const declinedCount = allApplications?.filter(app => app.status === 'declined').length || 0;

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => setLocation('/admin')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold">Client Applications</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Declined</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{declinedCount}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
                <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
                <TabsTrigger value="declined">Declined ({declinedCount})</TabsTrigger>
                <TabsTrigger value="all">All ({allApplications?.length || 0})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-4">
                {!filteredApplications || filteredApplications.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No applications in this category.</p>
                ) : (
                  <div className="space-y-4">
                    {filteredApplications.map((application) => (
                      <div key={application.id} className="border rounded-lg p-4 flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{application.companyName}</h3>
                            <Badge variant={
                              application.status === 'approved' ? 'default' :
                              application.status === 'declined' ? 'destructive' :
                              'secondary'
                            }>
                              {application.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            <strong>Contact:</strong> {application.contactPerson} ({application.jobTitle})
                          </p>
                          <p className="text-sm text-muted-foreground mb-1">
                            <strong>Email:</strong> {application.email} | <strong>Phone:</strong> {application.phone}
                          </p>
                          <p className="text-sm text-muted-foreground mb-1">
                            <strong>Industry:</strong> {application.industry} | <strong>Employees:</strong> {application.numberOfEmployees}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Applied: {new Date(application.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewApplication(application)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Client Application Details</DialogTitle>
            </DialogHeader>
            {selectedApplication && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Company Name</Label>
                    <p className="font-medium">{selectedApplication.companyName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Registration Number</Label>
                    <p className="font-medium">{selectedApplication.registrationNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Industry</Label>
                    <p className="font-medium">{selectedApplication.industry}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Number of Employees</Label>
                    <p className="font-medium">{selectedApplication.numberOfEmployees}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Contact Person</Label>
                    <p className="font-medium">{selectedApplication.contactPerson}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Job Title</Label>
                    <p className="font-medium">{selectedApplication.jobTitle}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Phone</Label>
                    <p className="font-medium">{selectedApplication.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Company Address</Label>
                    <p className="font-medium">{selectedApplication.companyAddress}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">City</Label>
                    <p className="font-medium">{selectedApplication.city}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Province</Label>
                    <p className="font-medium">{selectedApplication.province}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Postal Code</Label>
                    <p className="font-medium">{selectedApplication.postalCode}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground">Training Needs</Label>
                    <p className="font-medium">{selectedApplication.trainingNeeds}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Service Interest</Label>
                    <p className="font-medium">{selectedApplication.serviceInterest}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Preferred Training Mode</Label>
                    <p className="font-medium">{selectedApplication.preferredTrainingMode}</p>
                  </div>
                  {selectedApplication.estimatedLearners && (
                    <div>
                      <Label className="text-muted-foreground">Estimated Learners</Label>
                      <p className="font-medium">{selectedApplication.estimatedLearners}</p>
                    </div>
                  )}
                  {selectedApplication.timeframe && (
                    <div>
                      <Label className="text-muted-foreground">Timeframe</Label>
                      <p className="font-medium">{selectedApplication.timeframe}</p>
                    </div>
                  )}
                  {selectedApplication.budgetRange && (
                    <div>
                      <Label className="text-muted-foreground">Budget Range</Label>
                      <p className="font-medium">{selectedApplication.budgetRange}</p>
                    </div>
                  )}
                  {selectedApplication.additionalInfo && (
                    <div className="col-span-2">
                      <Label className="text-muted-foreground">Additional Information</Label>
                      <p className="font-medium">{selectedApplication.additionalInfo}</p>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="adminNotes">Admin Notes</Label>
                  <Textarea
                    id="adminNotes"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                    placeholder="Add notes about this application..."
                  />
                </div>

                {selectedApplication.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleUpdateStatus('approved')}
                      disabled={updateStatusMutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      onClick={() => handleUpdateStatus('declined')}
                      disabled={updateStatusMutation.isPending}
                      variant="destructive"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Decline
                    </Button>
                  </div>
                )}

                {selectedApplication.status !== 'pending' && (
                  <div className="border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                      Status: <Badge variant={selectedApplication.status === 'approved' ? 'default' : 'destructive'}>
                        {selectedApplication.status}
                      </Badge>
                    </p>
                    {selectedApplication.reviewedAt && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Reviewed: {new Date(selectedApplication.reviewedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
