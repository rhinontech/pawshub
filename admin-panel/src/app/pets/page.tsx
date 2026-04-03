import { 
  PawPrint, 
  Search, 
  Filter, 
  ChevronRight, 
  MoreVertical,
  Activity,
  Heart,
  Droplets,
  Calendar
} from "lucide-react";

export default function PetsPage() {
  const pets = [
    { id: 1, name: "Buddy", species: "Dog", breed: "Golden Retriever", age: "2y", owner: "Sarah Johnson", status: "Healthy", score: 92, lastVisit: "Mar 15, 2024" },
    { id: 2, name: "Luna", species: "Cat", breed: "Siamese", age: "1y", owner: "Sarah Johnson", status: "Checkup Due", score: 84, lastVisit: "Jan 10, 2024" },
    { id: 3, name: "Max", species: "Dog", breed: "Beagle", age: "4y", owner: "Mark Davis", status: "Healthy", score: 95, lastVisit: "Feb 22, 2024" },
    { id: 4, name: "Bella", species: "Dog", breed: "Labrador", age: "3y", owner: "Alice Wu", status: "Medicated", score: 78, lastVisit: "Feb 28, 2024" },
    { id: 5, name: "Charlie", species: "Bird", breed: "Cockatiel", age: "1y", owner: "Tom Harris", status: "Healthy", score: 88, lastVisit: "Dec 05, 2023" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-widest font-bold">
          <PawPrint size={14} className="text-primary-900" />
          <span>Ecosystem</span>
          <ChevronRight size={14} className="text-slate-300" />
          <span className="text-slate-900">Pet Listings</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-input font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm">
            Export Records
          </button>
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-950">Pet Ecosystem Overview</h1>
        <p className="text-slate-500 mt-1 shadow-primary-900/5">Monitoring 3,456 active pets across the PawsHub network.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-primary-900/5 translate-x-4 -translate-y-4">
            <PawPrint size={100} />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Activity size={20} className="text-primary-900" />
            </div>
            <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider">Health Status</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-bold text-slate-950">84.2<span className="text-xl font-medium text-slate-400">%</span></p>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+2.1% Monthly</span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-4">Above network benchmark (78%)</p>
        </div>

        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-rose-900/5 translate-x-4 -translate-y-4">
            <Heart size={100} />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-50 rounded-lg">
              <Heart size={20} className="text-rose-600" />
            </div>
            <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider">Active Adoptions</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-bold text-slate-950">156</p>
            <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-full">Urgent 12</span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-4">Average resolve time: 14 days</p>
        </div>

        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 text-blue-900/5 translate-x-4 -translate-y-4">
            <Droplets size={100} />
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Droplets size={20} className="text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-950 text-xs uppercase tracking-wider">Vaccine Compliance</h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-4xl font-bold text-slate-950">91.8<span className="text-xl font-medium text-slate-400">%</span></p>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Target Met</span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-4">312 doses pending next 30 days</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-slate-950 whitespace-nowrap">Pet Database</h3>
            <div className="flex gap-1.5">
              <span className="px-2 py-1 bg-white border border-slate-200 text-stone-500 text-[10px] font-bold rounded-lg cursor-pointer">Dogs</span>
              <span className="px-2 py-1 bg-white border border-slate-200 text-stone-500 text-[10px] font-bold rounded-lg cursor-pointer">Cats</span>
              <span className="px-2 py-1 bg-white border border-slate-200 text-stone-500 text-[10px] font-bold rounded-lg cursor-pointer">Other</span>
            </div>
          </div>
          <div className="flex items-center gap-3 max-w-sm flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search name, breed, owner..." 
                className="w-full bg-slate-50 border-none rounded-input pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary-900/10"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-600 rounded-input text-xs font-bold hover:bg-slate-200 transition-colors">
              <Filter size={14} />
              Filter
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Pet Detail</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Health Score</th>
                <th className="px-6 py-4">Last Visit</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pets.map((pet) => (
                <tr key={pet.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                        <PawPrint size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-950 text-xs tracking-tight">{pet.name}</span>
                        <span className="text-[11px] text-slate-400 font-medium">{pet.breed} • {pet.age}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs text-slate-700 font-semibold">{pet.owner}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      pet.status === "Healthy" ? "bg-emerald-50 text-emerald-600" :
                      pet.status === "Checkup Due" ? "bg-amber-50 text-amber-600" :
                      "bg-blue-50 text-blue-600"
                    }`}>
                      {pet.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <div className="flex-1 w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${pet.score > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${pet.score}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{pet.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar size={12} className="text-slate-300" />
                      {pet.lastVisit}
                    </div>
                  </td>
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
