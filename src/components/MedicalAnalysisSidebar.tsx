
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Camera,
  Home,
  Brain,
  Heart,
  Activity,
  Users,
  Settings,
  HelpCircle,
  Stethoscope,
  Pill,
  User,
  Calendar,
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

const mainMenuItems = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Medical Analysis', url: '/analysis', icon: Camera },
  { title: 'Symptom Checker', url: '/symptom-checker', icon: Stethoscope },
  { title: 'Health Recommendations', url: '/recommendations', icon: Heart },
  { title: 'Assistant', url: '/assistant', icon: Brain },
  { title: 'Dashboard', url: '/dashboard', icon: Activity },
];

const secondaryMenuItems = [
  { title: 'Ayurvedic Products', url: '/products', icon: Pill },
  { title: 'Nutrition Advisor', url: '/nutrition', icon: Heart },
  { title: 'Fitness Planner', url: '/fitness', icon: Activity },
  { title: 'Consultation', url: '/consultation', icon: Users },
  { title: 'Prakriti Test', url: '/prakriti-test', icon: User },
];

const utilityMenuItems = [
  { title: 'Alerts', url: '/alerts', icon: Calendar },
  { title: 'Subscriptions', url: '/subscriptions', icon: Settings },
  { title: 'Help & Support', url: '#', icon: HelpCircle },
];

export function MedicalAnalysisSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  const getNavClass = (path: string) =>
    isActive(path)
      ? 'bg-primary text-primary-foreground font-medium shadow-sm'
      : 'hover:bg-accent hover:text-accent-foreground transition-colors duration-200';

  return (
    <Sidebar className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Camera className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">AyurGen</span>
            <span className="text-xs text-muted-foreground">AI Medical Platform</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getNavClass(item.url)}>
                    <Link to={item.url} className="flex items-center space-x-3 px-3 py-2 rounded-lg">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2">
            Health Services
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {secondaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getNavClass(item.url)}>
                    <Link to={item.url} className="flex items-center space-x-3 px-3 py-2 rounded-lg">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground px-2">
            Utilities
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {utilityMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={getNavClass(item.url)}>
                    <Link to={item.url} className="flex items-center space-x-3 px-3 py-2 rounded-lg">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
