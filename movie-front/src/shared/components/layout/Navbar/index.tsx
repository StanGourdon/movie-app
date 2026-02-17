// Barre de navigation globale : logo, liens (accueil, compte), auth si besoin.
import { Search } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="flex h-full">
        <div className="flex self-center w-full justify-between mx-16">
            <img className="h-[77px] w-[382px]" src="src/assets/title.png" alt="" />
            <div className="relative  flex items-center">
              <input 
                className="h-12 w-96 border-quaternary border-4 rounded-full p-3" 
                type="text" 
                placeholder="Rechercher un film..."/>
              <Search
                className="
                  absolute 
                  right-4 
                  top-1/2 
                  -translate-y-1/2 
                  text-gray-600
                "
                size={20}
              />
            </div>
            <div className="flex justify-between w-72 items-center">
                <button 
                  className="w-32 h-12 border-4 border-quaternary rounded-lg bg-secondary text-white">
                    Login
                </button>
                <button 
                  className="w-32 h-12 border-4 border-quaternary rounded-lg bg-tertiary text-white">
                    Register
                </button>
            </div>
        </div>    
    </div>
  );
};