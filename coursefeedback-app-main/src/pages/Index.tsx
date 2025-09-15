import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Shield, 
  Star,
  ArrowRight,
  CheckCircle,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Smart Feedback System",
      description: "Submit detailed course feedback with ratings, comments, and suggestions for improvement."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard", 
      description: "Track your feedback history and see how your input contributes to course enhancement."
    },
    {
      icon: Shield,
      title: "Secure & Anonymous",
      description: "Your feedback is protected with enterprise-grade security and optional anonymity."
    },
    {
      icon: Users,
      title: "Admin Management",
      description: "Comprehensive admin tools for managing courses, users, and analyzing feedback trends."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      quote: "EduFeedback made it so easy to provide meaningful course feedback. The interface is intuitive and my suggestions were actually implemented!"
    },
    {
      name: "Dr. Michael Roberts",
      role: "Course Administrator", 
      quote: "The analytics dashboard gives us incredible insights into student satisfaction and helps us continuously improve our curriculum."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold text-white">📚</span>
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">EduFeedback</h1>
                <p className="text-xs text-muted-foreground">Academic Excellence</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="hero">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary">
              🎓 Trusted by 10,000+ Students
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6">
              Transform Your 
              <span className="gradient-text block lg:inline"> Academic Experience</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance mb-10 max-w-3xl mx-auto">
              The most comprehensive student feedback platform designed to bridge the gap between 
              students and educators, creating better learning experiences for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="hero" size="lg" className="min-w-[200px]">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Student Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Why Choose <span className="gradient-text">EduFeedback</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built specifically for academic institutions with powerful features 
              that make feedback collection and analysis seamless.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="card-hover text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">50,000+</div>
              <p className="text-muted-foreground">Feedback Submissions</p>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">200+</div>
              <p className="text-muted-foreground">Educational Institutions</p>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text mb-2">98%</div>
              <p className="text-muted-foreground">Student Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground">Real feedback from students and administrators</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <blockquote className="text-lg mb-4">"{testimonial.quote}"</blockquote>
                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <strong>{testimonial.name}</strong> • {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="shadow-elegant bg-gradient-primary text-white">
            <CardContent className="py-16">
              <h2 className="text-3xl font-bold mb-6">
                Ready to Improve Your Academic Experience?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Join thousands of students and educators using EduFeedback to create 
                better learning environments through meaningful feedback.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button variant="secondary" size="lg">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Create Student Account
                  </Button>
                </Link>
                <Link to="/admin/signup">
                  <Button variant="glass" size="lg">
                    <Shield className="mr-2 h-5 w-5" />
                    Admin Access
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 lg:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">📚</span>
              </div>
              <span className="font-semibold gradient-text">EduFeedback</span>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-muted-foreground">
                © 2024 EduFeedback. Built with ❤️ for academic excellence.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
