"use client"

import { useState } from "react"
import { Mail, Phone, MessageCircle, Send, CheckCircle2 } from "lucide-react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"

interface FormState {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = "الاسم مطلوب"
  if (!values.email.trim()) {
    errors.email = " ! البريد الإلكتروني مطلوب"
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "الرجاء إدخال بريد إلكتروني صالح"
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "الرجاء كتابة رسالة لا تقل عن 10 أحرف"
  }
  return errors
}

export function ContactSection() {
  const [values, setValues] = useState<FormState>({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle")

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus("submitting")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!res.ok) throw new Error("request-failed")

      setStatus("sent")
      setValues({ name: "", email: "", message: "" })
    } catch {
      // Fallback so the message is never lost even if the backend mailer
      // isn't configured: open the user's email client pre-filled.
      const subject = encodeURIComponent(`رسالة من الموقع - ${values.name}`)
      const body = encodeURIComponent(
        `الاسم: ${values.name}\nالبريد الإلكتروني: ${values.email}\n\n${values.message}`,
      )
      window.location.href = `mailto:contact@aibc.tn?subject=${subject}&body=${body}`
      setStatus("sent")
      setValues({ name: "", email: "", message: "" })
    }
  }

  return (
    <section id="contact" dir="rtl" className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">اتصل بنا</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            لديك سؤال أو تحتاج مساعدة؟ راسلنا عبر النموذج أدناه أو تواصل معنا مباشرة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4 shadow-sm"
            noValidate
          >
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium mb-1">
                الاسم الكامل
              </label>
              <Input
                id="contact-name"
                name="name"
                value={values.name}
                onChange={handleChange("name")}
                placeholder="اسمك"
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium mb-1">
                البريد الإلكتروني
              </label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium mb-1">
                رسالتك
              </label>
              <Textarea
                id="contact-message"
                name="message"
                value={values.message}
                onChange={handleChange("message")}
                placeholder="اكتب رسالتك هنا..."
                rows={5}
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>

            <Button type="submit" disabled={status === "submitting"} className="w-full flex items-center justify-center gap-2">
              {status === "submitting" ? (
                "جاري الإرسال..."
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  إرسال الرسالة
                </>
              )}
            </Button>

            {status === "sent" && (
              <p className="flex items-center gap-2 text-green-600 text-sm">
                <CheckCircle2 className="w-4 h-4" />
                تم إرسال رسالتك بنجاح، سنتواصل معك قريباً.
              </p>
            )}
            {status === "error" && (
              <p className="text-destructive text-sm">حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.</p>
            )}
          </form>

          {/* Direct contact details */}
          <div className="md:col-span-2 space-y-4">
            <a
              href="mailto:contact@aibc.tn"
              className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 hover:bg-muted transition-colors"
            >
              <Mail className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-medium">البريد الإلكتروني</p>
                <p className="text-sm text-muted-foreground">contact@aibc.tn</p>
              </div>
            </a>

            <a
              href="tel:+21628888612"
              className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 hover:bg-muted transition-colors"
            >
              <Phone className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-medium">الهاتف</p>
                <p className="text-sm text-muted-foreground" dir="ltr">
                  +216 28 888 612
                </p>
              </div>
            </a>

            <a
              href="https://wa.me/21628888612?text=مرحبا%20أريد%20التواصل"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 hover:bg-muted transition-colors"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-medium">واتساب</p>
                <p className="text-sm text-muted-foreground" dir="ltr">
                  +216 28 888 612
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
