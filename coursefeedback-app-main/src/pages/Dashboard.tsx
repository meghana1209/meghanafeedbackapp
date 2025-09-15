import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MessageSquare, 
  BookOpen, 
  TrendingUp, 
  Star, 
  Plus,
  Calendar,
  Award,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user, userRole, userProfile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Mock data
  const stats = {
    totalFeedback: 12,
    coursesEnrolled: 5,
    averageRating: 4.2,
    completionRate: 85
  };

  const recentFeedback = [
    {
      id: 1,
      course: 'Computer Science 101',
      rating: 5,
      date: '2024-01-15',
      status: 'submitted'
    },
    {
      id: 2,
      course: 'Mathematics 201',
      rating: 4,
      date: '2024-01-14',
      status: 'submitted'
    },
    {
      id: 3,
      course: 'Physics 150',
      rating: 3,
      date: '2024-01-13',
      status: 'draft'
    }
  ];

  const upcomingDeadlines = [
    {
      course: 'Chemistry 301',
      deadline: '2024-01-20',
      type: 'Mid-term Feedback'
    },
    {
      course: 'English Literature',
      deadline: '2024-01-25',
      type: 'Course Evaluation'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userRole={userRole as any} userName={userProfile?.full_name} userEmail={userProfile?.email} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, <span className="gradient-text">{userProfile?.full_name?.split(' ')[0] || 'Student'}</span>!
          </h1>
          <p className="text-muted-foreground text-lg">
            Your academic feedback dashboard - track your progress and contribute to course improvement.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalFeedback}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.coursesEnrolled}</div>
              <p className="text-xs text-muted-foreground">
                Active this semester
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
                Your feedback quality
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.completionRate}%</div>
              <Progress value={stats.completionRate} className="mt-2" />
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
                      Your latest course feedback submissions
                    </CardDescription>
                  </div>
                  <Link to="/feedback/new">
                    <Button variant="hero" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Feedback
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFeedback.map((feedback) => (
                    <div key={feedback.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h4 className="font-medium">{feedback.course}</h4>
                          <p className="text-sm text-muted-foreground">
                            Submitted on {new Date(feedback.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < feedback.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <Badge variant={feedback.status === 'submitted' ? 'secondary' : 'outline'}>
                          {feedback.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link to="/feedback">
                    <Button variant="outline" className="w-full">
                      View All Feedback
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Deadlines */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Deadlines
                </CardTitle>
                <CardDescription>
                  Don't miss these feedback opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{deadline.course}</h4>
                        <p className="text-xs text-muted-foreground">{deadline.type}</p>
                        <p className="text-xs text-primary font-medium">
                          Due {new Date(deadline.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievement */}
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievement
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold">Feedback Champion</h3>
                  <p className="text-sm text-muted-foreground">
                    Completed 10+ course evaluations this semester
                  </p>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Level 2 Contributor
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;