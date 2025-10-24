"use client";

import Turnstile from "react-turnstile";

type Props = {
  onToken: (token: string) => void;
};

export default function TurnstileWidget({ onToken }: Props) {

  return (
    <div className="">
      <Turnstile
        sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onVerify={(t) => {
          onToken(t);
        }}
        onExpire={() => onToken("")}
        appearance="always"
        size="flexible"
      />
    </div>
  );
}
