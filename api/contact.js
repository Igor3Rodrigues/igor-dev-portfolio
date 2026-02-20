const { Resend } = require('resend')

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: 'Missing RESEND_API_KEY' })
    }

    if (!process.env.CONTACT_TO_EMAIL) {
      return res.status(500).json({ error: 'Missing CONTACT_TO_EMAIL' })
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

<<<<<<< HEAD
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
=======
    const body = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : req.body || {}
>>>>>>> d4f1f338bf6fd5fdc3703cd96149dbfca2fcb8ab

    const { name, email, message } = body

    if (!email || !message) {
      return res.status(400).json({ error: 'Email e mensagem obrigatórios' })
    }

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL],
      subject: `Contato do portfólio — ${name || 'Sem nome'}`,
      replyTo: email,
      text: `Nome: ${name || '-'}\nEmail: ${email}\n\nMensagem:\n${message}`,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('CONTACT ERROR:', err)
    return res.status(500).json({ error: String(err?.message || err) })
  }
}
