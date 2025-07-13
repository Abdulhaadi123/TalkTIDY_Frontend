// import React, { useEffect, useState } from 'react';
// import { getUserUploads } from '../../services/uploadService';
// import { getFeedbackByPresentation, generateFeedback } from '../../services/feedbackService';
// import Loader from '../../components/Loader';

// const Feedback = () => {
//   const [feedback, setFeedback] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchFeedback = async () => {
//       try {
//         const uploads = await getUserUploads();
//         if (!uploads.data.length) {
//           setError('No presentations uploaded yet.');
//           setLoading(false);
//           return;
//         }

//         const latest = uploads.data[uploads.data.length - 1];

//         try {
//           // Try to fetch feedback
//           const fb = await getFeedbackByPresentation(latest._id);
//           setFeedback(fb.data);
//         } catch (err) {
//           if (err.response?.status === 404) {
//             // Generate it if not found
//             const generated = await generateFeedback(latest._id);
//             setFeedback(generated.data);
//           } else {
//             setError('Something went wrong while fetching feedback.');
//           }
//         }
//       } catch (err) {
//         setError('Failed to load presentation.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeedback();
//   }, []);

//   if (loading) return <Loader />;
  
//   if (error) return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-lg border border-red-100 p-8 max-w-md w-full text-center">
//         <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//           </svg>
//         </div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">Error</h3>
//         <p className="text-gray-600">{error}</p>
//       </div>
//     </div>
//   );
  
//   if (!feedback) return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
//         <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//         </div>
//         <h3 className="text-lg font-semibold text-gray-900 mb-2">No Feedback Available</h3>
//         <p className="text-gray-600">No feedback data found for your presentation.</p>
//       </div>
//     </div>
//   );

//   const getScoreColor = (score) => {
//     if (score >= 8) return 'text-green-600 bg-green-50 border-green-200';
//     if (score >= 6) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
//     return 'text-red-600 bg-red-50 border-red-200';
//   };

//   const getScoreIcon = (score) => {
//     if (score >= 8) return (
//       <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//       </svg>
//     );
//     if (score >= 6) return (
//       <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
//         <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//       </svg>
//     );
//     return (
//       <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//       </svg>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-8">
//           <div className="flex items-center mb-6">
//             <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
//               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//               </svg>
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Presentation Feedback</h1>
//               <p className="text-gray-600 mt-1">Detailed analysis of your presentation performance</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Scores Section */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Score Cards */}
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Structure Score */}
//               <div className={`bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg ${getScoreColor(feedback.structureScore)}`}>
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold">Structure</h3>
//                   {getScoreIcon(feedback.structureScore)}
//                 </div>
//                 <div className="flex items-end space-x-2">
//                   <span className="text-3xl font-bold">{feedback.structureScore}</span>
//                   <span className="text-lg text-gray-500 mb-1">/10</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
//                   <div 
//                     className={`h-2 rounded-full transition-all duration-500 ${
//                       feedback.structureScore >= 8 ? 'bg-green-500' : 
//                       feedback.structureScore >= 6 ? 'bg-yellow-500' : 'bg-red-500'
//                     }`}
//                     style={{ width: `${feedback.structureScore * 10}%` }}
//                   ></div>
//                 </div>
//               </div>

//               {/* Clarity Score */}
//               <div className={`bg-white rounded-xl p-6 border-2 transition-all duration-200 hover:shadow-lg ${getScoreColor(feedback.clarityScore)}`}>
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold">Clarity</h3>
//                   {getScoreIcon(feedback.clarityScore)}
//                 </div>
//                 <div className="flex items-end space-x-2">
//                   <span className="text-3xl font-bold">{feedback.clarityScore}</span>
//                   <span className="text-lg text-gray-500 mb-1">/10</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
//                   <div 
//                     className={`h-2 rounded-full transition-all duration-500 ${
//                       feedback.clarityScore >= 8 ? 'bg-green-500' : 
//                       feedback.clarityScore >= 6 ? 'bg-yellow-500' : 'bg-red-500'
//                     }`}
//                     style={{ width: `${feedback.clarityScore * 10}%` }}
//                   ></div>
//                 </div>
//               </div>
//             </div>

//             {/* Professional Tone */}
//             <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
//               <div className="flex items-center space-x-3">
//                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                   feedback.professionalTone ? 'bg-green-100' : 'bg-red-100'
//                 }`}>
//                   {feedback.professionalTone ? (
//                     <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                     </svg>
//                   ) : (
//                     <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
//                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                     </svg>
//                   )}
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-900">Professional Tone</h3>
//                   <p className={`text-sm ${feedback.professionalTone ? 'text-green-600' : 'text-red-600'}`}>
//                     {feedback.professionalTone ? 'Excellent professional communication' : 'Needs improvement in professional tone'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Issues and Tips Section */}
//           <div className="space-y-6">
//             {/* Grammar Issues */}
//             <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
//               <div className="flex items-center mb-4">
//                 <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
//                   <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900">Grammar Issues</h3>
//               </div>
//               {feedback.grammarIssues.length > 0 ? (
//                 <div className="space-y-2">
//                   {feedback.grammarIssues.map((issue, index) => (
//                     <div key={index} className="flex items-start space-x-2 p-3 bg-red-50 rounded-lg border border-red-100">
//                       <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
//                       <p className="text-sm text-red-700">{issue}</p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg border border-green-100">
//                   <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   <p className="text-sm text-green-700">No grammar issues detected</p>
//                 </div>
//               )}
//             </div>

//             {/* Improvement Tips */}
//             <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
//               <div className="flex items-center mb-4">
//                 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
//                   <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900">Improvement Tips</h3>
//               </div>
//               <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
//                 <p className="text-blue-800 leading-relaxed">{feedback.improvementTips}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Feedback;