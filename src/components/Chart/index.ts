import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';


const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => null
});

export default Chart