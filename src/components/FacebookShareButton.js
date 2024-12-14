// components/FacebookShareButton.js
import React, { useEffect } from 'react';

const FacebookShareButton = ({ url, quote }) => {
  useEffect(() => {
    // Ensure FB is defined
    if (typeof FB !== 'undefined') {
      FB.XFBML.parse();
    }
  }, []);

  const share = () => {
    if (typeof FB !== 'undefined') {
      FB.ui(
        {
          method: 'share',
          href: url,
          quote: quote,
        },
        function(response) {
          if (response && !response.error_message) {
            alert('Posting completed.');
          } else {
            alert('Error while posting.');
          }
        }
      );
    } else {
      alert('Facebook SDK not loaded yet.');
    }
  };

  return <button onClick={share}>Share on Facebook</button>;
};

export default FacebookShareButton;
