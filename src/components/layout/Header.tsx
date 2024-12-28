import { Plus, LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  onAdd: () => void;
}

export function Header({ onLogout, onAdd }: HeaderProps) {
  return (
    <header className="flex justify-between items-center py-6">
      <div className="flex items-center gap-2">
        <h1 className="text-[32px] font-medium text-white">My movies</h1>
        <button 
          onClick={onAdd}
          className="text-white hover:text-white/80 transition-opacity rounded-full border-2 border-white w-8 h-8 flex items-center justify-center"
          aria-label="Add movie"
        >
          <Plus className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>

      <div 
        className="flex items-center gap-2 text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer" 
        onClick={onLogout}
      >
        <span>Logout</span>
        <LogOut className="h-5 w-5" />
      </div>
    </header>
  );
}