// Test your local email setup
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testLocalSetup() {
  console.log('🧪 Testing Local Email Setup...\n');
  
  const config = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  };
  
  console.log('📋 Configuration:');
  console.log(`   Host: ${config.host}`);
  console.log(`   Port: ${config.port}`);
  console.log(`   User: ${config.auth.user}`);
  console.log(`   Pass: ${config.auth.pass ? `${config.auth.pass.length} characters` : 'NOT SET'}`);
  
  try {
    console.log('\n🔌 Creating transporter...');
    const transporter = nodemailer.createTransport(config);
    
    console.log('🔐 Testing connection...');
    await transporter.verify();
    
    console.log('✅ SUCCESS! Credentials are working locally.');
    console.log('\n📧 The issue is likely that these same credentials are not set in Vercel.');
    
  } catch (error) {
    console.log('\n❌ FAILED! Credentials are not working.');
    console.log(`   Error: ${error.message}`);
    console.log('\n🔧 This explains why it\'s failing in production too.');
  }
}

testLocalSetup().catch(console.error);