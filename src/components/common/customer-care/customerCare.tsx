'use client'

import { FaWhatsapp } from 'react-icons/fa';


const CustomerCare = () => {

    const handleClick = () => {
        const phoneNumber = '03123367763';
        const message = 'Hello! How can i help you?'; 
    
        // WhatsApp URL
        // const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}?text=${encodeURIComponent(message)}`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    

        window.open(whatsappUrl, '_blank');
       
        };
  return (
    <div>
       
      <button onClick={handleClick} className='z-10'>
      {/* <FaWhatsapp className='text-green'/>     */}
      
      <img className='z-20 w-14 h-14 fixed top-[82vh] right-6 rounded-full' src="https://w7.pngwing.com/pngs/132/965/png-transparent-whatsapp-email-web-design-message-icon-whatsapp-whatsapp-logo-text-logo-grass-thumbnail.png" alt="" />
        </button>
    </div>
  )
}

export default CustomerCare
