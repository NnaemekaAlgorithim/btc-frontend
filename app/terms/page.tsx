import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions — BTC",
  description: "Read the full terms and conditions for the BTC platform before creating your account.",
  openGraph: {
    title: "Terms & Conditions — BTC",
    description: "Read the full terms and conditions for the BTC platform before creating your account.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms & Conditions — BTC",
    description: "Read the full terms and conditions for the BTC platform before creating your account.",
  },
};

const sections = [
  {
    title: "1. Preamble and Platform Overview",
    body: `Welcome to BTC (Big Terms & Conditions), a decentralised incentive protocol operating on a proprietary off-chain ledger system. By accessing, registering on, or otherwise interacting with this platform, you ("User", "Participant", or "Node Holder") acknowledge that you have read, understood, and unconditionally agree to be bound by the entirety of these Terms and Conditions ("Agreement"). BTC operates as a peer-incentivised referral distribution network wherein tokenised units of account — referred to herein as "BTC Coins" — are algorithmically allocated in fractional denominations across verified wallet addresses upon the successful completion of designated on-platform activities. The platform utilises a lightweight consensus mechanism to validate referral chains and task completions, ensuring immutable attribution of coin issuance events to their originating participants.`,
  },
  {
    title: "2. Definitions",
    body: `For the purposes of this Agreement, the following definitions shall apply: "BTC Coin" refers to the native utility token of this platform, issued in micro-fractional denominations (0.00000000001 per qualifying event) and recorded on the platform's internal ledger. "Referral Chain" means a verifiable sequence of user registrations traceable to a single originating referral code. "Task Completion Event" refers to any verified instance of a User interacting with a designated platform task, including but not limited to link visits and media consumption activities. "Wallet Address" refers to the unique pseudonymous identifier assigned to each registered User account upon successful onboarding. "Smart Incentive Layer" refers to the backend distribution logic responsible for calculating and crediting coin balances following qualifying events. "KYC-Lite Verification" refers to the lightweight identity collection process consisting of email address and phone number submission, used solely for account uniqueness validation.`,
  },
  {
    title: "3. Token Economics and Issuance Policy",
    body: `BTC Coins are issued exclusively through two mechanisms: (a) Referral Issuance — a fixed emission of 0.00000000001 BTC Coin credited to the referring wallet address upon each successful downstream registration; and (b) Task-Based Issuance — a variable emission assigned per individual task as defined in the platform's active task registry. The total circulating supply of BTC Coins is unbounded and subject to continuous issuance as new participants join the network or complete qualifying activities. There is no mining, staking, or proof-of-work mechanism underpinning coin generation. All coin balances are maintained on a centralised off-chain ledger and are subject to the platform's sole discretion regarding ledger integrity, correction, or adjustment in cases of detected fraud, manipulation, or technical anomaly. BTC Coins are non-transferable between user accounts, non-exchangeable for fiat currency or any other digital asset, and carry no guaranteed redemption value of any kind.`,
  },
  {
    title: "4. User Eligibility and Registration Obligations",
    body: `To participate in the BTC platform, Users must: (i) provide a valid and unique email address not previously registered on the platform; (ii) provide a valid mobile phone number in internationally recognised E.164 format, including the applicable country dialling code; (iii) create a secure password of no fewer than eight (8) characters; and (iv) affirm acceptance of these Terms and Conditions by activating the consent toggle at the point of registration. Each individual natural person is permitted a maximum of one (1) registered account. The creation of multiple accounts by a single individual for the purpose of self-referral or artificial inflation of coin balances is strictly prohibited and will result in permanent suspension of all associated accounts and forfeiture of all accrued balances. Users are solely responsible for the accuracy of information provided during registration and for maintaining the confidentiality of their account credentials.`,
  },
  {
    title: "5. Referral Programme Terms",
    body: `Upon successful registration, each User is assigned a unique alphanumeric referral code and a corresponding referral URL. This URL, when shared with and used by a new User during their registration, constitutes a valid referral event. Upon completion of the referred User's registration — including affirmation of these Terms and Conditions — the referring User's wallet balance shall be credited with 0.00000000001 BTC Coin. The platform reserves the right to withhold referral credits in cases where automated systems detect coordinated artificial referral activity, the use of bots or scripted registration flows, or any behaviour indicative of gamification of the referral mechanism beyond the spirit of this Agreement. Referral credits are non-retroactive and cannot be claimed for registrations completed prior to the sharing of a referral link.`,
  },
  {
    title: "6. Task Participation and Reward Conditions",
    body: `The platform may, at its discretion, publish time-limited or permanent tasks within the task registry. These tasks may include visiting external URLs, consuming designated media content, or completing other defined interactions. Upon a User's initiation of a task — defined as opening the associated URL — and subsequent submission of a completion claim through the platform interface, the designated reward value for that task shall be credited to the User's wallet balance, subject to the condition that the task has not previously been completed by that User. Each task may be completed a maximum of one (1) time per unique account. The platform does not verify actual engagement with linked content beyond the completion claim submission and reserves the right to revoke task rewards retroactively if systemic abuse is detected.`,
  },
  {
    title: "7. Data Collection, Privacy, and Security",
    body: `By registering on this platform, Users consent to the collection and processing of the following personal data: email address, phone number, device type, approximate geographic region inferred from network metadata, referral chain associations, task interaction logs, and wallet balance history. This data is stored on secured cloud infrastructure and is not sold, licensed, or otherwise transferred to third parties for commercial purposes. Data may be used internally for platform analytics, fraud detection, and system performance optimisation. The platform employs industry-standard encryption for data at rest and in transit. Users retain the right to request deletion of their account and associated personal data at any time by contacting the platform administrators, subject to a processing period of up to thirty (30) calendar days.`,
  },
  {
    title: "8. Disclosure",
    body: `If you have read this document to this point, congratulations — you are among a very small percentage of people who actually read Terms and Conditions before agreeing to them. This is, in fact, the entire point. BTC (Big Terms & Conditions) is a social experiment designed and conducted in Nigeria, created to measure and document the proportion of users who engage with digital agreements before consenting to them. The "BTC Coins" referenced throughout this document have no monetary value, no market price, no exchange rate, and no utility beyond existing as numbers on this platform's internal ledger. They cannot be withdrawn, traded, sold, or redeemed in any form. All cryptographic terminology, tokenomics descriptions, and blockchain references contained within this Agreement are intentionally constructed to simulate the language of a legitimate digital asset platform. No actual blockchain, distributed ledger, or cryptographic protocol underlies this system. All personal data collected during this experiment — including email addresses, phone numbers, and usage data — is held securely, will never be sold or shared with any third party, and will be permanently and irreversibly deleted upon the conclusion of this experiment. Participation in this experiment is entirely voluntary. By proceeding, you confirm your awareness of its nature.`,
  },
  {
    title: "9. Acceptance of Terms",
    body: `By clicking "I agree to the Terms & Conditions" on the registration page and completing your account creation, you confirm that you are at least 18 years of age, that you have read this Agreement in its entirety, that you understand its contents including the disclosure in Section 8, and that you voluntarily and unconditionally agree to be bound by all provisions herein. These Terms constitute the entire agreement between you and the platform with respect to your participation and supersede all prior communications, representations, or agreements. The platform reserves the right to amend these Terms at any time, with continued use of the platform constituting acceptance of any revised version.`,
  },
];

export default function TermsPage() {
  return (
    <main className="flex flex-col min-h-screen pb-16" style={{ background: "#09090B" }}>

      {/* Header */}
      <div
        className="sticky top-0 z-10 flex items-center gap-3 px-5 py-4"
        style={{ background: "rgba(9,9,11,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(212,175,55,0.1)" }}
      >
        <Link href="/register" className="flex items-center gap-2" style={{ color: "#52525B" }}>
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-sm font-bold" style={{ color: "#F8F8F8" }}>Terms &amp; Conditions</h1>
      </div>

      <div className="px-5 pt-6">

        {/* Title block */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#A8860C" }}>
            BTC Platform Agreement
          </p>
          <h2 className="text-2xl font-black mb-2" style={{ color: "#F8F8F8" }}>
            Big Terms &amp; Conditions
          </h2>
          <p className="text-xs" style={{ color: "#52525B" }}>
            Last updated: {new Date().toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-7">
          {sections.map((s) => (
            <div key={s.title}>
              <h3
                className="text-sm font-bold mb-2"
                style={{ color: "#F8F8F8" }}
              >
                {s.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "#71717A" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 mb-4">
          <Link
            href="/register"
            className="flex items-center justify-center w-full rounded-2xl py-4 text-sm font-bold tracking-wider uppercase"
            style={{
              background: "linear-gradient(135deg, #A8860C 0%, #D4AF37 40%, #F5D76E 60%, #D4AF37 80%, #A8860C 100%)",
              color: "#09090B",
              boxShadow: "0 4px 24px rgba(212,175,55,0.25)",
            }}
          >
            Back to Register
          </Link>
        </div>
      </div>
    </main>
  );
}
