'use client'
import http from '@framework/utils/http';
import { useEffect } from 'react';

const isBrowser = typeof window !== 'undefined';

let id = '';
if (isBrowser) {
  const storedUser = localStorage.getItem('user');
  id = storedUser ? JSON.parse(storedUser).id : null;
}

export const fetchUser = async () => {
  try {
    const { data } = await http.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/user/${id}`);
    // const { user } = data;
    console.log(data);

   
     
    
    return data;
  } catch (error) {
    console.log('Error in Fetch user', error);
    
    
    
  }
};
