import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Plus, Edit, Trash2, Eye } from "lucide-react";
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
  if (!imageUrl) return "/about-hero.jpg";      // fallback image in /public
  if (imageUrl.startsWith("http")) return imageUrl; // full URL
  if (imageUrl.startsWith("/")) return imageUrl;    // already absolute (/uploads/...)
  return `/${imageUrl}`;                            // make "uploads/..." absolute
};

export default function AdminNews() {
  const { user, loading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    category: "General",
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

  const { data: newsList, refetch } = trpc.news.getAll.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const createMutation = trpc.news.create.useMutation({
    onSuccess: () => {
      toast.success("News article created successfully");
      setIsDialogOpen(false);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const updateMutation = trpc.news.update.useMutation({
    onSuccess: () => {
      toast.success("News article updated successfully");
      setIsDialogOpen(false);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const deleteMutation = trpc.news.delete.useMutation({
    onSuccess: () => {
      toast.success("News article deleted successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      category: "General",
      published: false,
    });
    setEditingNews(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingNews) {
      updateMutation.mutate({ id: editingNews.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (news: any) => {
    setEditingNews(news);
    setFormData({
      title: news.title,
      slug: news.slug,
      excerpt: news.excerpt,
      content: news.content,
      imageUrl: news.imageUrl || "",
      category: news.category,
      published: news.published,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this news article?")) {
      deleteMutation.mutate({ id });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
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
            <h1 className="text-3xl font-bold">News Management</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add News Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingNews ? 'Edit News Article' : 'Create News Article'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      if (!editingNews) {
                        setFormData(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                      }
                    }}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <ImageUpload
                  label="Article Image"
                  description="Upload an image for this news article (max 5MB)"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                />
                <div>
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    required
                  />
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
                    {editingNews ? 'Update' : 'Create'} Article
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
            <CardTitle>All News Articles ({newsList?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
  {!newsList || newsList.length === 0 ? (
    <p className="text-center text-muted-foreground py-8">
      No news articles yet. Create your first one!
    </p>
  ) : (
    <div className="space-y-4">
      {newsList.map((news) => (
        <div
          key={news.id}
          className="border rounded-lg p-4 flex items-start justify-between gap-4"
        >
          {/* Thumbnail + preview dialog */}
          {news.imageUrl ? (
            <Dialog>
              <DialogTrigger asChild>
                <button className="relative group focus:outline-none flex-shrink-0">
                  <img
                    src={getImageSrc(news.imageUrl)}
                    alt={news.title}
                    className="w-32 h-24 object-cover rounded-md border"
                  />
                  {/* Hover overlay with Eye icon */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-md">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{news.title}</DialogTitle>
                </DialogHeader>
                <img
                  src={getImageSrc(news.imageUrl)}
                  alt={news.title}
                  className="w-full h-auto object-contain rounded-md"
                />
              </DialogContent>
            </Dialog>
          ) : (
            <div className="w-32 h-24 flex-shrink-0 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
              No image
            </div>
          )}

          {/* Text/content */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h3 className="font-semibold text-lg">{news.title}</h3>
              <Badge variant={news.published ? "default" : "secondary"}>
                {news.published ? "Published" : "Draft"}
              </Badge>
              <Badge variant="outline">{news.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {news.excerpt}
            </p>
            <p className="text-xs text-muted-foreground">
              Created: {new Date(news.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" onClick={() => handleEdit(news)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(news.id)}
            >
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
