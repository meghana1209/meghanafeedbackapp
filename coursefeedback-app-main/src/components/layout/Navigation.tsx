import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen,
  MessageSquare,
  User,
  Settings,
  LogOut,
  BarChart3,
  Users,
  Shield
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  userRole?: 'student' | 'admin';
  userName?: string;
  userEmail?: string;
}

export const Navigation = ({ userRole = 'student', userName = 'John Doe', userEmail = 'john@university.edu' }: NavigationProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = userRole === 'admin' ? [
    { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/feedback', label: 'All Feedback', icon: MessageSquare },
    { href: '/admin/courses', label: 'Courses', icon: BookOpen },
    { href: '/admin/users', label: 'Users', icon: Users },
  ] : [
    { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/feedback', label: 'My Feedback', icon: MessageSquare },
    { href: '/courses', label: 'Courses', icon: BookOpen },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bg-background border-b border-border shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-lg font-bold text-white">📚</span>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">EduFeedback</h1>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {userRole === 'admin' && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Shield className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarImage src="/avatars/default.png" alt={userName} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {userName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-muted-foreground">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};