// Sample email with a colorful test image
const sampleImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAAEv0lEQVR4nO2dW4hVVRjHf2fGcZwZL6UNlk5FZaBTEQwlGmEPRoUUlJhEdGMKoqKXkIqg6CHowSi6PBQUlBQUZDFR9hBRUGGUlaRhKZKaTjqo4zhzZs70sL7D2Xv2PvvMOnvtc/b+/2Ax7L32t/b6f2d/e+21vvUdCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCEIW6AHWALuATmCw+H878DawNCO6BCDpBvYCEWUQAXuArkyoE4CkGzhYhRnD0Qf0pl6hACQbgf4aDRmOg8CiVCsUgOQw8B3wZw1G9AOfAhemWJ8AJC8DzwCzgQXAVcBbwD8VGjEIfAhcnHJ9ApBsB+4Zp+0q4GvKN2Q/cHNK9QhAshW4L6H9euCXMgz5Hrg2jUoEINkM3F/mmBuAX0sY8h1wXdLKBCDZBDxQwbgbKd6QH4BVSSoSgORV4KEqxt4E/JbHkB+BlQnoEYDkZeChGsbfDPweY8gvwPV1ahGA5CXg4TrmuAX4Y4QhvwHr65g7AHqAF4BH65xnLXBgmCHtwLoE5g2AhcDzwOMJzbcO+LVoRn/RjNUJzRsAC4BngScSnHM9sKdoxs3A9QnOGwDzgWeApxKedwPwDvBAwvMGQDfwNPBsHeP7gAhYBvwJLKxjrgDoBJ4Cnqtj/H7gIuA/YE4d8wREB/Ak8Hwd4/uAJcT/QIQa6QAeB16oY/w+4FLEkERoB9YDL9Yx/l/gMsSQRGgHHgNerGP8XuByxJBEaAMeBV6qY/w/wBWIIYnQBqwDXq5j/B7gSsSQRGgFHgFermP8buAqxJBEaAUeBl6pY/wuYA1iSCK0AA8Cr9Yx/nfgGsSQRGgBHgBer2P8TuBaxJBEaAbuB96oY/wO4DrEkERoBu4D3qxj/HbgesSQRGgC7gXeqmP8NuAGxJBEaALuAd6uY/yvwI2IIYnQBNwNvFPH+F+AmxBDEqEJuAt4t47xPwM3I4YkQiNwJ/BeHeN/Am5BDEmERuAO4P06xv8I3IoYkggNwO3AB3WM/wG4DTEkERqA24AP6xj/PXA7YkgiNAC3Ah/VMf474A7EkERoAG4BPq5j/LfAnYghiVAP3Ax8Usf4b4C7EEMSoR64CdhSx/ivgbsRQxKhHrgR+LSO8V8B9yCGJEIdsBb4rI7xXwL3IoYkQh2wBvi8jvFfAPchhiRCHbAa+KKO8Z8D9yOGJEIE3AB8Wcf4z4AHEEMSIQKuB76qY/ynwIOIIYkQAauAr+sY/wnwEGJIIkTASmBbHeM/Bh5GDEmECFgBfFPH+I+ARxBDEiEC+oHv6hi/FXgUMSQRImA58G0d4z8EHkMMSYQIWAZ8V8f4D4DHEUMSIQKWAj/WMf594AnEkESIgCXATh/jh4aGor6+vmjPnj3R9u3bo507d0b79++PIiTTSiJEwGJgl4/xAwMD0YYNG6KmpqZhPxLt7e3RvHnzoo0bN0aHDh3yUZFqIqAX2O1j/KZNm4aZ0dLSEs2ePTtqbGyMmpubo87OzmjOnDnR/Pnzo0WLFkVLliyJent7o7lz50adnZ1RT09P1N3dHXV1dUUdHR1RW1tb1NraGrW0tETNzc1RU1NT1NDQEEVRFNXxDCIIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgpAe/wOlD3Ww0HhI5QAAAABJRU5ErkJggg==';

const sendComplexEmail = async () => {
  try {
    const response = await fetch('http://localhost:5001/api/receive-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'test@disposable.com',
        from: 'marketing@example.com',
        subject: 'Welcome to Our Newsletter!',
        body: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #2c5282; text-align: center;">Welcome to Our Newsletter!</h1>
            
            <div style="text-align: center; margin: 20px 0;">
              <img src="${sampleImage}" alt="Welcome Image" style="max-width: 100%; height: auto; border-radius: 8px;" />
            </div>
            
            <p style="color: #4a5568; line-height: 1.6;">
              Dear Subscriber,<br><br>
              Thank you for joining our newsletter! We're excited to share with you our latest updates and news.
            </p>
            
            <div style="background-color: #ebf8ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #2b6cb0; margin-top: 0;">What to Expect:</h2>
              <ul style="color: #4a5568;">
                <li>Weekly updates</li>
                <li>Exclusive offers</li>
                <li>Industry insights</li>
                <li>Tips and tricks</li>
              </ul>
            </div>
            
            <p style="color: #4a5568; text-align: center; font-style: italic;">
              Stay tuned for our next update!
            </p>
          </div>
        `
      })
    });
    
    const data = await response.json();
    console.log('Email sent successfully:', data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

sendComplexEmail();
