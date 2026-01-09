import { notFound } from "next/navigation";
import { getInvitationByTokenAction } from "@/lib/actions/invitations";
import { constructMetadata } from "@/lib/constructMetadata";
import { InviteAcceptForm } from "./invite-accept-form";

export const metadata = constructMetadata({
  title: "Accept Invitation | Proppi",
  description: "Join a workspace on Proppi",
  noIndex: true,
});

interface InvitePageProps {
  params: Promise<{ token: string }>;
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { token } = await params;

  const result = await getInvitationByTokenAction(token);

  if (!result.success) {
    notFound();
  }

  const { invitation, workspaceName, isExpired, isAccepted } = result.data;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <InviteAcceptForm
          email={invitation.email}
          isAccepted={isAccepted}
          isExpired={isExpired}
          token={token}
          workspaceName={workspaceName}
        />
      </div>
    </div>
  );
}
