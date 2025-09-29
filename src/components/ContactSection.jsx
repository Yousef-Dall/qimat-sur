import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useI18n } from "../i18n/I18nProvider";
import mechanic from "../assets/hero-mechanic.jpg";

const ContactHero = styled(Box)(({ dir }) => ({
  position: 'relative',
  minHeight: '100vh',
  backgroundImage: `url(${mechanic})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  display: 'flex',
  alignItems: 'center',
  direction: dir,
}));

const ContactScrim = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'linear-gradient(135deg, rgba(8, 124, 207, 0.85) 0%, rgba(27, 26, 120, 0.85) 100%)',
});

const ContactCard = styled(Card)({
  position: 'relative',
  zIndex: 2,
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: '20px',
  maxWidth: '600px',
  margin: '0 auto',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
});

const ContactTitle = styled(Typography)({
  fontWeight: 700,
  fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
  textAlign: 'center',
  marginBottom: '32px',
  color: '#1f1b5a',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    color: '#1f1b5a', // Ensure input text is dark and visible
    '& input': {
      color: '#1f1b5a !important', // Force input text color
    },
    '& textarea': {
      color: '#1f1b5a !important', // Force textarea text color
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#087ccf',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#1f1b5a',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#4b5563',
    '&.Mui-focused': {
      color: '#1f1b5a',
    },
  },
  '& .MuiInputBase-input': {
    color: '#1f1b5a !important', // Additional specificity for input text
  },
});

const HoneypotInput = styled('input')({
  position: 'absolute',
  left: '-9999px',
  top: '-9999px',
  width: '1px',
  height: '1px',
  opacity: 0,
  pointerEvents: 'none',
});

const SubmitButton = styled(Button)({
  borderRadius: '12px',
  padding: '12px 32px',
  fontWeight: 700,
  fontSize: '1.1rem',
  textTransform: 'none',
  background: 'linear-gradient(135deg, #087ccf 0%, #1f1b5a 100%)',
  color: '#fff',
  minHeight: '48px',
  '&:hover': {
    background: 'linear-gradient(135deg, #0668a8 0%, #2a2570 100%)',
    boxShadow: '0 8px 24px rgba(31, 27, 90, 0.4)',
  },
  '&:disabled': {
    background: '#94a3b8',
    color: '#fff',
  },
});

const StyledDivider = styled(Divider)({
  margin: '40px 0',
  background: 'rgba(255, 255, 255, 0.3)',
  height: '2px',
});

export default function ContactSection() {
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    website: "", // honeypot field (must stay empty)
  });
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return t("contact.name_required", "Name is required");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return t("contact.email_invalid", "Valid email is required");
    if (!form.message.trim()) return t("contact.message_required", "Message is required");
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setStatus({ state: "error", msg: err });

    // Check honeypot - if filled, silently "succeed"
    if (form.website) {
      setStatus({ state: "success", msg: t("contact.sent", "Message sent successfully!") });
      setForm({ name: "", phone: "", email: "", message: "", website: "" });
      return;
    }

    try {
      setStatus({ state: "loading", msg: t("contact.sending", "Sending...") });

      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          website: form.website, // honeypot
          lang,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Failed");

      setStatus({ state: "success", msg: t("contact.sent", "Message sent successfully! We'll get back to you soon.") });
      setForm({ name: "", phone: "", email: "", message: "", website: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      
      // Check if it's a 404 error (likely local development)
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (error.message.includes('404') || error.message.includes('Failed to fetch')) {
        if (isLocal) {
          setStatus({ 
            state: "error", 
            msg: "⚠️ Development Mode: Contact form will work on Vercel deployment. For now, please email us directly at yousef.n.d.2002@gmail.com" 
          });
        } else {
          setStatus({ 
            state: "error", 
            msg: "Service temporarily unavailable. Please email us directly at yousef.n.d.2002@gmail.com" 
          });
        }
      } else {
        setStatus({ 
          state: "error", 
          msg: t("contact.err_generic", "Couldn't send right now. Please try again or email us directly at yousef.n.d.2002@gmail.com") 
        });
      }
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <StyledDivider />
      </Container>

      <ContactHero
        component="section"
        id="contact"
        dir={isAr ? "rtl" : "ltr"}
        aria-label={t("contact.heading", "Contact Us")}
      >
        <ContactScrim />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <ContactCard>
            <CardContent sx={{ padding: '40px' }}>
              <ContactTitle component="h2">
                {t("contact.heading", "Contact Us")}
              </ContactTitle>

              <Box component="form" onSubmit={onSubmit} noValidate>
                {/* Honeypot (bots fill it, humans never see it) */}
                <HoneypotInput
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={onChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <StyledTextField
                  fullWidth
                  type="text"
                  name="name"
                  label={t("contact.name", "Name")}
                  value={form.name}
                  onChange={onChange}
                  autoComplete="name"
                  required
                  variant="outlined"
                />

                <StyledTextField
                  fullWidth
                  type="tel"
                  name="phone"
                  label={t("contact.phone", "Phone (optional)")}
                  value={form.phone}
                  onChange={onChange}
                  autoComplete="tel"
                  variant="outlined"
                />

                <StyledTextField
                  fullWidth
                  type="email"
                  name="email"
                  label={t("contact.email", "Email")}
                  value={form.email}
                  onChange={onChange}
                  autoComplete="email"
                  required
                  variant="outlined"
                />

                <StyledTextField
                  fullWidth
                  multiline
                  rows={4}
                  name="message"
                  label={t("contact.message", "Message")}
                  value={form.message}
                  onChange={onChange}
                  required
                  variant="outlined"
                />

                {status.state !== "idle" && (
                  <Box sx={{ mb: 3 }}>
                    <Alert 
                      severity={
                        status.state === "success" ? "success" : 
                        status.state === "error" ? "error" : "info"
                      }
                      sx={{ borderRadius: '12px' }}
                    >
                      {status.msg}
                    </Alert>
                  </Box>
                )}

                <Box sx={{ textAlign: 'center' }}>
                  <SubmitButton
                    type="submit"
                    disabled={status.state === "loading"}
                    startIcon={status.state === "loading" ? <CircularProgress size={20} color="inherit" /> : null}
                  >
                    {status.state === "loading" 
                      ? t("contact.sending", "Sending...") 
                      : t("contact.send", "Send Message")
                    }
                  </SubmitButton>
                </Box>
              </Box>
            </CardContent>
          </ContactCard>
        </Container>
      </ContactHero>
    </>
  );
}