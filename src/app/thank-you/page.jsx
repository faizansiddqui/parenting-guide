import ThankYouClient from "./ThankYouClient";

export default function ThankYouPage() {
  const communityLink =
    process.env.WHATSAPP_COMMUNITY_URL ||
    process.env.NEXT_PUBLIC_WHATSAPP_COMMUNITY_URL ||
    "";

  return (
    <ThankYouClient
      communityLink={communityLink}
      eventName={process.env.WEBINAR_EVENT_NAME || "LIVE Interactive Workshop"}
    />
  );
}
