const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    let transporter;

    // Check if using default/placeholder credentials in development
    const isDev = process.env.NODE_ENV === 'development';
    const isDefaultCreds = process.env.SMTP_EMAIL === 'your_ethereal_email@example.com';

    if (isDev && isDefaultCreds) {
        console.log("⚠️ Using Nodemailer Test Account (Ethereal) because SMTP credentials are standard placeholders.");
        
        // Create a temporary test account on Ethereal
        let testAccount = await nodemailer.createTestAccount();
        
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, 
            auth: {
                user: testAccount.user, 
                pass: testAccount.pass, 
            },
        });
    } else {
        // Use provided credentials
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    // Define email options
    const message = {
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html,
    };

    // Send email
    try {
        const info = await transporter.sendMail(message);
        console.log('✅ Email sent: %s', info.messageId);

        // Preview only available when sending through an Ethereal account
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
            console.log('📬 Preview URL: %s', previewUrl);
        }
        
        // For Development Ease: detailed log
        if (isDev) {
            console.log("------------------------------------------");
            console.log("📧 [DEV MODE] Email Content Dump:");
            console.log(`To: ${options.email}`);
            console.log(`Subject: ${options.subject}`);
            console.log(`Message: \n${options.message}`);
            console.log("------------------------------------------");
        }

    } catch (error) {
        console.error("❌ Send Email Error:", error);
        throw error;
    }
};

module.exports = sendEmail;
