
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden transition-all duration-300 hover:scale-105"
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 ${theme === 'dark' ? 'rotate-90 scale-0' : ''}`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 ${theme === 'dark' ? 'rotate-0 scale-100' : ''}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
