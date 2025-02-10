import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 
            onClick={() => navigate('/')}
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
          >
            MyApp
          </h1>
          
          <nav className="flex items-center gap-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2"
            >
              <User size={18} />
              Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="flex items-center gap-2"
            >
              <LogOut size={18} />
              Sign Out
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;