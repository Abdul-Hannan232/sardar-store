
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
