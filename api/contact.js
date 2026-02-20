import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, message } = req.body || {}

  if (!email || !message) {
    return res.status(400).json({ error: 'Email e mensagem são obrigatórios.' })
  }

  try {
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // depois te explico a parte do domínio
      to: [process.env.CONTACT_TO_EMAIL],
      subject: `Novo contato do portfólio — ${name || 'Sem nome'}`,
      replyTo: email, // (Resend usa replyTo, não reply_to)
      text: `Nome: ${name || '-'}\nEmail: ${email}\n\nMensagem:\n${message}`,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao enviar email.' })
  }
}
