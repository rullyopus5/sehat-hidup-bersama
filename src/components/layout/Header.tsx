
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, User } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  
  const roleLabel = {
    patient: 'Pasien',
    nurse: 'Perawat',
    admin: 'Admin'
  }[user?.role || 'patient'];

  return (
    <header className="bg-white shadow-sm py-2 px-4 border-b flex items-center justify-between">
      <div className="md:hidden">
        {/* Mobile menu trigger would go here */}
      </div>
      
      <div className="flex-1 md:text-center md:flex-none">
        <h1 className="text-xl font-semibold text-healthcare-blue hidden md:inline">
          IMO Mantap
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="relative" aria-label="Notifikasi">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-healthcare-red rounded-full"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full" aria-label="Profil">
              <Avatar>
                <AvatarImage src={user?.avatarUrl} alt={user?.name || 'User'} />
                <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{roleLabel}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Pengaturan</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>Keluar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
