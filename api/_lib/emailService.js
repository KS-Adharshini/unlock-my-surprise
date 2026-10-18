// Email notification service using Resend
import { Resend } from 'resend';

export async function sendSubmissionEmail({
  type, // 'personal_answer' | 'password_correct' | 'password_incorrect'
  levelId,
  levelTitle,
  question,
  submittedContent,
  unlocked,
  timestamp = new Date().toISOString(),
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.NOTIFICATION_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || 'Unlock My Surprise <onboarding@resend.dev>';

  const formattedDate = new Date(timestamp).toLocaleString('en-US', {
    timeZone: 'UTC',
    dateStyle: 'full',
    timeStyle: 'long',
  });

  // Type-specific badge & header text
  let statusBadge = '';
  let subject = '';
  let introMessage = '';

  if (type === 'personal_answer') {
    subject = `💌 [Unlock My Surprise] Level ${levelId}: ${levelTitle} — Personal Answer Submitted!`;
    statusBadge = `
      <span style="display:inline-block; padding: 6px 14px; background: #ffe5ec; color: #d90429; border-radius: 999px; font-weight: 700; font-size: 13px; border: 1px solid #ff758f;">
        📝 Step 1: Personal Answer
      </span>
    `;
    introMessage = `Your boyfriend just wrote a personal answer for <strong>Level ${levelId}: ${levelTitle}</strong>!`;
  } else if (type === 'password_correct') {
    subject = `🎉 [Unlock My Surprise] Level ${levelId}: ${levelTitle} — LEVEL UNLOCKED!`;
    statusBadge = `
      <span style="display:inline-block; padding: 6px 14px; background: #e8f5e9; color: #2e7d32; border-radius: 999px; font-weight: 700; font-size: 13px; border: 1px solid #a5d6a7;">
        ✨ Level Successfully Unlocked!
      </span>
    `;
    introMessage = `He entered the correct secret password and unlocked the love letter for <strong>Level ${levelId}: ${levelTitle}</strong>!`;
  } else if (type === 'password_incorrect') {
    subject = `🔐 [Unlock My Surprise] Level ${levelId}: ${levelTitle} — Incorrect Password Attempt`;
    statusBadge = `
      <span style="display:inline-block; padding: 6px 14px; background: #fff3e0; color: #e65100; border-radius: 999px; font-weight: 700; font-size: 13px; border: 1px solid #ffcc80;">
        🔍 Password Attempt (Needs Retry)
      </span>
    `;
    introMessage = `He tried to unlock <strong>Level ${levelId}: ${levelTitle}</strong> with a password attempt that didn't match.`;
  }

  // Romantic HTML email template
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>${subject}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #120910; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #120910; padding: 40px 20px;">
      <tr>
        <td align="center">
          <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background: #1f0d1b; border: 1px solid #d9042944; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.6);">
            
            <!-- Header Banner -->
            <tr>
              <td style="background: linear-gradient(135deg, #7a0c2e, #d90429, #ff758f); padding: 30px 24px; text-align: center;">
                <h1 style="margin: 0; font-size: 26px; color: #ffffff; letter-spacing: 1px; font-weight: 800;">
                  ✨ Unlock My Surprise
                </h1>
                <p style="margin: 6px 0 0 0; font-size: 14px; color: #ffe5ec; font-style: italic;">
                  A Journey Through Us — 21st Birthday Surprise
                </p>
              </td>
            </tr>

            <!-- Content Area -->
            <tr>
              <td style="padding: 30px 26px;">
                <div style="margin-bottom: 20px; text-align: center;">
                  ${statusBadge}
                </div>

                <p style="font-size: 16px; line-height: 1.6; color: #ffe5ec; margin-top: 0;">
                  ${introMessage}
                </p>

                <!-- Information Card -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #2a1125; border-radius: 12px; border: 1px solid #ff758f33; margin: 24px 0;">
                  <tr>
                    <td style="padding: 16px 20px; border-bottom: 1px solid #ff758f22;">
                      <span style="font-size: 12px; color: #ffb3c6; text-transform: uppercase; letter-spacing: 0.5px;">Level & Stage</span>
                      <div style="font-size: 16px; color: #ffffff; font-weight: bold; margin-top: 4px;">
                        Level ${levelId} — ${levelTitle}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 16px 20px; border-bottom: 1px solid #ff758f22;">
                      <span style="font-size: 12px; color: #ffb3c6; text-transform: uppercase; letter-spacing: 0.5px;">Question Displayed</span>
                      <div style="font-size: 15px; color: #ffe5ec; margin-top: 4px; font-style: italic;">
                        "${question}"
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 16px 20px; border-bottom: 1px solid #ff758f22; background: #381531;">
                      <span style="font-size: 12px; color: #ff758f; text-transform: uppercase; letter-spacing: 0.5px; font-weight: bold;">Submitted Answer / Entry</span>
                      <div style="font-size: 16px; color: #ffffff; margin-top: 6px; white-space: pre-wrap; line-height: 1.5; font-family: monospace; background: #1a0817; padding: 12px 14px; border-radius: 8px; border-left: 4px solid #ff2a6d;">
${submittedContent || '(Empty)'}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 16px 20px; border-bottom: 1px solid #ff758f22;">
                      <span style="font-size: 12px; color: #ffb3c6; text-transform: uppercase; letter-spacing: 0.5px;">Did it Unlock the Level?</span>
                      <div style="font-size: 15px; font-weight: bold; margin-top: 4px; color: ${unlocked ? '#4ade80' : '#fbbf24'};">
                        ${unlocked ? '✅ YES — Love letter revealed!' : '❌ NO — Still locked or awaiting password'}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding: 16px 20px;">
                      <span style="font-size: 12px; color: #ffb3c6; text-transform: uppercase; letter-spacing: 0.5px;">Submission Timestamp</span>
                      <div style="font-size: 14px; color: #e2c2d9; margin-top: 4px;">
                        🕒 ${formattedDate}
                      </div>
                    </td>
                  </tr>
                </table>

                <div style="text-align: center; margin-top: 26px; padding-top: 20px; border-top: 1px solid #ff758f22;">
                  <p style="margin: 0; font-size: 13px; color: #ffb3c6;">
                    Forever & Always ❤️ • Built with love for his 21st Birthday
                  </p>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  // Check if Resend is configured
  if (!apiKey || !recipientEmail) {
    console.log('\n================== [EMAIL DISPATCH LOG] ==================');
    console.log(`[DEV MODE / ENV NOTICE]: Resend API key or NOTIFICATION_EMAIL is not configured.`);
    console.log(`Type: ${type}`);
    console.log(`Recipient would be: ${recipientEmail || '(NOT SET - configure NOTIFICATION_EMAIL)'}`);
    console.log(`Subject: ${subject}`);
    console.log(`Level: ${levelId} - ${levelTitle}`);
    console.log(`Question: ${question}`);
    console.log(`Submitted Content: "${submittedContent}"`);
    console.log(`Unlocked: ${unlocked}`);
    console.log(`Timestamp: ${formattedDate}`);
    console.log('==========================================================\n');

    return {
      sent: false,
      devMode: true,
      message: 'Notification logged in server console (RESEND_API_KEY or NOTIFICATION_EMAIL not set).',
    };
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      subject: subject,
      html: htmlContent,
    });

    if (result.error) {
      console.error('[Resend Error]:', result.error);
      return {
        sent: false,
        error: result.error.message || 'Email delivery provider returned an error.',
      };
    }

    return {
      sent: true,
      id: result.data?.id,
    };
  } catch (err) {
    console.error('[Email Dispatch Exception]:', err);
    return {
      sent: false,
      error: err.message || 'Failed to dispatch email notification.',
    };
  }
}
