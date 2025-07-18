import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,

    onError: (err) => toast.error(err.message),
  });

  return { isLoading, booking, error };
}
