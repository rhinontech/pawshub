import { 
  MessageSquare, 
  Search, 
  Filter, 
  MoreVertical,
  Flag,
  CheckCircle2,
  AlertTriangle,
  Star,
  Users,
  Eye,
  Trash2,
  UserCheck
} from "lucide-react";

export default function CommunityPage() {
  const posts = [
    { id: 1, author: "Sarah Johnson", content: "Buddy just finished his dental cleanup at PawCare Clinic. Amazing service!", category: "Health", status: "Approved", reach: "1.2k", flags: 0, date: "24 mins ago", spotlight: true },
    { id: 2, author: "Mark Davis", content: "Any recommendations for a dog-friendly park near Downtown?", category: "General", status: "Approved", reach: "842", flags: 0, date: "2h ago", spotlight: false },
    { id: 3, author: "Anonym User", content: "Self-promotion and spam content about crypto...", category: "Spam", status: "Flagged", reach: "12", flags: 8, date: "5h ago", spotlight: false },
    { id: 4, author: "Alice Wu", content: "Missing pet: Labrador Retriever near Central Park. Please help!", category: "Urgent", status: "Verified", reach: "4.5k", flags: 0, date: "8h ago", spotlight: true },
    { id: 5, author: "Tom Harris", content: "Is it normal for a cockatiel to sleep this much?", category: "Q&A", status: "Approved", reach: "215", flags: 0, date: "1d ago", spotlight: false },
  ];

  const highlights = [
    { label: "Total Posts", value: "8,421", change: "+12.4%", icon: MessageSquare },
    { label: "Active Users", value: "245", change: "+4.2%", icon: Users },
    { label: "Flagged Content", value: "12", change: "-15.8%", icon: AlertTriangle },
    { label: "Community Spotlight", value: "4", change: "Active", icon: Star },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Community & Content</h1>
          <p className="text-slate-500 mt-1">Monitor the feed, manage the community spotlight, and moderate content.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-input font-bold text-sm hover:bg-rose-100 transition-colors shadow-sm flex items-center gap-2">
            <ShieldAlert size={18} />
            Review 12 Flags
          </button>
        </div>
      </div>

      {/* Community KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {highlights.map((h, i) => (
          <div key={i} className="bg-white p-6 rounded-card border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-primary-50 rounded-lg">
                <h.icon size={20} className="text-primary-900" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                h.change.startsWith('+') ? "bg-emerald-50 text-emerald-600" : 
                h.change === "Active" ? "bg-primary-50 text-primary-700" :
                "bg-rose-50 text-rose-600"
              }`}>
                {h.change}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-widest text-[10px]">{h.label}</p>
            <p className="text-2xl font-bold text-slate-950 mt-1">{h.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-card border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h3 className="font-bold text-slate-950 whitespace-nowrap">Content Feed</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs font-bold bg-primary-900 text-white rounded-control">Feed</button>
              <button className="px-3 py-1.5 text-xs font-bold bg-slate-100 text-slate-600 rounded-control">Flagged</button>
              <button className="px-3 py-1.5 text-xs font-bold bg-slate-100 text-slate-600 rounded-control">Spotlight</button>
            </div>
          </div>
          <div className="flex items-center gap-3 max-w-sm flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search posts or authors..." 
                className="w-full bg-slate-50 border-none rounded-input pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary-900/10"
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Author & Post Content</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Flags</th>
                <th className="px-6 py-4">Reach</th>
                <th className="px-6 py-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5 max-w-md">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-950 text-xs">{post.author}</span>
                        <span className="text-[11px] text-slate-400 font-medium">• {post.date}</span>
                        {post.spotlight && (
                           <div className="flex items-center gap-1 bg-primary-900/5 px-1.5 py-0.5 rounded text-primary-900 text-[9px] font-bold uppercase tracking-wider">
                            <Star size={8} className="fill-primary-900" />
                            Spotlight
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed italic border-l-2 border-slate-200 pl-3">"{post.content}"</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      post.status === "Approved" || post.status === "Verified" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                      post.status === "Flagged" ? "bg-rose-50 text-rose-600 border border-rose-100 animate-pulse" :
                      "bg-blue-50 text-blue-600 border border-blue-100"
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest text-[10px]">{post.category}</span>
                  </td>
                  <td className="px-6 py-5 text-xs text-slate-500 font-bold">
                    <div className={`flex items-center gap-2 ${post.flags > 0 ? "text-rose-600" : "text-slate-400"}`}>
                      <Flag size={14} className={post.flags > 0 ? "fill-rose-500" : ""} />
                      {post.flags}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Eye size={12} className="text-slate-300" />
                      {post.reach} users
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right flex justify-end gap-2">
                    {post.status === "Flagged" ? (
                      <>
                        <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-100" title="Approve">
                          <UserCheck size={16} />
                        </button>
                         <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-rose-100" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </>
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

// Mock Missing Components
const ShieldAlert = ({ size }: { size: number }) => <AlertTriangle size={size} />;
