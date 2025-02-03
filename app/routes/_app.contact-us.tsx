import { json, type ActionFunction, type MetaFunction } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useState } from 'react';
import { Resend } from 'resend';
import { encode } from 'html-entities';

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
    { title: 'Contact Us - KFC Freight Services' },
    { name: 'description', content: 'Get in touch with KFC Freight Services. We\'re here to help with all your freight and logistics needs.' },
  ];
};

interface ActionData {
  success?: boolean;
  errors?: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    system?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
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
    
    // Get and sanitize form data
    const name = sanitizeInput(formData.get('name') as string);
    const email = sanitizeInput(formData.get('email') as string);
    const subject = sanitizeInput(formData.get('subject') as string);
    const message = sanitizeInput(formData.get('message') as string);

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

    if (Object.keys(errors).length > 0) {
      return json<ActionData>({ errors });
    }

    // Additional spam checks
    if (message.includes('http') || message.includes('www.')) {
      return json<ActionData>({
        errors: {
          system: 'Links are not allowed in the message.'
        }
      });
    }

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY || '');

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return json<ActionData>({
        errors: {
          system: 'Email service is not properly configured. Please try again later.'
        }
      });
    }

    console.log('Attempting to send email with Resend...');
    
    const emailResult = await resend.emails.send({
      from: 'KFC Freight Services <onboarding@resend.dev>', // Use verified domain
      to: ['pukpuk.tw@gmail.com'],
      reply_to: email,
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

    console.log('Email sent successfully:', emailResult);

    return json<ActionData>({ success: true });
  } catch (error) {
    console.error('Email sending failed:', error);
    return json<ActionData>({
      errors: {
        system: 'Failed to send message. Please try again later or contact us directly.'
      }
    });
  }
};

export default function ContactUs() {
  const actionData = useActionData<ActionData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Office</h2>
            <div className="space-y-4">
              <p className="flex items-start">
                <svg className="h-6 w-6 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600">123 Business Street<br />Singapore 123456</span>
              </p>
              <p className="flex items-start">
                <svg className="h-6 w-6 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">+65 6789 0123</span>
              </p>
              <p className="flex items-start">
                <svg className="h-6 w-6 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">info@kfcfreight.com</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Hours</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-600">Monday - Friday:</span>
                <span className="text-gray-900">9:00 AM - 6:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Saturday:</span>
                <span className="text-gray-900">9:00 AM - 1:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-600">Sunday:</span>
                <span className="text-gray-900">Closed</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send Us a Message</h2>

          {actionData?.success ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
              <p className="text-green-700">Thank you for your message! We'll get back to you soon.</p>
            </div>
          ) : (
            <Form method="post" className="space-y-6" onSubmit={() => setIsSubmitting(true)}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {actionData?.errors?.name && (
                  <p className="mt-1 text-sm text-red-600">{actionData.errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {actionData?.errors?.email && (
                  <p className="mt-1 text-sm text-red-600">{actionData.errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                {actionData?.errors?.subject && (
                  <p className="mt-1 text-sm text-red-600">{actionData.errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                ></textarea>
                {actionData?.errors?.message && (
                  <p className="mt-1 text-sm text-red-600">{actionData.errors.message}</p>
                )}
                {actionData?.errors?.system && (
                  <p className="mt-1 text-sm text-red-600">{actionData.errors.system}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
