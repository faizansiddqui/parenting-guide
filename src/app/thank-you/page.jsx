import ThankYouClient from "./ThankYouClient";

export default function ThankYouPage() {
  return (
    <ThankYouClient
      communityLink={process.env.WHATSAPP_COMMUNITY_URL || ""}
      eventName={process.env.WEBINAR_EVENT_NAME || "LIVE Interactive Workshop"}
    />
  );
}
