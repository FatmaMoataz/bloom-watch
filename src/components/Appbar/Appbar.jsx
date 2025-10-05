import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi"; 
import logo from "../../assets/images/BloomSphere logo.svg";

const GOOGLE_CLIENT_ID = "478763016513-23ar598mrj8v1ahpvo3l0gpupeiri06u.apps.googleusercontent.com";

export default function Appbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('googleUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    loadGoogleScript();
  }, []);

  const loadGoogleScript = () => {
    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      return; 
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleOAuth;
    document.head.appendChild(script);
  };

  const initializeGoogleOAuth = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        auto_select: false,
      });
    }
  };

  const handleGoogleResponse = (response) => {
    setIsLoading(true);
    
    try {
      const token = response.credential;
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      
      const userData = {
        name: decodedPayload.name,
        email: decodedPayload.email,
        avatar: decodedPayload.picture,
        token: token
      };

      setUser(userData);
      localStorage.setItem('googleUser', JSON.stringify(userData));
      console.log("User logged in:", userData);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
      setIsLoginDropdownOpen(false);
      setIsOpen(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!window.google) {
      console.error("Google OAuth not loaded yet");
      return;
    }

    const googleButton = document.createElement('div');
    googleButton.style.display = 'none';
    document.body.appendChild(googleButton);

    window.google.accounts.id.renderButton(googleButton, {
      theme: 'filled_blue',
      size: 'large',
      type: 'standard'
    });

    setTimeout(() => {
      const button = googleButton.querySelector('div[role="button"]');
      if (button) {
        button.click();
      } else {
        window.google.accounts.id.prompt();
      }
      document.body.removeChild(googleButton);
    }, 100);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('googleUser');
    
    if (window.google && user?.email) {
      window.google.accounts.id.revoke(user.email, () => {
        console.log("User logged out");
      });
    }
    
    setIsLoginDropdownOpen(false);
    setIsOpen(false);
  };

  const renderLoginDropdown = () => (
    <div className="absolute top-12 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="w-5 h-5"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Sign in to BloomSphere</h3>
            <p className="text-xs text-gray-500">with Google</p>
          </div>
        </div>
      </div>
      
      {user ? (
        <div className="py-2">
          <div className="flex items-center gap-3 px-4 py-3">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <>
          <div className="p-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-700">
                {isLoading ? "Signing in..." : "Sign in with Google"}
              </span>
            </button>
          </div>

          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              To continue, Google will share your name, email address, and profile picture with BloomSphere.
            </p>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="flex text-lg justify-between items-center p-2 bg-[rgba(255,255,255,0.99)] relative">
      <NavLink to="/">
        <img src={logo} alt="BloomSphere" className="w-28 cursor-pointer" />
      </NavLink>

      <ul className="hidden md:flex space-x-6">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#E2758B] font-semibold" : "text-[#67620E] hover:text-[#E2758B]"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? "text-[#E2758B] font-semibold" : "text-[#67620E] hover:text-[#E2758B]"
            }
          >
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/lets-play"
            className={({ isActive }) =>
              isActive ? "text-[#E2758B] font-semibold" : "text-[#67620E] hover:text-[#E2758B]"
            }
          >
            Let's Play
          </NavLink>
        </li>
      </ul>

      <div className="hidden md:flex gap-2 relative">
        <div 
          className="relative"
          onMouseEnter={() => !isLoading && !user && setIsLoginDropdownOpen(true)}
          onMouseLeave={() => setIsLoginDropdownOpen(false)}
        >
          <button 
            className={`px-4 py-2 cursor-pointer rounded-xl transition-colors ${
              user 
                ? "text-[#E2758B] font-semibold hover:text-[#e0657d]" 
                : "text-white bg-[#E2758B] hover:bg-[#e0657d]"
            }`}
            onClick={() => user ? handleLogout() : setIsLoginDropdownOpen(!isLoginDropdownOpen)}
          >
            {user ? user.name : "Login"}
          </button>
          {isLoginDropdownOpen && !user && renderLoginDropdown()}
        </div>

        {!user && (
          <button className="text-[#E2758B] px-4 py-2 cursor-pointer hover:text-[#e0657d] rounded-xl transition-colors">
            Sign Up
          </button>
        )}
      </div>

      <button
        className="md:hidden text-2xl text-[#E2758B] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      {isOpen && (
        <div className="absolute top-28 left-0 w-full cursor-pointer bg-white shadow-lg flex flex-col items-center gap-4 py-6 md:hidden z-50">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-[#E2758F] font-semibold" : "text-gray-700"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/explore"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-[#E2758F] font-semibold" : "text-gray-700"
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/lets-play"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? "text-[#E2758F] font-semibold" : "text-gray-700"
            }
          >
            Let's Play
          </NavLink>

          <div className="flex flex-col gap-3 w-full px-8">
            {user ? (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <img 
                        src="https://www.google.com/favicon.ico" 
                        alt="Google" 
                        className="w-5 h-5"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">Sign in to BloomSphere</h3>
                        <p className="text-xs text-gray-500">with Google</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <button
                      onClick={handleGoogleLogin}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <img 
                        src="https://www.google.com/favicon.ico" 
                        alt="Google"
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {isLoading ? "Signing in..." : "Sign in with Google"}
                      </span>
                    </button>
                  </div>
                </div>
                <button className="text-[#E2758F] px-4 py-3 rounded-xl cursor-pointer hover:text-[#e0657d] transition-colors">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}