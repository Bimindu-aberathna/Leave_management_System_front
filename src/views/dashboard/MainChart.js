import React, { useEffect, useRef, useState } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import { CFormCheck } from '@coreui/react'



// Predefined colors for each department
const departmentColors = {
  'Sales': { rgb: '220, 53, 69', name: '--cui-danger' },
  'User Experience': { rgb: '32, 201, 151', name: '--cui-success' },
  'Accounting': { rgb: '13, 110, 253', name: '--cui-primary' },
  'Customer Support': { rgb: '255, 193, 7', name: '--cui-warning' },
  'IT': { rgb: '23, 162, 184', name: '--cui-info' }
}

const MainChart = ({exampleData}) => {
  const chartRef = useRef(null)
  const [visibleDepartments, setVisibleDepartments] = useState(
    Object.fromEntries(exampleData.map(item => [item.department, true]))
  )

  useEffect(() => {
    const handleColorSchemeChange = () => {
      if (chartRef.current) {
        setTimeout(() => {
          const scales = chartRef.current.options.scales;
          ['x', 'y'].forEach(axis => {
            scales[axis].grid.borderColor = getStyle('--cui-border-color-translucent')
            scales[axis].grid.color = getStyle('--cui-border-color-translucent')
            scales[axis].ticks.color = getStyle('--cui-body-color')
          })
          chartRef.current.update()
        })
      }
    }

    document.documentElement.addEventListener('ColorSchemeChange', handleColorSchemeChange)
    return () => {
      document.documentElement.removeEventListener('ColorSchemeChange', handleColorSchemeChange)
    }
  }, [])

  const handleCheckboxChange = (department) => {
    setVisibleDepartments(prev => ({
      ...prev,
      [department]: !prev[department]
    }))
  }

  const filteredData = exampleData.filter(item => visibleDepartments[item.department])

  return (
    <div className="p-4">
      <div className="d-flex flex-wrap flex-row gap-5">
        {exampleData.map((item) => (
          <CFormCheck
            key={item.department}
            id={`checkbox-${item.department}`}
            label={item.department}
            checked={visibleDepartments[item.department]}
            onChange={() => handleCheckboxChange(item.department)}
          />
        ))}
      </div>
      
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
          datasets: filteredData.map((item) => ({
            label: item.department,
            backgroundColor: `rgba(${departmentColors[item.department].rgb}, .1)`,
            borderColor: getStyle(departmentColors[item.department].name),
            pointHoverBackgroundColor: getStyle(departmentColors[item.department].name),
            borderWidth: 2,
            data: item.history,
            fill: true,
          })),
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: 40,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </div>
  )
}

export default MainChart