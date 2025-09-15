import { useState, useEffect } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Star,
  Plus,
  BarChart3,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface DashboardStats {
  totalFeedback: number;
  totalCourses: number;
  totalUsers: number;
  averageRating: number;
}

export default function AdminDashboard() {
  const { userRole, userProfile } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalFeedback: 0,
    totalCourses: 0,
    totalUsers: 0,
    averageRating: 0
  });
  const [recentFeedback, setRecentFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const [feedbackCount, coursesCount, usersCount, avgRating, recentFeedbackData] = await Promise.all([
        supabase.from('feedback').select('*', { count: 'exact', head: true }),
        supabase.from('courses').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('feedback').select('overall_rating'),
        supabase
          .from('feedback')
          .select(`
            *,
            profiles!inner(full_name),
            courses!inner(name, code)
          `)
          .order('created_at', { ascending: false })
          .limit(5)
      ]);

      // Calculate average rating
      const ratings = avgRating.data || [];
      const avgRatingValue = ratings.length > 0 
        ? ratings.reduce((sum, item) => sum + item.overall_rating, 0) / ratings.length 
        : 0;

      setStats({
        totalFeedback: feedbackCount.count || 0,
        totalCourses: coursesCount.count || 0,
        totalUsers: usersCount.count || 0,
        averageRating: Math.round(avgRatingValue * 10) / 10
      });

      setRecentFeedback(recentFeedbackData.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
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
            <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userRole={userRole} userName={userProfile?.full_name} userEmail={userProfile?.email} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage courses, users, and monitor feedback across your institution.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalFeedback}</div>
              <p className="text-xs text-muted-foreground">
                Submitted by students
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground">
                Currently offered
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                Registered students
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.averageRating}/5</div>
              <p className="text-xs text-muted-foreground">
                Overall satisfaction
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Feedback */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Recent Feedback
                    </CardTitle>
                    <CardDescription>
                      Latest feedback submissions from students
                    </CardDescription>
                  </div>
                  <Link to="/admin/feedback">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFeedback.length > 0 ? (
                    recentFeedback.map((feedback) => (
                      <div key={feedback.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="flex-1">
                            <h4 className="font-medium">
                              {feedback.courses.code} - {feedback.courses.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {feedback.is_anonymous ? 'Anonymous' : feedback.profiles.full_name} • {new Date(feedback.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < feedback.overall_rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <Badge variant={getStatusBadgeVariant(feedback.status)}>
                            {feedback.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No feedback submitted yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/admin/courses">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Manage Courses
                  </Button>
                </Link>
                <Link to="/admin/users">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </Button>
                </Link>
                <Link to="/admin/feedback">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View All Feedback
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <Badge variant="secondary">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Feedback System</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Registration</span>
                    <Badge variant="secondary">Open</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}