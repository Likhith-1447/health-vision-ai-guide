
import { useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar } from 'lucide-react';

const UserProfile = () => {
  const { user } = useUser();

  if (!user) return null;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          User Profile
        </CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user.imageUrl} alt={user.fullName || 'User'} />
            <AvatarFallback>
              {user.firstName?.[0]}{user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{user.fullName}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Member since {new Date(user.createdAt!).toLocaleDateString()}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">Health Enthusiast</Badge>
          <Badge variant="outline">Ayurveda</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
