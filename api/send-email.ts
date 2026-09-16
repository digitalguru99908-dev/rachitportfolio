import { Resend } from 'resend'
import type { VercelRequest, VercelResponse } from '@vercel/node'

interface EnquiryBody {
  name?: string
  email?: string
  reason?: string
  message?: string
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { name, email, reason, message } = (req.body ?? {}) as EnquiryBody
  if (!name || !email || !message) {
    res
      .status(400)
      .json({ error: 'Missing required fields: name, email, message' })
    return
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'Server not configured' })
    return
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: 'Rachit Portfolio <onboarding@resend.dev>',
    to: process.env.CONTACT_EMAIL ?? 'rachitsharma999088@gmail.com',
    replyTo: email,
    subject: `New enquiry — ${reason ?? 'General'} (from ${name})`,
    text: `Name: ${name}\nEmail: ${email}\nReason: ${reason ?? 'General'}\n\n${message}`,
  })

  if (error) {
    res.status(500).json({ error: error.message })
    return
  }

  res.status(200).json({ ok: true })
}