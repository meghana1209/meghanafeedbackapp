import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, ArrowLeft, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  name: string;
  code: string;
  instructor_name: string;
}

export default function NewFeedback() {
  const { user, userRole, userProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [overallRating, setOverallRating] = useState(0);
  const [contentRating, setContentRating] = useState(0);
  const [instructorRating, setInstructorRating] = useState(0);
  const [difficultyRating, setDifficultyRating] = useState(0);
  const [comments, setComments] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('id, name, code, instructor_name')
      .eq('is_active', true)
      .order('code');

    if (error) {
      console.error('Error fetching courses:', error);
    } else {
      setCourses(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourse || overallRating === 0) {
      toast({
        title: "Error",
        description: "Please select a course and provide an overall rating.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('feedback')
      .insert({
        user_id: user?.id,
        course_id: selectedCourse,
        overall_rating: overallRating,
        content_rating: contentRating || null,
        instructor_rating: instructorRating || null,
        difficulty_rating: difficultyRating || null,
        comments: comments || null,
        suggestions: suggestions || null,
        would_recommend: wouldRecommend,
        is_anonymous: isAnonymous,
        status: 'submitted'
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success!",
        description: "Your feedback has been submitted successfully.",
      });
      navigate('/dashboard');
    }

    setLoading(false);
  };

  const StarRating = ({ rating, setRating, label }: { rating: number; setRating: (rating: number) => void; label: string }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation userRole={userRole} userName={userProfile?.full_name} userEmail={userProfile?.email} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground">
            Submit Course <span className="gradient-text">Feedback</span>
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            Help improve the learning experience by sharing your thoughts
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Course Evaluation</CardTitle>
            <CardDescription>
              Your feedback is valuable and helps us improve our courses and teaching methods.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Course Selection */}
              <div className="space-y-2">
                <Label htmlFor="course">Select Course *</Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a course to evaluate" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.code} - {course.name} ({course.instructor_name})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Ratings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StarRating 
                  rating={overallRating} 
                  setRating={setOverallRating} 
                  label="Overall Rating *" 
                />
                <StarRating 
                  rating={contentRating} 
                  setRating={setContentRating} 
                  label="Course Content" 
                />
                <StarRating 
                  rating={instructorRating} 
                  setRating={setInstructorRating} 
                  label="Instructor" 
                />
                <StarRating 
                  rating={difficultyRating} 
                  setRating={setDifficultyRating} 
                  label="Difficulty Level" 
                />
              </div>

              {/* Comments */}
              <div className="space-y-2">
                <Label htmlFor="comments">Additional Comments</Label>
                <Textarea
                  id="comments"
                  placeholder="Share your thoughts about the course, what you liked, what could be improved..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* Suggestions */}
              <div className="space-y-2">
                <Label htmlFor="suggestions">Suggestions for Improvement</Label>
                <Textarea
                  id="suggestions"
                  placeholder="What specific changes would make this course better?"
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="recommend"
                    checked={wouldRecommend}
                    onCheckedChange={(checked) => setWouldRecommend(checked as boolean)}
                  />
                  <Label htmlFor="recommend">
                    I would recommend this course to other students
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={isAnonymous}
                    onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                  />
                  <Label htmlFor="anonymous">
                    Submit this feedback anonymously
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="hero"
                  disabled={loading || !selectedCourse || overallRating === 0}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}