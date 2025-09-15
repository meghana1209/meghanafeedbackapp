import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  linkLabel?: string;
}

export const AuthLayout = ({ 
  children, 
  title, 
  description, 
  linkText, 
  linkHref, 
  linkLabel 
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold text-white">📚</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">EduFeedback</h1>
            </div>
          </Link>
        </div>

        {/* Auth Card */}
        <Card className="shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription className="text-base">{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {children}
            
            {linkText && linkHref && linkLabel && (
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  {linkText}{' '}
                  <Link to={linkHref} className="text-primary hover:underline font-medium">
                    {linkLabel}
                  </Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};