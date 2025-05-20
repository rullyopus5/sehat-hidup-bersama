
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Calendar, 
  Heart, 
  FileText, 
  MessageSquare, 
  Users, 
  Settings, 
  LogOut,
  User
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Define navigation items based on user role
  const navItems = {
    patient: [
      { label: 'Dashboard', icon: Home, path: '/dashboard' },
      { label: 'Jadwal Obat', icon: Calendar, path: '/medication' },
      { label: 'Tekanan Darah', icon: Heart, path: '/bloodpressure' },
      { label: 'Tips Kesehatan', icon: FileText, path: '/healthtips' },
      { label: 'Pesan', icon: MessageSquare, path: '/messages' },
    ],
    nurse: [
      { label: 'Dashboard', icon: Home, path: '/dashboard' },
      { label: 'Pasien', icon: Users, path: '/patients' },
      { label: 'Jadwal', icon: Calendar, path: '/schedule' },
      { label: 'Tips Kesehatan', icon: FileText, path: '/healthtips/manage' },
      { label: 'Pesan', icon: MessageSquare, path: '/messages' },
    ],
    admin: [
      { label: 'Dashboard', icon: Home, path: '/dashboard' },
      { label: 'Pengguna', icon: Users, path: '/users' },
      { label: 'Konten Edukasi', icon: FileText, path: '/content' },
      { label: 'Pengaturan', icon: Settings, path: '/settings' },
    ]
  };
  
  const items = user ? navItems[user.role as keyof typeof navItems] : [];

  return (
    <aside className="w-64 hidden md:flex flex-col bg-white border-r shadow-sm">
      <div className="p-4 flex items-center justify-center border-b">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-healthcare-blue flex items-center justify-center">
            <Heart className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-xl text-healthcare-blue">IMO Mantap</span>
        </Link>
      </div>
      
      <div className="flex flex-col justify-between flex-1 p-4">
        <nav className="space-y-1">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 text-sm rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-healthcare-light-blue text-healthcare-blue font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="mt-6 space-y-3">
          <Link
            to="/profile"
            className="flex items-center px-4 py-3 text-sm rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <User className="h-5 w-5 mr-3" />
            Profil Saya
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start px-4 py-3 text-sm rounded-lg text-gray-700 hover:bg-gray-100" 
            onClick={() => logout()}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Keluar
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
