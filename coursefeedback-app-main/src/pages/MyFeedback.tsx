import { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Plus,
  Star,
  Calendar,
  Filter,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FeedbackWithCourse {
  id: string;
  overall_rating: number;
  content_rating: number;
  instructor_rating: number;
  difficulty_rating: number;
  comments: string;
  suggestions: string;
  would_recommend: boolean;
  is_anonymous: boolean;
  status: string;
  created_at: string;
  courses: {
    code: string;
    name: string;
    instructor_name: string;
  };
}

export default function MyFeedback() {
  const { user, userRole, userProfile } = useAuth();
  const [feedback, setFeedback] = useState<FeedbackWithCourse[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<FeedbackWithCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (user) {
      fetchMyFeedback();
    }
  }, [user]);

  useEffect(() => {
    filterFeedback();
  }, [feedback, searchTerm, statusFilter]);

  const fetchMyFeedback = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select(`
          *,
          courses!inner(code, name, instructor_name)
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching feedback:', error);
      } else {
        setFeedback(data || []);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterFeedback = () => {
    let filtered = feedback;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.courses.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.courses.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.courses.instructor_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredFeedback(filtered);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'submitted': return 'secondary';
      case 'reviewed': return 'secondary';
      case 'draft': return 'outline';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Navigation userRole={userRole} userName={userProfile?.full_name} userEmail={userProfile?.email} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your feedback...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userRole={userRole} userName={userProfile?.full_name} userEmail={userProfile?.email} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              My <span className="gradient-text">Feedback</span>
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              View and manage all your course feedback submissions
            </p>
          </div>
          <Link to="/feedback/new">
            <Button variant="hero">
              <Plus className="h-4 w-4 mr-2" />
              New Feedback
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full sm:w-[200px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback List */}
        {filteredFeedback.length > 0 ? (
          <div className="grid gap-6">
            {filteredFeedback.map((item) => (
              <Card key={item.id} className="shadow-elegant card-hover">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {item.courses.code} - {item.courses.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <span>Instructor: {item.courses.instructor_name}</span>
                        <span>•</span>
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < item.overall_rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm font-medium">{item.overall_rating}/5</span>
                      </div>
                      <Badge variant={getStatusBadgeVariant(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {item.content_rating && (
                      <div className="text-center p-3 bg-accent/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Content</p>
                        <div className="flex items-center justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < item.content_rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {item.instructor_rating && (
                      <div className="text-center p-3 bg-accent/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Instructor</p>
                        <div className="flex items-center justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < item.instructor_rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {item.difficulty_rating && (
                      <div className="text-center p-3 bg-accent/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">Difficulty</p>
                        <div className="flex items-center justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < item.difficulty_rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {item.comments && (
                    <div className="mb-3">
                      <h4 className="font-medium text-sm mb-2">Comments:</h4>
                      <p className="text-sm text-muted-foreground bg-accent/20 p-3 rounded-lg">
                        {item.comments}
                      </p>
                    </div>
                  )}

                  {item.suggestions && (
                    <div className="mb-3">
                      <h4 className="font-medium text-sm mb-2">Suggestions:</h4>
                      <p className="text-sm text-muted-foreground bg-accent/20 p-3 rounded-lg">
                        {item.suggestions}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {item.would_recommend && (
                        <span className="text-success">✓ Would recommend</span>
                      )}
                      {item.is_anonymous && (
                        <span>🔒 Anonymous</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No feedback found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : "You haven't submitted any feedback yet."}
              </p>
              <Link to="/feedback/new">
                <Button variant="hero">
                  <Plus className="h-4 w-4 mr-2" />
                  Submit Your First Feedback
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}