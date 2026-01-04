import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, Legend
} from 'recharts';
import { themeStats, categoryStats, decadeStats, thematicRadarData } from '../data';

// Custom colors
const COLORS = {
  blue: '#3b82f6',
  lightBlue: '#60a5fa',
  amber: '#f59e0b',
  red: '#ef4444',
  green: '#10b981',
  purple: '#8b5cf6',
  slate: '#64748b',
};

const GRADIENT_COLORS = [
  '#3b82f6', '#60a5fa', '#93c5fd', '#6366f1', '#8b5cf6', '#a78bfa', '#38bdf8', '#22d3ee', '#2dd4bf', '#34d399'
];

// Enhanced Bar Chart for Themes
export const ThemesChart: React.FC = () => {
  return (
    <div className="w-full h-[450px] bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-2xl">
      <h3 className="text-xl font-bold text-slate-100 mb-6 text-center serif">
        Temas Más Representados en el Cine
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={themeStats}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            {themeStats.map((_, index) => (
              <linearGradient key={`gradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={GRADIENT_COLORS[index % GRADIENT_COLORS.length]} stopOpacity={0.8} />
                <stop offset="100%" stopColor={GRADIENT_COLORS[(index + 1) % GRADIENT_COLORS.length]} stopOpacity={1} />
              </linearGradient>
            ))}
          </defs>
          <XAxis
            type="number"
            stroke="#64748b"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={{ stroke: '#475569' }}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={130}
            tick={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 500 }}
            stroke="#475569"
            axisLine={{ stroke: '#475569' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              borderColor: '#334155',
              color: '#f1f5f9',
              borderRadius: '12px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            itemStyle={{ color: '#cbd5e1' }}
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
            formatter={(value: number) => [`${value} películas`, 'Frecuencia']}
          />
          <Bar dataKey="count" radius={[0, 8, 8, 0]} animationDuration={1500}>
            {themeStats.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#barGradient-${index})`}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Pie Chart for Category Distribution
export const CategoryPieChart: React.FC = () => {
  const renderCustomLabel = ({ name, percent }: { name: string; percent: number }) => {
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-2xl">
      <h3 className="text-xl font-bold text-slate-100 mb-4 text-center serif">
        Distribución por Categoría
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
            </filter>
          </defs>
          <Pie
            data={categoryStats}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            innerRadius={40}
            dataKey="value"
            animationBegin={200}
            animationDuration={1500}
            paddingAngle={3}
            stroke="rgba(15, 23, 42, 0.8)"
            strokeWidth={3}
          >
            {categoryStats.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                style={{ filter: 'url(#shadow)' }}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              borderColor: '#334155',
              borderRadius: '12px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
            formatter={(value: number, name: string) => [`${value} películas`, name]}
          />
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            formatter={(value) => <span style={{ color: '#e2e8f0', marginLeft: '8px' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Radar Chart for Thematic Analysis
export const ThematicRadarChart: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-2xl">
      <h3 className="text-xl font-bold text-slate-100 mb-4 text-center serif">
        Análisis Temático
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={thematicRadarData}>
          <defs>
            <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <PolarGrid
            stroke="#475569"
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 500 }}
            stroke="#64748b"
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            stroke="#475569"
          />
          <Radar
            name="Intensidad Temática"
            dataKey="A"
            stroke="#3b82f6"
            fill="url(#radarGradient)"
            strokeWidth={2}
            animationDuration={1500}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              borderColor: '#334155',
              borderRadius: '12px'
            }}
            formatter={(value: number) => [`${value}%`, 'Intensidad']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Timeline Area Chart
export const TimelineChart: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-2xl">
      <h3 className="text-xl font-bold text-slate-100 mb-4 text-center serif">
        Películas por Década
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={decadeStats}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="villainGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="complexGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="decade"
            stroke="#64748b"
            tick={{ fill: '#e2e8f0', fontSize: 12 }}
            axisLine={{ stroke: '#475569' }}
          />
          <YAxis
            stroke="#64748b"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={{ stroke: '#475569' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              borderColor: '#334155',
              borderRadius: '12px'
            }}
          />
          <Legend
            verticalAlign="top"
            iconType="circle"
            formatter={(value) => <span style={{ color: '#e2e8f0', marginLeft: '8px', textTransform: 'capitalize' }}>{value}</span>}
          />
          <Area
            type="monotone"
            dataKey="hero"
            name="Héroe"
            stackId="1"
            stroke="#3b82f6"
            fill="url(#heroGradient)"
            strokeWidth={2}
            animationDuration={1500}
          />
          <Area
            type="monotone"
            dataKey="villain"
            name="Villano"
            stackId="1"
            stroke="#ef4444"
            fill="url(#villainGradient)"
            strokeWidth={2}
            animationDuration={1500}
          />
          <Area
            type="monotone"
            dataKey="complex"
            name="Complejo"
            stackId="1"
            stroke="#f59e0b"
            fill="url(#complexGradient)"
            strokeWidth={2}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Stats summary cards
export const StatsCards: React.FC = () => {
  const stats = [
    { label: 'Total Películas Analizadas', value: '3,000+', color: 'from-blue-500 to-blue-600' },
    { label: 'Temas Identificados', value: '85', color: 'from-amber-500 to-orange-600' },
    { label: 'Expertos Consultados', value: '450+', color: 'from-purple-500 to-purple-600' },
    { label: 'Décadas Cubiertas', value: '8', color: 'from-green-500 to-emerald-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative overflow-hidden bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 group hover:scale-105 transition-transform duration-300"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
          <div className="relative z-10">
            <span className={`block text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
              {stat.value}
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">
              {stat.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};