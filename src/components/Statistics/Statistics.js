import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useRef, useEffect } from "react";
import { retrieveDocsCount } from "../../firebase";
import { COLLECTIONS } from "../../constants/constants";
import { Typography } from "@mui/material";

export function Statistics() {
  const [data01, setData01] = React.useState([]);

  useEffect(() => {
    const cnt = async () => {
      console.log("in count");

      const maithriCount = await retrieveDocsCount(COLLECTIONS.MAITHRI);
      const manushiCount = await retrieveDocsCount(COLLECTIONS.MANUSHI);
      const snehidhiCount = await retrieveDocsCount(COLLECTIONS.SNEHIDHI);

      setData01([
        { name: COLLECTIONS.MANUSHI, value: manushiCount },
        { name: COLLECTIONS.MAITHRI, value: maithriCount },
        { name: COLLECTIONS.SNEHIDHI, value: snehidhiCount },
      ]);
      console.log(data01);
      console.log("out count");
    };
    cnt();
    // console.log(data01)
  }, []);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${data01[index].name}: ${data01[index].value}`}

        {/* {`${(percent * 100).toFixed(0)}%`} */}
      </text>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 500,
          height: 500,
        },
      }}
    >
      <Paper elevation={0}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
          <text x={500 / 2} y={20} fill="black" textAnchor="middle" dominantBaseline="central">
            <tspan fontSize="14">No of Users</tspan>
        </text>
            <Pie
              data={data01}
              dataKey="value"
              cx="50%"
              cy="50%"
              fill="#82ca9d"
              labelLine={false}
            label={renderCustomizedLabel}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

      </Paper>
    </Box>
  );
}
