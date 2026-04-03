import { 
  Heart, 
  MapPin, 
  Search, 
  Filter, 
  MoreVertical,
  Plus,
  ShieldCheck,
  ClipboardList,
  PawPrint,
  Clock,
  History,
  CheckCircle2,
  FileSearch,
  MessageCircle,
  ExternalLink
} from "lucide-react";

export default function AdoptionsPage() {
  const adoptions = [
    { id: 1, name: "Bella", species: "Dog", breed: "Labrador Retriever", age: "3y", status: "Active Listing", applications: 12, shelter: "City Animal Shelter", date: "Jan 12, 2024", urgent: false },
    { id: 2, name: "Luna", species: "Cat", breed: "Siamese", age: "1y", status: "In Review", applications: 5, shelter: "City Animal Shelter", date: "Feb 05, 2024", urgent: true },
    { id: 3, name: "Max", species: "Dog", breed: "Beagle", age: "4y", status: "Trial Period", applications: 1, shelter: "Central Vet Hospital", date: "Mar 10, 2024", urgent: false },
    { id: 4, name: "Charlie", species: "Bird", breed: "Cockatiel", age: "1y", status: "Completed", applications: 8, shelter: "Elite Pet Care", date: "Mar 15, 2024", urgent: false },
    { id: 5, name: "Duke", species: "Dog", breed: "German Shepherd", age: "5y", status: "Flagged", applications: 0, shelter: "Private Listing", date: "Dec 20, 2023", urgent: true },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950 uppercase tracking-tight">Adoption Management</h1>
          <p className="text-slate-500 mt-1">Review listings, track adoption applications, and verify rehoming protocols.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-primary-900 text-white rounded-input flex items-center gap-2 font-bold text-sm hover:bg-primary-800 transition-colors shadow-sm">
            <Plus size={18} />
            Post Adoption Listing
          </button>
        </div>
      </div>

      {/* Adoption Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm transition-transform hover:shadow-md duration-300 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-rose-50 rounded-lg">
              <Heart size={20} className="text-rose-600" />
            </div>
            <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider">Active Listings</h3>
          </div>
          <p className="text-3xl font-bold text-slate-950">156 Pets</p>
          <p className="text-xs text-slate-500 font-medium mt-2">+12 this week</p>
        </div>
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm transition-transform hover:shadow-md duration-300 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ClipboardList size={20} className="text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider">Pending Apps</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">42 Requests</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Avg. review: 48h</p>
        </div>
         <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm transition-transform hover:shadow-md duration-300 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Clock size={20} className="text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider">Trial Sessions</h3>
          </div>
          <p className="text-3xl font-bold text-amber-600">18 Pets</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Under observation</p>
        </div>
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm transition-transform hover:shadow-md duration-300 group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
              <CheckCircle2 size={20} className="text-emerald-600" />
            </div>
            <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider">Happy Tails</h3>
          </div>
          <p className="text-3xl font-bold text-emerald-600">842 Total</p>
          <p className="text-xs text-slate-500 font-medium mt-2">Successful adoptions</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-slate-950 whitespace-nowrap">Active Listings</h3>
            <div className="flex items-center space-x-2">
               <button className="px-3 py-1.5 text-xs font-bold bg-primary-900 text-white rounded-control">Active</button>
               <button className="px-3 py-1.5 text-xs font-bold bg-slate-100 text-slate-600 rounded-control">Needs Urgency</button>
            </div>
          </div>
          <div className="flex items-center gap-3 max-w-sm flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search dog, cat, breed..." 
                className="w-full bg-slate-50 border-none rounded-input pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary-900/10"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Pet Detail</th>
                <th className="px-6 py-4">Managed By</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Apps</th>
                <th className="px-6 py-4">Listed Date</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {adoptions.map((pet) => (
                <tr key={pet.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary-50 transition-all duration-300">
                        <PawPrint size={20} />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                           <span className="font-bold text-slate-950 text-xs tracking-tight">{pet.name}</span>
                           {pet.urgent && <span className="bg-rose-50 text-rose-600 p-0.5 rounded px-1.5 font-bold uppercase tracking-widest text-[8px]">Urgent</span>}
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">{pet.breed} • {pet.age}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-700 font-semibold">{pet.shelter}</span>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                        <MapPin size={10} />
                        London, UK
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      pet.status === "Active Listing" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                      pet.status === "In Review" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                      pet.status === "Trail Period" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                      pet.status === "Flagged" ? "bg-rose-50 text-rose-600 border border-rose-100" :
                      "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}>
                      {pet.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold border border-slate-100 px-2 py-1 w-fit rounded-lg bg-slate-50/50">
                      <MessageCircle size={12} className="text-slate-400" />
                      {pet.applications}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-500 font-medium">{pet.date}</td>
                  <td className="px-6 py-5 text-right space-x-2">
                    <button className="p-2 text-slate-400 hover:text-primary-900 transition-colors border border-slate-100 rounded-lg hover:border-primary-100">
                      <ExternalLink size={16} />
                    </button>
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
