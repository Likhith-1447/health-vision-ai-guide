
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, UserPlus, LogIn } from 'lucide-react';

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/50 to-muted/30 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Welcome to AyurWellness</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to access your personalized health analysis and recommendations
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignedOut>
            <div className="space-y-3">
              <SignInButton mode="modal" fallbackRedirectUrl="/">
                <Button variant="default" className="w-full" size="lg">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal" fallbackRedirectUrl="/">
                <Button variant="outline" className="w-full" size="lg">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </SignedOut>
          <SignedIn>
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">You are signed in!</p>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-12 h-12"
                  }
                }}
              />
            </div>
          </SignedIn>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
