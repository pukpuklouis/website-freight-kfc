import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
  type TypedResponse,
} from "@remix-run/cloudflare";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useState, useRef, useEffect } from "react";
import { Resend } from "resend";
import { encode } from "html-entities";
import * as FormPrimitive from "@radix-ui/react-form";
import { Button } from "@radix-ui/themes";
import { useHydrated } from "~/hooks/use-hydrated";
import { generateSEOMeta, PAGE_SEO_CONFIGS } from "~/utils/seo";

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
  return generateSEOMeta(PAGE_SEO_CONFIGS.contactUs);
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

/**
 * Defines the structure of Cloudflare environment variables
 * @property {string} RESEND_API_KEY - API key for Resend email service
 */
interface Env {
  RESEND_API_KEY: string;
}

function validateEnv(env: Env): void {
  if (!env.RESEND_API_KEY) {
    throw new Error("Missing required environment variable: RESEND_API_KEY");
  }
}

export const action = async ({
  request,
  context,
}: ActionFunctionArgs): Promise<TypedResponse<ActionData>> => {
  const env = context.cloudflare.env as Env;
  validateEnv(env);
  // Get clientIP
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Check rate limit
  if (isRateLimited(ip)) {
    return json<ActionData>(
      {
        errors: {
          system: "Too many requests. Please try again later.",
        },
      },
      { status: 429 },
    );
  }

  try {
    const formData = await request.formData();
    const values = Object.fromEntries(formData);

    // Get and sanitize form data
    const name = sanitizeInput(values.name as string);
    const email = sanitizeInput(values.email as string);
    const subject = sanitizeInput(values.subject as string);
    const message = sanitizeInput(values.message as string);

    const errors: ActionData["errors"] = {};

    // Validate input length and format
    if (!name || name.length < 2 || name.length > 20) {
      errors.name = "姓名必須在2到20字之間";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "請輸入有效的Email";
    }

    if (!subject || subject.length < 3 || subject.length > 200) {
      errors.subject = "主題必須在3到200字之間";
    }

    if (!message || message.length < 10 || message.length > 5000) {
      errors.message = "訊息必須在10到5000字之間";
    }

    // Additional spam checks
    if (message.includes("http") || message.includes("www.")) {
      errors.system = "訊息中不得包含連結。";
    }

    if (Object.keys(errors).length > 0) {
      return json<ActionData>({
        errors,
        values: { name, email, subject, message },
      });
    }

    // Initialize Resend with API key from context
    const resend = new Resend(env.RESEND_API_KEY);

    try {
      await resend.emails.send({
        from: "noreply@kabayan.com.tw", // Domain verified with Resend, see https://www.resend.com/docs/domain-verification
        to: ["unisky@ms76.hinet.net"],
        replyTo: email,
        subject: `網站聯絡表單: ${subject}`,
        html: `
          <h2>網站聯絡表單</h2>
          <p><strong>客戶姓名:</strong> ${name}</p>
          <p><strong>客戶Email:</strong> ${email}</p>
          <p><strong>主題:</strong> ${subject}</p>
          <p><strong>訊息:</strong></p>
          <p>${message}</p>
          <hr>
          <p><small>此封信件由卡菲斯官網的聯絡表單送出。</small></p>
        `,
      });
      return json<ActionData>({
        values: { name, email, subject, message },
        success: true,
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      return json<ActionData>({
        errors: {
          system: "寄送失敗，請稍後再試。",
        },
        values: { name, email, subject, message },
      });
    }
  } catch (error) {
    console.error("Form submission error:", error);
    return json<ActionData>({
      errors: {
        system: "發生意外錯誤，請稍後再試。",
      },
    });
  }
};

interface FormFieldProps {
  name: string;
  label: string;
  type?: "text" | "email" | "textarea";
  required?: boolean;
  error?: string;
  rows?: number;
  defaultValue?: string;
}

const FormField = ({
  name,
  label,
  type = "text",
  required = true,
  error,
  rows,
  defaultValue,
}: FormFieldProps) => {
  const inputClasses = `
    mt-2 block w-full border border-[var(--gray-9)]
    rounded-md shadow-sm 
    ${error ? "border-[var(--accent-8)]" : "border-[var(--gray-7)]"}
    focus:border-[var(--accent-a8)] focus:ring focus:ring-[var(--accent-a8)] focus:ring-opacity-50
    text-base
    px-4 py-3
    bg-white dark:bg-[var(--gray-2)]
    text-[var(--gray-12)] dark:text-[var(--gray-12)]
    placeholder-[var(--gray-8)] dark:placeholder-[var(--gray-8)]
  `;

  return (
    <div className="space-y-2" data-oid="ieero6v">
      <div className="flex items-baseline justify-between" data-oid="uh7mrfm">
        <label
          htmlFor={name}
          className="text-sm font-medium text-[var(--gray-12)] dark:text-[var(--gray-12)]"
          data-oid="yqn7f:c"
        >
          {label}
        </label>
        {required && (
          <span className="text-sm text-[var(--accent-9)]" data-oid="knl.h_-">
            *
          </span>
        )}
      </div>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          className={inputClasses}
          required={required}
          rows={rows}
          defaultValue={defaultValue}
          data-oid=".wiy._-"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          className={inputClasses}
          required={required}
          defaultValue={defaultValue}
          data-oid="7t-2705"
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-[var(--accent-9)]" data-oid="kk-6bdl">
          {error}
        </p>
      )}
    </div>
  );
};

const LocationIcon = () => (
  <svg
    className="h-6 w-6 text-[var(--accent-9)]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    data-oid="nlrywe0"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      data-oid="blv13bl"
    />

    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      data-oid="ve51-r1"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="h-6 w-6 text-[var(--accent-9)]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    data-oid=":fflmrt"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      data-oid="gc.btm2"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    className="h-6 w-6 text-[var(--accent-9)]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    data-oid="a6how:-"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      data-oid="x666zwf"
    />
  </svg>
);

const CONTACT_INFO = [
  {
    icon: <LocationIcon data-oid="axyw9cm" />,
    title: "公司地址",
    content: (
      <p data-oid="h4sh5kk">11670 台北市文山區羅斯福路六段142巷82號1樓</p>
    ),
  },
  {
    icon: <PhoneIcon data-oid="iequqpo" />,
    title: "聯絡電話",
    content: <p data-oid="j08jif3">(02) 2935-1589</p>,
  },
  {
    icon: <EmailIcon data-oid="_gesb4:" />,
    title: "電子郵件",
    content: <p data-oid="j04s93v">unisky@ms76.hinet.net</p>,
  },
] as const;

const BusinessHourRow = ({ days, hours }: { days: string; hours: string }) => (
  <div className="flex justify-between py-2" data-oid="d-tt48.">
    <span
      className="text-[var(--gray-12)] dark:text-[var(--gray-12)]"
      data-oid="zdy77g8"
    >
      {days}
    </span>
    <span
      className="text-[var(--gray-11)] dark:text-[var(--gray-11)]"
      data-oid="f4wxi8a"
    >
      {hours}
    </span>
  </div>
);

const BUSINESS_HOURS = [
  {
    days: "週一至週五",
    hours: "9:00 AM - 6:00 PM",
  },
  {
    days: "週六、日",
    hours: "休息",
  },
] as const;

const ContactInfo = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) => (
  <div className="flex gap-4 items-start" data-oid="2jlhx:.">
    <div
      className="p-2 bg-[var(--gray-3)] dark:bg-[var(--gray-4)] rounded-lg"
      data-oid="5eomk04"
    >
      {icon}
    </div>
    <div data-oid=":4:q5p-">
      <h3
        className="text-lg font-medium text-[var(--gray-12)] dark:text-[var(--gray-12)]"
        data-oid="-d:1f5y"
      >
        {title}
      </h3>
      <div
        className="mt-1 text-[var(--gray-11)] dark:text-[var(--gray-11)]"
        data-oid="mp:ycj8"
      >
        {content}
      </div>
    </div>
  </div>
);

export default function ContactUs() {
  const isHydrated = useHydrated();
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form on successful submission
  useEffect(() => {
    if (actionData?.success && formRef.current) {
      formRef.current.reset();
    }
  }, [actionData?.success]);

  return (
    <div
      className="relative bg-gradient-to-b from-bg-[var(--accent-12a)] to-transparent bg-[var(--accent-2)] pt-24 "
      data-oid="y-0i8p7"
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 "
        data-oid="4vqo4nr"
      >
        {/* Hero Section */}
        <div className="text-center mb-16" data-oid="jxeak3x">
          <h1
            className="text-5xl font-bold text-[var(--gray-12)] dark:text-[var(--gray-12)] mb-4"
            data-oid="6px1:s9"
          >
            聯絡我們
          </h1>
          <p
            className="text-xl text-[var(--gray-11)] dark:text-[var(--gray-11)] max-w-2xl mx-auto"
            data-oid="r91lfvd"
          >
            無論您有任何問題或需求，我們都樂意為您提供協助。讓我們一起為您的貨運需求找到最佳解決方案。
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12"
          data-oid="jhfcnm2"
        >
          {/* Contact Information */}
          <div className="space-y-8" data-oid="3c02uud">
            <div
              className="bg-[var(--gray-1)] dark:bg-[var(--gray-2)] rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 border border-[var(--gray-6)]"
              data-oid="1lc6ac9"
            >
              <h2
                className="text-2xl font-bold text-[var(--gray-12)] dark:text-[var(--gray-12)] mb-6"
                data-oid="bokiz8c"
              >
                聯絡資訊
              </h2>
              <div className="space-y-6" data-oid=".yo9kvx">
                {CONTACT_INFO.map((info, index) => (
                  <ContactInfo
                    key={index}
                    icon={info.icon}
                    title={info.title}
                    content={info.content}
                    data-oid="05lo8ta"
                  />
                ))}
              </div>

              <div className="mt-8" data-oid=":m.3xa8">
                <h3
                  className="text-lg font-medium text-[var(--gray-12)] dark:text-[var(--gray-12)] mb-3"
                  data-oid="2ajlvds"
                >
                  營業時間
                </h3>
                <div className="space-y-2" data-oid="akhfe6q">
                  {BUSINESS_HOURS.map((schedule, index) => (
                    <BusinessHourRow
                      key={index}
                      days={schedule.days}
                      hours={schedule.hours}
                      data-oid=":-okxyd"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="bg-[var(--gray-1)] dark:bg-[var(--gray-2)] shadow-xl p-8 rounded-lg border border-[var(--gray-6)]"
            data-oid="rk.1b.6"
          >
            <h2
              className="text-2xl font-bold mb-6 text-[var(--gray-12)] dark:text-[var(--gray-12)]"
              data-oid="8_sw3ek"
            >
              聯絡我們
            </h2>

            {actionData?.success ? (
              <div
                className="bg-green-50 dark:bg-[var(--accent-2)] border border-[var(--gray-6)] rounded-xl p-6 mb-6"
                data-oid="9lgun9k"
              >
                <div className="flex items-center" data-oid=":npctb.">
                  <svg
                    className="h-6 w-6 text-[var(--accent-9)] dark:text-[var(--accent-9)] mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="cz149bo"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                      data-oid=".2jsc1r"
                    />
                  </svg>
                  <p
                    className="text-[var(--accent-11)] dark:text-[var(--accent-11)] font-medium"
                    data-oid="wxyi7wa"
                  >
                    感謝您的訊息！我們會盡快回覆您。
                  </p>
                </div>
              </div>
            ) : (
              <FormPrimitive.Root asChild data-oid="pr.cs.3">
                <Form
                  method="post"
                  ref={formRef}
                  className="space-y-6"
                  data-oid="5s5jz8v"
                >
                  <FormField
                    name="name"
                    label="姓名"
                    error={actionData?.errors?.name}
                    defaultValue={actionData?.values?.name}
                    data-oid="3rhw6tf"
                  />

                  <FormField
                    name="email"
                    label="電子郵件"
                    type="email"
                    error={actionData?.errors?.email}
                    defaultValue={actionData?.values?.email}
                    data-oid="h4xjj2p"
                  />

                  <FormField
                    name="subject"
                    label="主旨"
                    error={actionData?.errors?.subject}
                    defaultValue={actionData?.values?.subject}
                    data-oid=":tgvn:1"
                  />

                  <FormField
                    name="message"
                    label="訊息內容"
                    type="textarea"
                    rows={4}
                    error={actionData?.errors?.message}
                    defaultValue={actionData?.values?.message}
                    data-oid="37qmaz4"
                  />

                  <FormPrimitive.Submit asChild data-oid="8_nun42">
                    <Button
                      disabled={!isHydrated || navigation.state === "submitting"}
                      type="submit"
                      size="3"
                      variant="solid"
                      className="w-full"
                      data-oid="oiu-nmn"
                    >
                      {navigation.state === "submitting"
                        ? "傳送中..."
                        : "傳送訊息"}
                    </Button>
                  </FormPrimitive.Submit>
                  {actionData?.errors?.system && (
                    <p
                      className="text-sm text-[var(--accent-9)]"
                      data-oid="slbfr9k"
                    >
                      {actionData.errors.system}
                    </p>
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
