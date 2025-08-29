import React from "react";

const bookings = () => {
  return <div>bookings</div>;
};

export default bookings;

// "use client";

// import * as React from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { toast } from "sonner";
// import {
//   useAdminBookings,
//   useAdminCancelBooking,
//   useAdminClaimBooking,
// } from "@/hooks/useBookings";

// export default function AdminBookingsPage() {
//   const [status, setStatus] = React.useState("");
//   const { data, isLoading, refetch } = useAdminBookings({
//     status: status || undefined,
//   });
//   const cancel = useAdminCancelBooking();
//   const claim = useAdminClaimBooking();

//   const items = data?.items ?? [];

//   async function handleCancel(booking_reference: string) {
//     await cancel
//       .mutateAsync({ bookingReference: booking_reference })
//       .then(() => {
//         toast.success("Booking cancelled");
//         refetch();
//       })
//       .catch((e: any) => toast.error(e.message || "Failed"));
//   }

//   async function handleClaim(booking_reference: string) {
//     await claim
//       .mutateAsync(booking_reference)
//       .then(() => {
//         toast.success("Booking claimed");
//         refetch();
//       })
//       .catch((e: any) => toast.error(e.message || "Failed"));
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center gap-2">
//         <select
//           className="border rounded-md px-3 py-2 text-sm"
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//         >
//           <option value="">All statuses</option>
//           <option value="Pending">Pending</option>
//           <option value="Confirmed">Confirmed</option>
//           <option value="Claimed">Claimed</option>
//           <option value="Cancelled">Cancelled</option>
//           <option value="Expired">Expired</option>
//         </select>
//         <Button variant="outline" onClick={() => refetch()}>
//           Refresh
//         </Button>
//       </div>

//       <div className="rounded-md border overflow-x-auto">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Reference</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>User</TableHead>
//               <TableHead>Showtime</TableHead>
//               <TableHead>Total</TableHead>
//               <TableHead className="w-[220px]">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {isLoading ? (
//               <TableRow>
//                 <TableCell colSpan={6}>Loading…</TableCell>
//               </TableRow>
//             ) : items.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={6}>No bookings</TableCell>
//               </TableRow>
//             ) : (
//               items.map((b: any) => (
//                 <TableRow key={b.booking_reference}>
//                   <TableCell className="font-mono">
//                     {b.booking_reference}
//                   </TableCell>
//                   <TableCell>{b.booking_status}</TableCell>
//                   <TableCell>#{b.user_id}</TableCell>
//                   <TableCell>#{b.showtime_id}</TableCell>
//                   <TableCell>
//                     {b.total_amount.toLocaleString("id-ID")}
//                   </TableCell>
//                   <TableCell className="flex gap-2">
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       onClick={() => handleCancel(b.booking_reference)}
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       size="sm"
//                       onClick={() => handleClaim(b.booking_reference)}
//                     >
//                       Claim
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
