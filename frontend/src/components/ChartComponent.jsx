import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './ChartComponent.css';

const ChartComponent = ({ 
  type, 
  data, 
  options = {}, 
  height = 300,
  className = '' 
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    
    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#cbd5e1',
            font: {
              size: 12,
              family: "'Inter', sans-serif"
            },
              padding: 20
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(30, 41, 59, 0.9)',
          titleColor: '#ffffff',
          bodyColor: '#cbd5e1',
          borderColor: 'rgba(37, 99, 235, 0.3)',
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
          displayColors: true,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  minimumFractionDigits: 2
                }).format(context.parsed.y);
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#94a3b8',
            font: {
              size: 11
            }
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#94a3b8',
            font: {
              size: 11
            },
            callback: function(value) {
              return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0
              }).format(value);
            }
          }
        }
      },
      animation: {
        duration: 1000,
        easing: 'easeInOutQuart'
      }
    };

    // Merge default options with custom options
    const mergedOptions = mergeDeep(defaultOptions, options);

    chartInstance.current = new Chart(ctx, {
      type,
      data,
      options: mergedOptions
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  // Deep merge utility function
  const mergeDeep = (target, source) => {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
        if (isObject(source[key])) {
          if (!(key in target))
            Object.assign(output, { [key]: source[key] });
          else
            output[key] = mergeDeep(target[key], source[key]);
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  };

  const isObject = (item) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
  };

  return (
    <div className={`chart-container ${className}`}>
      <canvas
        ref={chartRef}
        height={height}
        style={{ maxHeight: height }}
      />
    </div>
  );
};

export default ChartComponent;
