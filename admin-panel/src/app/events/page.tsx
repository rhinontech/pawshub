import { 
  Plus, 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  Search, 
  MoreVertical
} from "lucide-react";

export default function EventsPage() {
  const events = [
    { id: 1, title: "Puppy Social Mixer", date: "April 15, 2026", time: "2:00 PM", location: "Central Park Bark", category: "Social", status: "Upcoming", attendees: 24 },
    { id: 2, title: "Free Vaccination Drive", date: "April 20, 2026", time: "9:00 AM", location: "Downtown Community Center", category: "Health", status: "Upcoming", attendees: 156 },
    { id: 3, title: "Basic Obedience Workshop", date: "May 02, 2026", time: "11:00 AM", location: "PawsHub Training Hall", category: "Training", status: "Draft", attendees: 0 },
    { id: 4, title: "Adopt-a-Thon Weekend", date: "March 28, 2026", time: "10:00 AM", location: "City Animal Shelter", category: "Adoption", status: "Completed", attendees: 420 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Event Management</h1>
          <p className="text-slate-500 mt-1">Create and monitor community events, workshops, and drives.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-primary-900 text-white rounded-input flex items-center gap-2 font-bold text-sm hover:bg-primary-800 transition-colors shadow-sm">
            <Plus size={18} />
            Create Event
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm transition-transform hover:scale-[1.01]">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Upcoming This Month</p>
          <p className="text-3xl font-bold text-slate-950 mt-2">8 Events</p>
        </div>
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm transition-transform hover:scale-[1.01]">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Reach</p>
          <p className="text-3xl font-bold text-slate-950 mt-2">2.4k Users</p>
        </div>
        <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm transition-transform hover:scale-[1.01]">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Top Category</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">Health Drives</p>
        </div>
      </div>

      <div className="bg-white rounded-card border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-950">All Events</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-bold bg-slate-100 text-slate-600 rounded-control">Past</button>
            <button className="px-3 py-1.5 text-xs font-bold bg-primary-900 text-white rounded-control">Active</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Event Detail</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Schedule</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Reach</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-950 group-hover:text-primary-900 transition-colors uppercase tracking-tight text-xs">{event.title}</span>
                      <span className="text-xs text-slate-500 font-medium">{event.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      event.status === "Upcoming" ? "bg-primary-50 text-primary-700" :
                      event.status === "Draft" ? "bg-slate-100 text-slate-500" :
                      "bg-emerald-50 text-emerald-600"
                    }`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col text-xs text-slate-700 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon size={12} className="text-slate-400" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1.5 font-medium text-slate-500">
                        <Clock size={12} className="text-slate-400" />
                        {event.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-slate-400" />
                      {event.location}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-400" style={{ width: `${Math.min(event.attendees, 100)}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{event.attendees}</span>
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
