import { Grid } from "@mui/material";
import CustomCard from "../CustomCard";
import Chart  from "../Chart";
import { alpha, useTheme } from '@mui/material/styles';

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '40px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value:number) => (value > 0 ? `${value}K` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export default function Dashboard() {
  const chartOptions = useChartOptions();

return (
<Grid container>
  <Grid container>
    <Grid item className={`flex place-items-center`}>
    <CustomCard title={'Saldo Actual'} value={0}/>
    <CustomCard title={'Ingresos'} value={0}/>
    <CustomCard title={'Gastos'} value={0}/>
    <CustomCard title={'Deudas'} value={0}/>
  </Grid>
  <Grid container>

    <Chart
          height={350}
          options={chartOptions}
          series={[
            {
              name: 'Ingresos',
              data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
            },
            {
              name: 'Gastos',
              data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
            }
          ]}
          type="bar"
          width="100%"/>
  </Grid>
  </Grid>


</Grid>)

};
