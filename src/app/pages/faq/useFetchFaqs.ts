// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const usefetchFaqs= () => {
//   const [faqs, setFaqs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | undefined>(undefined);

//   useEffect(() => {
//     const fetchFaqs = async () => {
//       try {
//         const res = await axios.get('http://localhost:5055/api/faqs/all');
//         if (res.data.success) {
//           setFaqs(res.data.faqs);
//         } else {
//           setError('Failed to fetch FAQs');
//         }
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFaqs();
//   }, []);

//   return { faqs, loading, error };
// };

// export default usefetchFaqs;

import axios from 'axios';

const useFetchFaqs = async () => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/faqs/all`);
    if (res) {
      // console.log(res);

      return { faqs: res.data, loading: false, error: null };
    } else {
      throw new Error('Failed to fetch FAQs');
    }
  } catch (error: any) {
    // Explicitly define 'error' as 'any'
    return { faqs: [], loading: false, error: error?.message };
  }
};

export default useFetchFaqs;
