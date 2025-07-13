// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { ClipboardList, AlertCircle, CheckCircle } from 'lucide-react';
// import { getAllFeedbacks } from '../../services/feedbackService';

// const FeedbackLogs = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await getAllFeedbacks();
//         setFeedbacks(res.data);
//       } catch (err) {
//         console.error('Failed to load feedbacks:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, []);

//   const getScoreColor = (score) => {
//     if (score >= 8) return 'bg-emerald-500';
//     if (score >= 6) return 'bg-amber-500';
//     return 'bg-red-500';
//   };

//   const Loader = () => (
//     <div className="flex justify-center items-center h-64">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//     </div>
//   );

//   return (
//     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
//           <ClipboardList className="h-6 w-6 text-blue-600" />
//           Feedback Logs
//         </h1>
//         <div className="text-sm text-slate-500">{feedbacks.length} entries</div>
//       </div>

//       <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
//         {loading ? (
//           <Loader />
//         ) : feedbacks.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-64 text-slate-500">
//             <ClipboardList className="h-12 w-12 text-slate-300 mb-2" />
//             <p className="text-lg font-medium">No feedback found</p>
//             <p className="text-sm">Try uploading a presentation</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead>
//                 <tr className="bg-slate-50 text-left border-b border-slate-200">
//                   <th className="px-6 py-4 font-medium text-slate-500">User</th>
//                   <th className="px-6 py-4 font-medium text-slate-500">Structure Score</th>
//                   <th className="px-6 py-4 font-medium text-slate-500">Clarity Score</th>
//                   <th className="px-6 py-4 font-medium text-slate-500">Professional Tone</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-200">
//                 {feedbacks.map((fb, i) => {
//                   const user = fb.presentationId?.userId;
//                   return (
//                     <motion.tr
//                       key={fb._id || i}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.05 }}
//                       className="hover:bg-slate-50"
//                     >
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="h-9 w-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-medium">
//                             {user?.name?.charAt(0) || "?"}
//                           </div>
//                           <div>
//                             <div className="font-medium text-slate-800">
//                               {user?.name || 'Unknown'}
//                             </div>
//                             <div className="text-xs text-slate-500">{user?.email}</div>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-6 py-4">
//                         <div className="flex flex-col gap-1">
//                           <span className="font-medium">{fb.structureScore.toFixed(1)}/10</span>
//                           <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
//                             <div
//                               className={`h-full ${getScoreColor(fb.structureScore)}`}
//                               style={{ width: `${fb.structureScore * 10}%` }}
//                             ></div>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-6 py-4">
//                         <div className="flex flex-col gap-1">
//                           <span className="font-medium">{fb.clarityScore.toFixed(1)}/10</span>
//                           <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
//                             <div
//                               className={`h-full ${getScoreColor(fb.clarityScore)}`}
//                               style={{ width: `${fb.clarityScore * 10}%` }}
//                             ></div>
//                           </div>
//                         </div>
//                       </td>

//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2">
//                           {fb.professionalTone ? (
//                             <div className="flex items-center text-emerald-600">
//                               <CheckCircle className="h-4 w-4 mr-1" />
//                               <span className="text-sm font-medium">Yes</span>
//                             </div>
//                           ) : (
//                             <div className="flex items-center text-amber-600">
//                               <AlertCircle className="h-4 w-4 mr-1" />
//                               <span className="text-sm font-medium">No</span>
//                             </div>
//                           )}
//                         </div>
//                       </td>
//                     </motion.tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="text-sm text-slate-500">
//           Showing <span className="font-medium">1</span> to{' '}
//           <span className="font-medium">{feedbacks.length}</span> of{' '}
//           <span className="font-medium">{feedbacks.length}</span> entries
//         </div>
//         <div className="flex gap-2">
//           <button className="px-3 py-1 border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
//             Previous
//           </button>
//           <button className="px-3 py-1 border border-slate-200 rounded text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
//             Next
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default FeedbackLogs;
