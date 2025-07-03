import React from 'react';
import './CustomLegend.css';

interface LegendItem {
  value: string;
  color: string;
}

interface CustomLegendProps {
  payload?: LegendItem[];
}

const CustomLegend: React.FC<CustomLegendProps> = ({ payload }) => {
  if (!payload) return null;

  return (
    <div className="custom-legend">
      {payload.map((entry, index) => (
        <div key={index} className="legend-item">
          <div 
            className="legend-circle" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="legend-text">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;