import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100/80 backdrop-blur-md border-b border-base-200/40 fixed w-full top-0 z-40">
      <div className="container mx-auto px-6 h-14">
        <div className="flex items-center justify-between h-full">

          {/* Logo */}
          <Link to="/" className="hover:opacity-70 transition-opacity">
            <span className="text-sm font-semibold tracking-wide text-base-content">TabTalk</span>
          </Link>

          {/* Nav Actions */}
          <div className="flex items-center gap-1">
            <Link
              to="/settings"
              title="Settings"
              className="btn btn-ghost btn-sm btn-circle text-base-content/40 hover:text-base-content hover:bg-base-200/50 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </Link>

            {authUser && (
              <>
                <Link
                  to="/profile"
                  title="Profile"
                  className="btn btn-ghost btn-sm btn-circle text-base-content/40 hover:text-base-content hover:bg-base-200/50 transition-colors"
                >
                  <User className="w-4 h-4" />
                </Link>

                <button
                  title="Logout"
                  className="btn btn-ghost btn-sm btn-circle text-base-content/40 hover:text-base-content hover:bg-base-200/50 transition-colors"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;