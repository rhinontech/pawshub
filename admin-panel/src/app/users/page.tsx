import { 
  Users, 
  Search, 
  MoreVertical, 
  Mail, 
  UserPlus,
  ShieldAlert,
  CheckCircle2,
  Clock
} from "lucide-react";

export default function UsersPage() {
  const users = [
    { id: 1, name: "Sarah Johnson", email: "sarah@pawshub.com", role: "Pet Owner", status: "Active", pets: 3, joined: "Jan 12, 2024" },
    { id: 2, name: "Dr. James Wilson", email: "dr.wilson@pawshub.com", role: "Veterinarian", status: "Verified", clinic: "PawCare Clinic", joined: "Feb 05, 2024" },
    { id: 3, name: "Dr. Priya Sharma", email: "dr.priya@pawshub.com", role: "Veterinarian", status: "Pending", clinic: "Happy Tails Hospital", joined: "Mar 10, 2024" },
    { id: 4, name: "Mark Davis", email: "mark@example.com", role: "Pet Owner", status: "Active", pets: 1, joined: "Mar 15, 2024" },
    { id: 5, name: "Linda Smith", email: "linda@rescues.org", role: "Shelter Admin", status: "Active", joined: "Dec 20, 2023" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">User Management</h1>
          <p className="text-slate-500 mt-1">Manage pet owners, veterinarians, and system administrators.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-primary-900 text-white rounded-input flex items-center gap-2 font-bold text-sm hover:bg-primary-800 transition-colors shadow-sm">
            <UserPlus size={18} />
            Add User
          </button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm transition-transform hover:translate-y-[-2px] duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Users size={20} className="text-primary-900" />
            </div>
            <span className="text-emerald-600 bg-emerald-50 text-[10px] font-bold px-2 py-0.5 rounded-full">+4%</span>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest text-[10px]">Total Users</p>
          <p className="text-2xl font-bold text-slate-950 mt-1">1,284</p>
        </div>
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm transition-transform hover:translate-y-[-2px] duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CheckCircle2 size={20} className="text-blue-600" />
            </div>
            <span className="text-blue-600 bg-blue-50 text-[10px] font-bold px-2 py-0.5 rounded-full">New</span>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest text-[10px]">Active Owners</p>
          <p className="text-2xl font-bold text-slate-950 mt-1">842</p>
        </div>
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm transition-transform hover:translate-y-[-2px] duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Clock size={20} className="text-amber-600" />
            </div>
            <span className="text-amber-600 bg-amber-50 text-[10px] font-bold px-2 py-0.5 rounded-full">3 Request</span>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest text-[10px]">Pending Vets</p>
          <p className="text-2xl font-bold text-slate-950 mt-1">12</p>
        </div>
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm transition-transform hover:translate-y-[-2px] duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-rose-50 rounded-lg">
              <ShieldAlert size={20} className="text-rose-600" />
            </div>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-widest text-[10px]">Reported</p>
          <p className="text-2xl font-bold text-slate-950 mt-1">2</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <h3 className="font-bold text-slate-950 whitespace-nowrap">All Users</h3>
          <div className="flex-1 flex justify-end gap-3 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search name, email..." 
                className="w-full bg-slate-50 border-none rounded-input pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary-900/10"
              />
            </div>
            <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-input text-xs font-bold hover:bg-slate-200 transition-colors">
              Filter
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Pet Count</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-900 font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-950 text-xs tracking-tight">{user.name}</span>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <Mail size={10} />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-700 font-medium">{user.role}</td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.status === "Active" || user.status === "Verified" ? "bg-emerald-50 text-emerald-600" :
                      user.status === "Pending" ? "bg-amber-50 text-amber-600" :
                      "bg-slate-100 text-slate-500"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-500 font-medium">{user.joined}</td>
                  <td className="px-6 py-5 text-xs text-slate-700 font-bold">{user.role === "Pet Owner" ? user.pets : "-"}</td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-primary-900 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
