import { 
  Users, 
  PawPrint, 
  Stethoscope, 
  Bell, 
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Total Users", value: "1,284", icon: Users, change: "+12%" },
    { label: "Active Pets", value: "3,456", icon: PawPrint, change: "+5.4%" },
    { label: "Vets Joined", value: "152", icon: Stethoscope, change: "+3%" },
    { label: "Active Events", value: "12", icon: Bell, change: "+4" },
    { label: "Adoptions", value: "842", icon: ShieldCheck, change: "+18.2%" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back, here's what's happening with PawsHub today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-card border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="bg-primary-50 p-3 rounded-xl">
                <stat.icon className="text-primary-900" size={24} />
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-950 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth Chart Card */}
        <div className="lg:col-span-2 bg-white rounded-card border border-slate-200 shadow-sm p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-950">Growth Activity</h3>
            <TrendingUp className="text-slate-400" size={20} />
          </div>
          <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium italic">Chart visualization would go here</p>
          </div>
        </div>

        {/* Sidebar/Pending Review Card */}
        <div className="bg-white rounded-card border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-950 mb-6">Pending Verifications</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-950 truncate">City Vet Clinic #{item}</p>
                  <p className="text-xs text-slate-500">Submitted {item}h ago</p>
                </div>
                <button className="text-xs font-bold text-primary-900 hover:underline">Review</button>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 rounded-input hover:bg-slate-200 transition-colors">
            View All
          </button>
        </div>
      </div>

      {/* Recent User Activity */}
      <div className="bg-white rounded-card border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-bold text-slate-950 mb-6">Recent User Activity</h3>
        <div className="space-y-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-950 text-ellipsis overflow-hidden truncate">User Account Activity #{item}</p>
                  <p className="text-xs text-slate-500">Updated profile and added a new pet.</p>
                </div>
              </div>
              <span className="text-xs text-slate-400">24 mins ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
