import React from "react";

export const metadata = {
  title: "Terms of Service | Parenting Guide Academy",
  description: "Terms of Service of Parenting Guide Academy - Expert Parenting Workshop",
};

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Effective Date: <span className="font-medium">11 April 2026</span>
          </p>
          <p className="mt-1 text-sm sm:text-base text-gray-600 break-all">
            Website: <span className="font-medium">https://parentingguide.in</span>
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl border bg-white p-5 sm:p-8">
          <TermsBlock title="1) Acceptance of Terms">
            <p>
              By accessing this website and registering for our workshops or using our parenting guidance services, you agree to be bound by these
              Terms of Service. If you do not agree, please do not use our website.
            </p>
          </TermsBlock>

          <TermsBlock title="2) Services Provided">
            <p>
              Parenting Guide Academy provides expert parenting education and guidance services including
              mindful parenting workshops, child psychology insights, evidence-based parenting techniques, training videos, resources, and community support
              through WhatsApp groups and mentorship programs.
            </p>
          </TermsBlock>

          <TermsBlock title="3) Important Disclaimer (Educational Guidance Only)">
            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
              <p className="font-semibold text-gray-900">
                Our content is for educational and informational purposes only.
              </p>
              <p className="mt-2 text-sm sm:text-base text-gray-700">
                We are not licensed therapists, pediatricians, or medical professionals. For specific medical, psychological, or behavioral concerns about your child,
                please consult with qualified healthcare professionals.
              </p>
            </div>
          </TermsBlock>

          <TermsBlock title="4) Parental Responsibility">
            <p>
              Parents/guardians are solely responsible for their parenting decisions and the well-being of their children. 
              Our workshops and guidance are supplementary resources and do not replace professional medical, psychological, or legal advice.
            </p>
          </TermsBlock>

          <TermsBlock title="5) User Conduct">
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Share abusive, discriminatory, or inappropriate content in our community groups.</li>
              <li>Sell, distribute, or resell our course materials without permission.</li>
              <li>Share personal information of other parents without their consent.</li>
              <li>Violate any laws or regulations.</li>
            </ul>
          </TermsBlock>

          <TermsBlock title="6) Intellectual Property">
            <p>
              All content, materials, and resources provided by Parenting Guide Academy are protected by copyright
              and intellectual property laws. You may use them for personal, non-commercial purposes only.
            </p>
          </TermsBlock>

          <TermsBlock title="7) Limitation of Liability">
            <p>
              Parenting Guide Academy shall not be liable for any indirect, incidental, consequential, or punitive damages
              arising from your use of our website or services. Our total liability shall not exceed the amount paid for services.
            </p>
          </TermsBlock>

          <TermsBlock title="8) Payment & Refunds">
            <p className="mb-3">
              Workshop registrations are non-refundable after enrollment unless there is a specific cancellation within the stated period.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Refund requests must be made within 7 days of registration.</li>
              <li>Payment disputes should be reported within 30 days.</li>
              <li>We accept various payment methods for your convenience.</li>
            </ul>
          </TermsBlock>

          <TermsBlock title="9) Termination">
            <p>
              We reserve the right to terminate access to our services if you violate these Terms of Service,
              engage in inappropriate behavior, or pose a risk to our community.
            </p>
          </TermsBlock>

          <TermsBlock title="10) Governing Law">
            <p>
              These Terms of Service shall be governed by the laws of India. Any disputes shall be resolved
              under the jurisdiction of courts in India.
            </p>
          </TermsBlock>

          <TermsBlock title="11) Third-Party Links & Content">
            <p>
              Our website may contain links to third-party websites and content. We are not responsible for their accuracy,
              content, or practices. Access third-party sites at your own risk.
            </p>
          </TermsBlock>

          <TermsBlock title="12) Modifications to Terms">
            <p>
              We may update these Terms of Service anytime. Continued use of our services after updates constitutes
              acceptance of the new terms.
            </p>
          </TermsBlock>

          <TermsBlock title="13) Contact Us">
            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="text-sm sm:text-base">
                <span className="font-semibold">WhatsApp Community:</span> Join for workshop updates and support
              </p>
              <p className="text-sm sm:text-base break-all mt-1">
                <span className="font-semibold">Email:</span> support@parentingguide.com
              </p>
              <p className="text-xs text-gray-500 mt-3">
                For questions about these terms, contact us within 48 hours.
              </p>
            </div>
          </TermsBlock>
        </div>
      </main>
    </div>
  );
};

export default Page;

function TermsBlock({ title, children }) {
  return (
    <section className="py-6 border-b last:border-b-0">
      <h2 className="text-base sm:text-lg font-bold text-gray-900">{title}</h2>
      <div className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
}
