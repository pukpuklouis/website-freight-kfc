import { json, type ActionFunction, type MetaFunction } from '@remix-run/cloudflare';
import type { AppLoadContext } from '@remix-run/cloudflare';
import { Form, useActionData } from '@remix-run/react';
import { useState, useRef, useEffect } from 'react';
import { Resend } from 'resend';
import { encode } from 'html-entities';
import * as FormPrimitive from '@radix-ui/react-form';
import { Button } from '@radix-ui/themes';

// Store IP-based rate limiting
const ipRequests = new Map<string, { count: number; timestamp: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
const MAX_REQUESTS = 5; // Maximum 5 requests per hour

// Helper function to check rate limit
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const requestData = ipRequests.get(ip);

  if (!requestData) {
    ipRequests.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - requestData.timestamp > RATE_LIMIT_WINDOW) {
    ipRequests.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (requestData.count >= MAX_REQUESTS) {
    return true;
  }

  requestData.count++;
  return false;
}

// Input sanitization function
function sanitizeInput(input: string): string {
  return encode(input.trim());
}

export const meta: MetaFunction = () => {
  return [
    { title: '聯絡我們-卡菲斯國際' },
    { name: 'description', content: '聯繫卡菲斯國際貨運服務。我們隨時為您的貨運和物流需求提供協助。' },
  ];
};

interface ActionData {
  errors?: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    system?: string;
  };
  values?: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
  success?: boolean;
}

interface Env {
  RESEND_API_KEY: string;
}

export const action: ActionFunction = async ({ request, context }: { 
  request: Request; 
  context: AppLoadContext & { env: Env } 
}) => {
  // Get client IP
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  
  // Check rate limit
  if (isRateLimited(ip)) {
    return json<ActionData>({
      errors: {
        system: 'Too many requests. Please try again later.'
      }
    }, { status: 429 });
  }

  try {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);
    
    // Get and sanitize form data
    const name = sanitizeInput(values.name as string);
    const email = sanitizeInput(values.email as string);
    const subject = sanitizeInput(values.subject as string);
    const message = sanitizeInput(values.message as string);

    const errors: ActionData['errors'] = {};

    // Validate input length and format
    if (!name || name.length < 2 || name.length > 100) {
      errors.name = 'Name must be between 2 and 100 characters';
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Valid email is required';
    }

    if (!subject || subject.length < 3 || subject.length > 200) {
      errors.subject = 'Subject must be between 3 and 200 characters';
    }

    if (!message || message.length < 10 || message.length > 5000) {
      errors.message = 'Message must be between 10 and 5000 characters';
    }

    // Additional spam checks
    if (message.includes('http') || message.includes('www.')) {
      errors.system = 'Links are not allowed in the message.';
    }

    if (Object.keys(errors).length > 0) {
      return json<ActionData>({ errors, values: { name, email, subject, message } });
    }

    // Get API key from Cloudflare context
    const RESEND_API_KEY = context.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured in Cloudflare environment');
      return json<ActionData>({
        errors: {
          system: 'Email service is not properly configured. Please try again later.'
        },
        values: { name, email, subject, message }
      });
    }

    // Initialize Resend with API key from context
    const resend = new Resend(RESEND_API_KEY);
    
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: ['pukpuk.tw@gmail.com'],
        replyTo: email,
        subject: `Contact Form: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr>
          <p><small>This email was sent from the contact form at KFC Freight Services website.</small></p>
        `
      });

      return json<ActionData>({ 
        values: { name, email, subject, message },
        success: true 
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      return json<ActionData>({
        errors: {
          system: 'Failed to send email. Please try again later.'
        },
        values: { name, email, subject, message }
      });
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return json<ActionData>({
      errors: {
        system: 'An unexpected error occurred. Please try again.'
      }
    });
  }
};

interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'textarea';
  required?: boolean;
  error?: string;
  rows?: number;
  defaultValue?: string;
}

const FormField = ({ name, label, type = 'text', required = true, error, rows, defaultValue }: FormFieldProps) => {
  const inputClasses = `
    mt-2 block w-full border border-[var(--gray-9)]
    rounded-md shadow-sm 
    ${error ? 'border-[var(--accent-8)]' : 'border-[var(--gray-7)]'}
    focus:border-[var(--accent-a8)] focus:ring focus:ring-[var(--accent-a8)] focus:ring-opacity-50
    text-base
    px-4 py-3
    bg-white dark:bg-[var(--gray-2)]
    text-[var(--gray-12)] dark:text-[var(--gray-12)]
    placeholder-[var(--gray-8)] dark:placeholder-[var(--gray-8)]
  `;

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <label htmlFor={name} className="text-sm font-medium text-[var(--gray-12)] dark:text-[var(--gray-12)]">
          {label}
        </label>
        {required && (
          <span className="text-sm text-[var(--accent-9)]">
            *
          </span>
        )}
      </div>
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          className={inputClasses}
          required={required}
          rows={rows}
          defaultValue={defaultValue}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={inputClasses}
          required={required}
          defaultValue={defaultValue}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-[var(--accent-9)]">{error}</p>
      )}
    </div>
  );
};

const LocationIcon = () => (
  <svg className="h-6 w-6 text-[var(--accent-9)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="h-6 w-6 text-[var(--accent-9)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="h-6 w-6 text-[var(--accent-9)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CONTACT_INFO = [
  {
    icon: <LocationIcon />,
    title: '公司地址',
    content: <p>11670 台北市文山區羅斯福路六段142巷82號1樓</p>
  },
  {
    icon: <PhoneIcon />,
    title: '聯絡電話',
    content: <p>(02) 2935-1589</p>
  },
  {
    icon: <EmailIcon />,
    title: '電子郵件',
    content: <p>kafs123@126.com</p>
  }
] as const;

const BusinessHourRow = ({ days, hours }: { days: string; hours: string }) => (
  <div className="flex justify-between py-2">
    <span className="text-[var(--gray-12)] dark:text-[var(--gray-12)]">{days}</span>
    <span className="text-[var(--gray-11)] dark:text-[var(--gray-11)]">{hours}</span>
  </div>
);

const BUSINESS_HOURS = [
  {
    days: '週一至週五',
    hours: '9:00 AM - 6:00 PM'
  },
  {
    days: '週六',
    hours: '9:00 AM - 1:00 PM'
  },
  {
    days: '週日',
    hours: '休息'
  }
] as const;

const ContactInfo = ({ icon, title, content }: { icon: React.ReactNode; title: string; content: React.ReactNode }) => (
  <div className="flex gap-4 items-start">
    <div className="p-2 bg-[var(--gray-3)] dark:bg-[var(--gray-4)] rounded-lg">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-medium text-[var(--gray-12)] dark:text-[var(--gray-12)]">{title}</h3>
      <div className="mt-1 text-[var(--gray-11)] dark:text-[var(--gray-11)]">{content}</div>
    </div>
  </div>
);

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const actionData = useActionData<ActionData>();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (actionData?.success) {
      // Clear form on success
      formRef.current?.reset();
      setIsSubmitting(false);
    } else if (actionData?.errors) {
      // Reset submitting state if there are errors
      setIsSubmitting(false);
    }
  }, [actionData]);

  return (
    <div className="relative bg-gradient-to-b from-bg-[var(--accent-12a)] to-transparent bg-[var(--accent-2)] pt-24 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[var(--gray-12)] dark:text-[var(--gray-12)] mb-4">聯絡我們</h1>
          <p className="text-xl text-[var(--gray-11)] dark:text-[var(--gray-11)] max-w-2xl mx-auto">
            無論您有任何問題或需求，我們都樂意為您提供協助。讓我們一起為您的貨運需求找到最佳解決方案。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-[var(--gray-1)] dark:bg-[var(--gray-2)] rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 border border-[var(--gray-6)]">
              <h2 className="text-2xl font-bold text-[var(--gray-12)] dark:text-[var(--gray-12)] mb-6">聯絡資訊</h2>
              <div className="space-y-6">
                {CONTACT_INFO.map((info, index) => (
                  <ContactInfo
                    key={index}
                    icon={info.icon}
                    title={info.title}
                    content={info.content}
                  />
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-[var(--gray-12)] dark:text-[var(--gray-12)] mb-3">營業時間</h3>
                <div className="space-y-2">
                  {BUSINESS_HOURS.map((schedule, index) => (
                    <BusinessHourRow
                      key={index}
                      days={schedule.days}
                      hours={schedule.hours}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[var(--gray-1)] dark:bg-[var(--gray-2)] shadow-xl p-8 rounded-lg shadow-sm border border-[var(--gray-6)]">
            <h2 className="text-2xl font-bold mb-6 text-[var(--gray-12)] dark:text-[var(--gray-12)]">聯絡我們</h2>

            {actionData?.success ? (
              <div className="bg-green-50 dark:bg-[var(--accent-2)] border border-[var(--gray-6)] rounded-xl p-6 mb-6">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-[var(--accent-9)] dark:text-[var(--accent-9)] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-[var(--accent-11)] dark:text-[var(--accent-11)] font-medium">感謝您的訊息！我們會盡快回覆您。</p>
                </div>
              </div>
            ) : (
              <FormPrimitive.Root asChild>
                <Form 
                  ref={formRef}
                  method="post" 
                  className="space-y-6" 
                  onSubmit={() => setIsSubmitting(true)}
                >
                  <FormField 
                    name="name" 
                    label="姓名" 
                    error={actionData?.errors?.name}
                    defaultValue={actionData?.values?.name} 
                  />
                  <FormField 
                    name="email" 
                    label="電子郵件" 
                    type="email" 
                    error={actionData?.errors?.email}
                    defaultValue={actionData?.values?.email}
                  />
                  <FormField 
                    name="subject" 
                    label="主旨" 
                    error={actionData?.errors?.subject}
                    defaultValue={actionData?.values?.subject}
                  />
                  <FormField 
                    name="message" 
                    label="訊息內容" 
                    type="textarea" 
                    rows={4} 
                    error={actionData?.errors?.message}
                    defaultValue={actionData?.values?.message}
                  />
                  <FormPrimitive.Submit asChild>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      size="3"
                      variant="solid"
                      className="w-full"
                    >
                      {isSubmitting ? '傳送中...' : '傳送訊息'}
                    </Button>
                  </FormPrimitive.Submit>
                  {actionData?.errors?.system && (
                    <p className="text-sm text-[var(--accent-9)]">{actionData.errors.system}</p>
                  )}
                </Form>
              </FormPrimitive.Root>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
