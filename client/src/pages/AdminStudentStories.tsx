import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import ImageUpload from "@/components/ImageUpload";

const getImageSrc = (imageUrl?: string | null) => {
  if (!imageUrl) return "/about-hero.jpg";
  if (imageUrl.startsWith("http")) return imageUrl;
  if (imageUrl.startsWith("/")) return imageUrl;
  return `/${imageUrl}`;
};


export default function AdminStudentStories() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<any>(null);

  const [formData, setFormData] = useState({
    studentName: "",
    program: "",
    graduationYear: new Date().getFullYear(),
    currentPosition: "",
    company: "",
    imageUrl: "",
    story: "",
    quote: "",
    featured: false,
    published: false,
  });

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

  const { data: storiesList, refetch } = trpc.studentStories.getAll.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const createMutation = trpc.studentStories.create.useMutation({
    onSuccess: () => {
      toast.success("Student story created successfully");
      setIsDialogOpen(false);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const updateMutation = trpc.studentStories.update.useMutation({
    onSuccess: () => {
      toast.success("Student story updated successfully");
      setIsDialogOpen(false);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const deleteMutation = trpc.studentStories.delete.useMutation({
    onSuccess: () => {
      toast.success("Student story deleted successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const resetForm = () => {
    setFormData({
      studentName: "",
      program: "",
      graduationYear: new Date().getFullYear(),
      currentPosition: "",
      company: "",
      imageUrl: "",
      story: "",
      quote: "",
      featured: false,
      published: false,
    });
    setEditingStory(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStory) {
      updateMutation.mutate({ id: editingStory.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (story: any) => {
    setEditingStory(story);
    setFormData({
      studentName: story.studentName,
      program: story.program,
      graduationYear: story.graduationYear,
      currentPosition: story.currentPosition || "",
      company: story.company || "",
      imageUrl: story.imageUrl || "",
      story: story.story,
      quote: story.quote || "",
      featured: story.featured,
      published: story.published,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this student story?")) {
      deleteMutation.mutate({ id });
    }
  };

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

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => setLocation('/admin')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold">Student Stories Management</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Student Story
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingStory ? 'Edit Student Story' : 'Create Student Story'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="studentName">Student Name *</Label>
                  <Input
                    id="studentName"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="program">Program *</Label>
                  <Input
                    id="program"
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="graduationYear">Graduation Year *</Label>
                  <Input
                    id="graduationYear"
                    type="number"
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="currentPosition">Current Position</Label>
                  <Input
                    id="currentPosition"
                    value={formData.currentPosition}
                    onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <ImageUpload
                  label="Student Photo"
                  description="Upload a photo of the student (max 5MB)"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                />
                <div>
                  <Label htmlFor="story">Story *</Label>
                  <Textarea
                    id="story"
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    rows={8}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="quote">Quote</Label>
                  <Textarea
                    id="quote"
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {editingStory ? 'Update' : 'Create'} Story
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Student Stories ({storiesList?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
  {!storiesList || storiesList.length === 0 ? (
    <p className="text-center text-muted-foreground py-8">
      No student stories yet. Create your first one!
    </p>
  ) : (
    <div className="space-y-4">
      {storiesList.map((story) => (
        <div
          key={story.id}
          className="border rounded-lg p-4 flex items-start justify-between gap-4"
        >
          {/* Thumbnail on the left */}
          {story.imageUrl && (
            <img
              src={getImageSrc(story.imageUrl)}
              alt={story.studentName}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
          )}

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg">{story.studentName}</h3>
              <Badge variant={story.published ? "default" : "secondary"}>
                {story.published ? "Published" : "Draft"}
              </Badge>
              {story.featured && <Badge variant="outline">Featured</Badge>}
            </div>
            <p className="text-sm text-muted-foreground mb-1">
              <strong>Program:</strong> {story.program} |{" "}
              <strong>Graduated:</strong> {story.graduationYear}
            </p>
            {story.currentPosition && (
              <p className="text-sm text-muted-foreground mb-1">
                <strong>Current Position:</strong> {story.currentPosition}
                {story.company && ` at ${story.company}`}
              </p>
            )}
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {story.story}
            </p>
            <p className="text-xs text-muted-foreground">
              Created: {new Date(story.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleEdit(story)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleDelete(story.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )}
</CardContent>

        </Card>
      </div>
    </div>
  );
}
