import React from "react";

export const metadata = {
  title: "Privacy Policy | Parenting Guide Academy",
  description:
    "Privacy Policy of Parenting Guide Academy - Expert Parenting Workshop",
};

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Effective Date: <span className="font-medium">11 April 2026</span>
          </p>
          <p className="mt-1 text-sm sm:text-base text-gray-600 break-all">
            Website:{" "}
            <span className="font-medium">https://parentingguide.in</span>
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl border bg-white p-5 sm:p-8">
          <PolicyBlock title="1) Introduction">
            <p>
              Parenting Guide Academy (&quot;we&quot;, &quot;our&quot;,
              &quot;us&quot;) respects your privacy and is committed to
              protecting your personal information. This Privacy Policy explains
              how we collect, use, store, and protect your information when you
              visit and use our website, workshops, and parenting guidance
              services.
            </p>
          </PolicyBlock>

          <PolicyBlock title="2) Information We Collect">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Personal Information:</span>{" "}
                Name, Email address, Phone number, State/Location (for workshop
                targeting), and messages sent via contact forms.
              </li>
              <li>
                <span className="font-semibold">
                  Workshop/Payment Information:
                </span>{" "}
                Registration details, workshop enrollment, and payment
                transaction references.
                <span className="font-medium"> We do not store</span> your
                card/UPI/bank details.
              </li>
              <li>
                <span className="font-semibold">Technical Information:</span> IP
                address, browser/device type, pages visited, session duration,
                cookies/analytics, WhatsApp communication logs.
              </li>
            </ul>
          </PolicyBlock>

          <PolicyBlock title="3) How We Use Your Information">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                To provide access to workshops and parenting guidance services.
              </li>
              <li>
                To respond to inquiries and provide personalized parenting
                support.
              </li>
              <li>
                To send important updates, workshop dates, and community
                announcements.
              </li>
              <li>To improve website performance and user experience.</li>
              <li>To prevent fraud, spam, and misuse of our platform.</li>
            </ul>
          </PolicyBlock>

          <PolicyBlock title="4) Cookies & Tracking Technologies">
            <p>
              We may use cookies to remember your preferences, analyze traffic,
              and enhance your experience. You can disable cookies in your
              browser settings, but some features may not work properly.
            </p>
          </PolicyBlock>

          <PolicyBlock title="5) Sharing of Information">
            <p className="mb-3">
              We{" "}
              <span className="font-semibold">do not sell, rent, or trade</span>{" "}
              your personal information.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Payment processors (to complete workshop registrations).</li>
              <li>
                Email/SMS/WhatsApp service providers (to send important
                communication).
              </li>
              <li>Government/legal authorities (if required by law).</li>
              <li>Security reasons (to protect users and platform).</li>
            </ul>
          </PolicyBlock>

          <PolicyBlock title="6) Third-Party Links">
            <p>
              Our website may contain links to third-party websites (e.g.,
              YouTube, WhatsApp, payment platforms). We are not responsible for
              their privacy practices. Please review their privacy policies
              separately.
            </p>
          </PolicyBlock>

          <PolicyBlock title="7) Data Security">
            <p>
              We follow reasonable security practices to protect user data.
              However, no online system is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </PolicyBlock>

          <PolicyBlock title="8) Children's Privacy">
            <p>
              Our services are targeted at parents and guardians aged{" "}
              <span className="font-semibold">18 years or older</span>. While we
              may reference children&apos;s information in the context of
              parenting guidance, we collect minimal information about children
              and never for marketing purposes.
            </p>
          </PolicyBlock>

          <PolicyBlock title="9) Your Rights">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Request access, correction, or deletion of your data (where
                applicable).
              </li>
              <li>
                Unsubscribe from promotional communication anytime via WhatsApp
                or email.
              </li>
            </ul>
          </PolicyBlock>

          <PolicyBlock title="10) Policy Updates">
            <p>
              We may update this Privacy Policy from time to time. The updated
              version will be posted on this page with a new effective date.
            </p>
          </PolicyBlock>

          <PolicyBlock title="11) Contact Us">
            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="text-sm sm:text-base">
                <span className="font-semibold">WhatsApp:</span> Join our
                WhatsApp community for support
              </p>
              <p className="text-sm sm:text-base break-all mt-1">
                <span className="font-semibold">Email:</span>{" "}
                support@parentingguide.com
              </p>
              <p className="text-xs text-gray-500 mt-3">
                For privacy concerns, contact us via email within 48 hours.
              </p>
            </div>
          </PolicyBlock>
        </div>
      </main>
    </div>
  );
};

export default Page;

function PolicyBlock({ title, children }) {
  return (
    <section className="py-6 border-b last:border-b-0">
      <h2 className="text-base sm:text-lg font-bold text-gray-900">{title}</h2>
      <div className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
