import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import 'chart.js/auto';

Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

/**
 * Reusable Chart component (bar or pie). Pass labels, values, type, and dataset label.
 */
const ChartComponent = ({ labels, values, type = 'bar', label = 'Amount' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const config = {
      type,
      data: {
        labels,
        datasets: [{
          label,
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
      },
      options: {
        responsive: true,
      },
    };
    const chart = new Chart(ctx, config);
    return () => {
      chart.destroy();
    };
  }, [labels, values, type, label]);

  return <canvas ref={canvasRef} />;
};

export default ChartComponent;