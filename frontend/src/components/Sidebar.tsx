import { NavLink } from 'react-router-dom';

interface SidebarProps {
    alertCount?: number;
}

export default function Sidebar({ alertCount = 0 }: SidebarProps) {
    return (
        <aside className="w-64 flex-shrink-0 bg-background-dark border-r border-slate-800 flex flex-col h-screen sticky top-0">
            {/* Logo */}
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-lg p-2 text-white">
                        <span className="material-symbols-outlined">shield_moon</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-white">SentinelWeather</h1>
                        <p className="text-xs text-slate-500">Safety Intelligence</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`
                    }
                >
                    <span className="material-symbols-outlined">dashboard</span>
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/alerts"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`
                    }
                >
                    <span className="material-symbols-outlined">notifications</span>
                    <span>Alerts</span>
                    {alertCount > 0 && (
                        <span className="ml-auto bg-emergency text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                            {alertCount}
                        </span>
                    )}
                </NavLink>

                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`
                    }
                >
                    <span className="material-symbols-outlined">settings</span>
                    <span>Settings</span>
                </NavLink>

                <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                        }`
                    }
                >
                    <span className="material-symbols-outlined">admin_panel_settings</span>
                    <span>Admin</span>
                </NavLink>
            </nav>

            {/* User Profile */}
            <div className="p-4 mt-auto">
                <div className="p-4 rounded-xl bg-slate-800/50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400">person</span>
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold truncate text-white">Alex Chen</p>
                        <p className="text-xs text-slate-500 truncate">Safety Officer</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
