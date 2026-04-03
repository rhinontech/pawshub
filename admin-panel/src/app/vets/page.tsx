import { 
  Stethoscope, 
  MapPin, 
  Star, 
  Search, 
  MoreVertical,
  ShieldCheck,
  ClipboardList,
  AlertCircle,
  FileCheck
} from "lucide-react";

export default function VetsPage() {
  const vets = [
    { id: 1, name: "Dr. James Wilson", clinic: "PawCare Clinic", specialty: "General & Dental", status: "Verified", rating: 4.8, experience: "12y", city: "London", joined: "Jan 12, 2024" },
    { id: 2, name: "Dr. Priya Sharma", clinic: "Happy Tails Hospital", specialty: "Surgery", status: "In Review", rating: 4.6, experience: "8y", city: "Birmingham", joined: "Feb 05, 2024" },
    { id: 3, name: "Dr. Amy Lee", clinic: "Central Vet Hospital", specialty: "Vaccinations", status: "Verified", rating: 4.9, experience: "15y", city: "Manchester", joined: "Mar 10, 2024" },
    { id: 4, name: "Dr. Sarah Kim", clinic: "Elite Pet Care", specialty: "Internal Med", status: "Pending Fix", rating: 4.5, experience: "6y", city: "Leeds", joined: "Mar 15, 2024" },
    { id: 5, name: "Dr. Robert Chen", clinic: "City Animal Shelter", specialty: "Emergency", status: "Denied", rating: 3.2, experience: "4y", city: "Bristol", joined: "Dec 20, 2023" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Veterinarian Management</h1>
          <p className="text-slate-500 mt-1">Review onboarding clinics and verify professional credentials.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-primary-900 text-white rounded-input flex items-center gap-2 font-bold text-sm hover:bg-primary-800 transition-colors shadow-sm">
            <ClipboardList size={18} />
            Bulk Review
          </button>
        </div>
      </div>

      {/* Verification Queue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 rounded-lg">
              <ClipboardList size={20} className="text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider">Queue</h3>
          </div>
          <p className="text-3xl font-bold text-slate-950">12 Request</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Expected review time: ~4h</p>
        </div>
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <ShieldCheck size={20} className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider">Verified</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-600">152 Total</p>
          <p className="text-xs text-slate-500 font-medium mt-2">+12 this week</p>
        </div>
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileCheck size={20} className="text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider">In Review</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">5 Vets</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Active session with admin</p>
        </div>
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-50 rounded-lg">
              <AlertCircle size={20} className="text-rose-600" />
            </div>
            <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider">Flagged</h3>
          </div>
          <p className="text-3xl font-bold text-rose-600">2 Docs</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Expired credentials or issues</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-bold text-slate-950 whitespace-nowrap">Veterinarian Directory</h3>
          <div className="flex items-center gap-3 max-w-sm flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search veterinarian or clinic..." 
                className="w-full bg-slate-50 border-none rounded-input pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary-900/10"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Clinic & Vet Detail</th>
                <th className="px-6 py-4">Specialty</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">City</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vets.map((vet) => (
                <tr key={vet.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-900 group-hover:bg-primary-900 group-hover:text-white transition-all duration-300">
                        <Stethoscope size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-950 text-xs tracking-tight">{vet.clinic}</span>
                        <span className="text-[11px] text-slate-400 font-medium">{vet.name} • {vet.experience} exp.</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-600 font-medium">{vet.specialty}</td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      vet.status === "Verified" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                      vet.status === "In Review" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                      vet.status === "Denied" ? "bg-rose-50 text-rose-600 border border-rose-100" :
                      "bg-amber-50 text-amber-600 border border-amber-100"
                    }`}>
                      {vet.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <MapPin size={12} className="text-slate-300" />
                      {vet.city}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs font-bold text-slate-700">{vet.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right space-x-2">
                    {vet.status === "Pending Fix" || vet.status === "In Review" ? (
                      <button className="px-3 py-1.5 bg-primary-900 text-white rounded-input text-[10px] font-bold uppercase tracking-wider hover:bg-primary-800 transition-colors shadow-sm">
                        Verify
                      </button>
                    ) : (
                      <button className="p-2 text-slate-400 hover:text-primary-900 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    )}
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
