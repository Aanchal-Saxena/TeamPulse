import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getStatusCounts } from '../../utils';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CustomLegend } from './';
import { getStatusColor } from '../../constants/statusColors';
import './ChartView.css';

const ChartView: React.FC = () => {
  const { members } = useSelector((state: RootState) => state.members);
  const statusCounts = getStatusCounts(members);
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status !== 'Offline').length;

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
    percentage: Math.round((count / totalMembers) * 100),
    color: getStatusColor(status)
  }));

  return (
    <div className="chart-container">
      <div className="card-header">
        <h3>Status Distribution</h3>
        <div className="chart-stats">
          <span className="active-count">{activeMembers}/{totalMembers} Active</span>
        </div>
      </div>
      <div className="chart-content">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={65}
              innerRadius={35}
              dataKey="value"
              strokeWidth={2}
              stroke="#fff"
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="chart-center">
          <span className="total-members">{totalMembers}</span>
          <span className="total-label">Members</span>
        </div>
      </div>
      <CustomLegend payload={chartData.map(item => ({ 
        value: `${item.name} (${item.percentage}%)`, 
        color: item.color 
      }))} />
    </div>
  );
};

export default ChartView;