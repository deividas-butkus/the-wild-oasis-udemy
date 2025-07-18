import {
  HiOutlineBriefcase,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabins }) {
  // 1.
  const numBookings = bookings.length;

  // 2.
  const sales = formatCurrency(
    bookings.reduce((acc, cur) => acc + cur.totalPrice, 0),
  );

  // 3.
  const checkins = confirmedStays.length;

  // 4.
  const occupation = confirmedStays.reduce(
    (acc, cur) => acc + cur.numNights,
    0,
  );
  const numCabins = cabins.length;
  // num checked in nights / all available nights (num days * num kabins)
  const occupancyRate =
    Math.round((occupation / (numDays * numCabins)) * 100) + "%";

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={sales}
      />{" "}
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />{" "}
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupancyRate}
      />
    </>
  );
}

export default Stats;
