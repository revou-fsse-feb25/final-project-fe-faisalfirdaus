// "use client";

// import * as React from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// // ---- Schema (with coercion) ----
// const MovieSchema = z.object({
//   title: z.string().min(2),
//   description: z.string().min(10),
//   duration_minutes: z.coerce.number().int().min(1),
//   poster_url: z.string().url(),
//   status: z.enum(["COMING_SOON", "NOW_SHOWING", "ARCHIVED"]),
//   is_active: z.coerce.boolean(),
// });

// // BEFORE / AFTER types for Option A
// type MovieInput = z.input<typeof MovieSchema>; // resolver input (unknowns for coerce fields)
// type MovieOutput = z.output<typeof MovieSchema>; // resolver output (number/boolean applied)

// export type MovieFormValues = MovieOutput;

// export function MovieForm({
//   defaultValues,
//   onSubmit,
//   onCancel,
//   submitting,
// }: {
//   defaultValues?: Partial<MovieInput>;
//   onSubmit: (values: MovieOutput) => void | Promise<void>;
//   onCancel?: () => void;
//   submitting?: boolean;
// }) {
//   // useForm with 3 generics so RHF knows resolver transforms input -> output
//   const form = useForm<MovieInput, any, MovieOutput>({
//     resolver: zodResolver(MovieSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       duration_minutes: 120, // can be string or number; resolver will coerce
//       poster_url: "",
//       status: "COMING_SOON",
//       is_active: true, // can be "true"/"false" or boolean; resolver will coerce
//       ...defaultValues,
//     } as MovieInput,
//   });

//   const { register, formState } = form;
//   const { errors } = formState;

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
//         {/* Title */}
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Title</FormLabel>
//               <FormControl>
//                 <Input placeholder="Movie title" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Description */}
//         <FormField
//           control={form.control}
//           name="description"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Description</FormLabel>
//               <FormControl>
//                 <textarea
//                   className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm focus:outline-none"
//                   rows={4}
//                   placeholder="Short synopsis…"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
//           {/* Duration (use register to avoid value: unknown) */}
//           <FormField
//             control={form.control}
//             name="duration_minutes"
//             render={() => (
//               <FormItem>
//                 <FormLabel>Duration (minutes)</FormLabel>
//                 <FormControl>
//                   <Input
//                     type="number"
//                     min={1}
//                     {...register("duration_minutes", { valueAsNumber: true })}
//                   />
//                 </FormControl>
//                 <FormMessage>
//                   {errors.duration_minutes?.message as any}
//                 </FormMessage>
//               </FormItem>
//             )}
//           />

//           {/* Status */}
//           <FormField
//             control={form.control}
//             name="status"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Status</FormLabel>
//                 <FormControl>
//                   <select
//                     className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm"
//                     {...field}
//                   >
//                     <option value="COMING_SOON">COMING_SOON</option>
//                     <option value="NOW_SHOWING">NOW_SHOWING</option>
//                     <option value="ARCHIVED">ARCHIVED</option>
//                   </select>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Active (use register to avoid value: unknown) */}
//           <FormField
//             control={form.control}
//             name="is_active"
//             render={() => (
//               <FormItem>
//                 <FormLabel>Active</FormLabel>
//                 <FormControl>
//                   <select
//                     className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-sm"
//                     {...register("is_active", {
//                       setValueAs: (v) => v === "true",
//                     })}
//                   >
//                     <option value="true">true</option>
//                     <option value="false">false</option>
//                   </select>
//                 </FormControl>
//                 <FormMessage>{errors.is_active?.message as any}</FormMessage>
//               </FormItem>
//             )}
//           />
//         </div>

//         {/* Poster URL */}
//         <FormField
//           control={form.control}
//           name="poster_url"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Poster URL</FormLabel>
//               <FormControl>
//                 <Input placeholder="https://…" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Actions */}
//         <div className="flex justify-end gap-2 pt-2">
//           {onCancel && (
//             <Button type="button" variant="outline" onClick={onCancel}>
//               Cancel
//             </Button>
//           )}
//           <Button type="submit" disabled={submitting}>
//             {submitting ? "Saving…" : "Save Movie"}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// export default MovieForm;
