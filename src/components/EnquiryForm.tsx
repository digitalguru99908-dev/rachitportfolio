import { useState } from 'react'
import RevealHeading from './RevealHeading'

const API_URL = import.meta.env.VITE_API_URL || '/api/send-email'

const REASONS = ['Hire me', 'Collaborate', 'Just say hi', 'Other'] as const
type Reason = (typeof REASONS)[number]

interface FormData {
  name: string
  email: string
  reason: Reason
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Name is required'
  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email'
  }
  if (!data.message.trim()) errors.message = 'Message is required'
  return errors
}

export default function EnquiryForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    reason: 'Hire me',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [failed, setFailed] = useState(false)

  const set = <K extends keyof FormData>(key: K, val: FormData[K]) => {
    setForm((p) => ({ ...p, [key]: val }))
    setErrors((p) => ({ ...p, [key]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFailed(false)

    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSending(true)
    const MAX_ATTEMPTS = 3
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('send failed')
        setSent(true)
        setSending(false)
        setTimeout(() => {
          setSent(false)
          setForm({ name: '', email: '', reason: 'Hire me', message: '' })
        }, 3000)
        return
      } catch {
        if (attempt < MAX_ATTEMPTS - 1) await new Promise((r) => setTimeout(r, 6000))
        else {
          setFailed(true)
          setSending(false)
        }
      }
    }
  }

  return (
    <section id="enquiry" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="mx-auto max-w-lg">
          <RevealHeading
            as="h2"
            segments={[{ text: 'Get in ' }, { text: 'touch', italic: true }]}
            className="mb-4 font-display text-5xl leading-[1.05] tracking-tight text-text-primary italic md:text-6xl"
            delay={0.1}
          />
          <p className="mb-12 text-sm text-muted md:text-base">
            Have a project, a collab idea, or just want to say hi? Fill this in and
            I'll get back to you.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                className="w-full rounded-full border border-stroke bg-surface/30 px-5 py-3 text-sm text-text-primary placeholder-muted outline-none transition-colors duration-300 focus:border-text-primary/40"
              />
              {errors.name && (
                <p className="mt-1.5 px-4 text-xs text-rose-400">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                className="w-full rounded-full border border-stroke bg-surface/30 px-5 py-3 text-sm text-text-primary placeholder-muted outline-none transition-colors duration-300 focus:border-text-primary/40"
              />
              {errors.email && (
                <p className="mt-1.5 px-4 text-xs text-rose-400">{errors.email}</p>
              )}
            </div>

            <select
              value={form.reason}
              onChange={(e) => set('reason', e.target.value as Reason)}
              className="w-full appearance-none rounded-full border border-stroke bg-surface/30 px-5 py-3 text-sm text-text-primary outline-none transition-colors duration-300 focus:border-text-primary/40"
            >
              {REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <div>
              <textarea
                placeholder="Your message"
                rows={4}
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
                className="w-full resize-none rounded-3xl border border-stroke bg-surface/30 px-5 py-3 text-sm text-text-primary placeholder-muted outline-none transition-colors duration-300 focus:border-text-primary/40"
              />
              {errors.message && (
                <p className="mt-1.5 px-4 text-xs text-rose-400">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={sending || sent}
              className="self-start cursor-pointer rounded-full bg-text-primary px-8 py-3 text-sm font-medium text-bg transition-all duration-300 hover:scale-105 disabled:cursor-default disabled:opacity-70 disabled:hover:scale-100"
            >
              {sent ? 'Message sent ✓' : sending ? 'Sending...' : 'Send'}
            </button>

            {failed && (
              <p className="mt-2 text-xs text-rose-400">
                Something went wrong. Try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}