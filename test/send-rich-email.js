const sendRichEmail = async () => {
  // Sample logo (a simple colored circle with text)
  const logoHtml = `
    <div style="
      width: 60px;
      height: 60px;
      background: linear-gradient(45deg, #2B6CB0, #4299E1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 24px;
      margin: 0 auto;
    ">
      DE
    </div>
  `;

  try {
    const response = await fetch('http://localhost:5001/api/receive-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'test@disposable.com',
        from: 'notifications@disposable-email.com',
        subject: 'Welcome to Disposable Email!',
        body: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <!-- Header with Logo -->
            <div style="text-align: center; margin-bottom: 30px;">
              ${logoHtml}
              <h1 style="color: #2D3748; margin-top: 15px;">Welcome to Disposable Email</h1>
            </div>

            <!-- Main Content -->
            <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #2B6CB0; margin-bottom: 15px;">Getting Started</h2>
              
              <p style="color: #4A5568; line-height: 1.6; margin-bottom: 15px;">
                Thank you for using our service! Here's what you can do with your disposable email:
              </p>

              <!-- Feature Boxes -->
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0;">
                <!-- Feature 1 -->
                <div style="padding: 15px; background-color: #EBF8FF; border-radius: 8px;">
                  <div style="width: 40px; height: 40px; background-color: #4299E1; border-radius: 8px; margin-bottom: 10px;"></div>
                  <h3 style="color: #2C5282; margin: 10px 0;">Receive Emails</h3>
                  <p style="color: #4A5568; font-size: 14px;">Get instant notifications when new emails arrive.</p>
                </div>

                <!-- Feature 2 -->
                <div style="padding: 15px; background-color: #F0FFF4; border-radius: 8px;">
                  <div style="width: 40px; height: 40px; background-color: #48BB78; border-radius: 8px; margin-bottom: 10px;"></div>
                  <h3 style="color: #276749; margin: 10px 0;">Stay Private</h3>
                  <p style="color: #4A5568; font-size: 14px;">Protect your real email address from spam.</p>
                </div>
              </div>

              <!-- Status Indicators -->
              <div style="margin: 30px 0; padding: 15px; background-color: #F7FAFC; border-radius: 8px;">
                <h3 style="color: #2D3748; margin-bottom: 15px;">System Status</h3>
                <div style="display: flex; gap: 15px; margin-bottom: 10px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 10px; height: 10px; background-color: #48BB78; border-radius: 50%;"></div>
                    <span style="color: #4A5568; font-size: 14px;">Email Reception</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <div style="width: 10px; height: 10px; background-color: #48BB78; border-radius: 50%;"></div>
                    <span style="color: #4A5568; font-size: 14px;">Real-time Updates</span>
                  </div>
                </div>
              </div>

              <!-- Color Palette Demo -->
              <div style="margin: 20px 0;">
                <h3 style="color: #2D3748; margin-bottom: 15px;">Our Color Palette</h3>
                <div style="display: flex; gap: 10px; justify-content: center;">
                  <div style="width: 40px; height: 40px; background-color: #2B6CB0; border-radius: 8px;"></div>
                  <div style="width: 40px; height: 40px; background-color: #4299E1; border-radius: 8px;"></div>
                  <div style="width: 40px; height: 40px; background-color: #48BB78; border-radius: 8px;"></div>
                  <div style="width: 40px; height: 40px; background-color: #38B2AC; border-radius: 8px;"></div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
              <p style="color: #718096; font-size: 14px;">
                This is an automated message from Disposable Email Service.
              </p>
            </div>
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

sendRichEmail();
