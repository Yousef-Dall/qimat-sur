// test-email-setup.js - Local testing script
// Run this locally to test your Gmail credentials before deploying

const nodemailer = require('nodemailer');
require('dotenv').config(); // Load from .env file

async function testEmailSetup() {
  console.log('🔧 Testing Email Setup...\n');
  
  // Check environment variables
  console.log('📋 Environment Variables:');
  const envVars = {
    SMTP_HOST: process.env.SMTP_HOST || 'NOT_SET',
    SMTP_PORT: process.env.SMTP_PORT || 'NOT_SET',
    SMTP_USER: process.env.SMTP_USER ? 'SET' : 'NOT_SET',
    SMTP_PASS: process.env.SMTP_PASS ? `SET (${process.env.SMTP_PASS.length} chars)` : 'NOT_SET',
    TO_EMAIL: process.env.TO_EMAIL || 'NOT_SET'
  };
  
  Object.entries(envVars).forEach(([key, value]) => {
    const status = value === 'NOT_SET' ? '❌' : '✅';
    console.log(`   ${status} ${key}: ${value}`);
  });
  
  // Check for missing variables
  const missing = Object.entries(envVars).filter(([_, value]) => value === 'NOT_SET');
  if (missing.length > 0) {
    console.log('\n❌ Missing environment variables:', missing.map(([key]) => key).join(', '));
    console.log('\n💡 Create a .env file in your project root with:');
    console.log(`
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=yousef.n.d.2002@gmail.com
SMTP_PASS=your_16_character_app_password
TO_EMAIL=yousef.n.d.2002@gmail.com
`);
    return;
  }
  
  try {
    // Create transporter
    console.log('\n🔌 Creating SMTP transporter...');
    const port = Number(process.env.SMTP_PORT || 465);
    const secure = port === 465;
    
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    
    // Verify connection
    console.log('🔐 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
    
    // Send test email
    console.log('📧 Sending test email...');
    const result = await transporter.sendMail({
      from: `"QSMT Test" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject: '🧪 QSMT Email Test - Setup Working!',
      text: `Email setup test completed successfully at ${new Date().toLocaleString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #087ccf;">🧪 QSMT Email Test</h2>
          <p>✅ Your email setup is working correctly!</p>
          <p><strong>Test completed:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>From:</strong> ${process.env.SMTP_USER}</p>
          <p><strong>To:</strong> ${process.env.TO_EMAIL}</p>
          <hr>
          <p><em>This is a test email from your QSMT contact form setup.</em></p>
        </div>
      `
    });
    
    console.log(`✅ Test email sent successfully!`);
    console.log(`📧 Message ID: ${result.messageId}`);
    console.log('\n🎉 Your email setup is working! Deploy to Vercel with confidence.');
    
  } catch (error) {
    console.log('\n❌ Email setup test failed:');
    console.log(`   Error: ${error.message}`);
    
    if (error.code) {
      console.log(`   Code: ${error.code}`);
    }
    
    console.log('\n🔧 Common fixes:');
    console.log('   - Ensure 2-Factor Authentication is enabled on Gmail');
    console.log('   - Generate a new App Password for "Mail"');
    console.log('   - Use the 16-character password without spaces');
    console.log('   - Check that SMTP_USER matches your Gmail address');
  }
}

// Run the test
if (require.main === module) {
  testEmailSetup().catch(console.error);
}

module.exports = testEmailSetup;