import styled from "styled-components";
import {
  Pie,
  ResponsiveContainer,
  PieChart,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

import Heading from "../../ui/Heading";
import { useDarkMode } from "../../hooks/useDarkMode";
import { DURATION_CATEGORIES } from "../../utils/constants";
import { prepareDurationData } from "../../utils/helpers";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();

  const startData = isDarkMode
    ? DURATION_CATEGORIES.DARK
    : DURATION_CATEGORIES.LIGHT;

  const data = prepareDurationData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer height={240} width="100%">
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="cicle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
