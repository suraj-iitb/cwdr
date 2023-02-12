import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { PieChart, Pie, ResponsiveContainer } from 'recharts';

const data01 = [
    { name: 'Manushi', value: 400 },
    { name: 'Mythri', value: 300 },
    { name: 'Snehdi', value: 200 },
  ];

export function Statistics() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 500,
          height: 500,
        },
      }}
    >
      <Paper elevation={0}>
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie data={data01} dataKey="value" cx="50%" cy="50%" fill="#82ca9d" label />
            </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}