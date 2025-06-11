"use client";

import icons from "./Icons/Icons";

export default function Stats() {
  const { Points, Medal, Certificate } = icons;

  const stats = [
    {
      icon: Points,
      value: "3.2k",
      label: "XP Points",
      subtext: "Total earned",
      color: "amber",
      bgGradient: "from-amber-50 to-orange-50",
      iconBg: "bg-amber-100",
      iconColor: "#F59E0B",
    },
    {
      icon: Medal,
      value: "47",
      label: "Achievements",
      subtext: "Badges collected",
      color: "purple",
      bgGradient: "from-purple-50 to-violet-50",
      iconBg: "bg-purple-100",
      iconColor: "#8B5CF6",
    },
    {
      icon: Certificate,
      value: "18",
      label: "Courses",
      subtext: "Total Completed",
      color: "emerald",
      bgGradient: "from-emerald-50 to-green-50",
      iconBg: "bg-emerald-100",
      iconColor: "#10B981",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
            <div
            key={index}
            className={`group relative bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-4 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden md:aspect-square`}
            style={{
              borderWidth: '2px',
              borderColor: stat.color === 'amber' ? 'rgba(251, 191, 36, 0.3)' : 
                    stat.color === 'purple' ? 'rgba(139, 92, 246, 0.3)' : 
                    'rgb(16, 185, 129, 0.3)',
              boxShadow: `0 0 0 0 transparent, 0 0 0 0 transparent, var(--tw-shadow, 0 0 #0000)`
            }}
            onMouseEnter={(e) => {
              const shadowColor = stat.color === 'amber' ? 'rgb(245 158 11 / 0.1)' : 
                       stat.color === 'purple' ? 'rgb(139 92 246 / 0.1)' : 
                       'rgb(16 185 129 / 0.1)';
              e.currentTarget.style.boxShadow = `0 25px 50px -12px ${shadowColor}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 0 transparent';
            }}
            >
            {/* Decorative blur elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-white/40 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-tr from-white/30 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-700"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Icon and Value Row */}
              <div className="flex items-center justify-between mb-4">
              <div
                className={`${stat.iconBg} w-12 h-12 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 shrink-0`}
              >
                <stat.icon color={stat.iconColor} width={30} height={30} />
              </div>
              <div className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                {stat.value}
              </div>
              </div>

              {/* Spacer to push label and subtext to bottom */}
              <div className="flex-1"></div>

              {/* Label and Subtext at bottom */}
              <div className="space-y-1">
              <h3 className="font-semibold text-gray-800 leading-tight">
                {stat.label}
              </h3>
              <p className="text-xs text-gray-600">
                {stat.subtext}
              </p>
              </div>
            </div>
            </div>
        ))}
      </div>

      {/* Learning Streak Section */}
      <div className="bg-gradient-to-r from-blue-50/90 to-purple-50/90 rounded-xl border-2 border-blue-200/60 p-6 relative overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md cursor-pointer group">
        {/* Background blur effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-xl opacity-60 group-hover:scale-125 transition-transform duration-500"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-purple-300/15 to-blue-300/15 rounded-full blur-lg opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 relative z-10">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
              Learning Streak
            </h4>
            <p className="text-sm mt-1 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              Keep up the amazing progress!
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <span className="text-lg font-bold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">5 days</span>
            <div className="flex items-center gap-1.5">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-110 ${
                    i < 5 ? "bg-blue-500 group-hover:bg-blue-600" : "bg-gray-300 group-hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
