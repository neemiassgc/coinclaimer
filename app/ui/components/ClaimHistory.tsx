import { ClaimTracking } from "@/app/mis";
import { IconWithBackground } from "./IconWithBackground";
import { Button } from "./Button";
import { useState } from "react";

export default function ClaimHistory(props: { claimTracking: ClaimTracking[] }) {
  const [more, setMore] = useState(false);
  
  const claimCards = [];

  for (let i = props.claimTracking.length - 1, key = 0; i >= 0; i--, key++) {
    claimCards.push(<ClaimCard claimTracking={props.claimTracking[i]} key={key}/>)
    if (!more && key === 1) break;
  }

  return (
    <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
      <span className="text-heading-3 font-heading-3 text-default-font">
        Recent claims
      </span>
      {claimCards}
      <Button
        className="h-8 w-full flex-none"
        variant="brand-secondary"
        onClick={() => setMore(!more)}
      >
        {
          more ? "View less" : "View more"
        }
      </Button>
    </div>
  )
}

function ClaimCard({claimTracking: { value, instant }}: { claimTracking: ClaimTracking }) {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-center gap-4">
        <IconWithBackground
          variant={value.includes("-") ? "error" : "success"}
          size="medium"
          icon="FeatherCreditCard"
        />
        <div className="flex grow shrink-0 basis-0 flex-col items-start">
          <span className="text-body-bold font-body-bold text-default-font">
            {value.includes("-") ? "Debit" : "Credit"}
          </span>
          <span className="text-caption font-caption text-subtext-color">
            {formatDate(Temporal.Instant.from(instant))}
          </span>
        </div>
        <span className={`text-body-bold font-body-bold text-${value.includes("-") ? "error" : "success"}-700`}>
          {value.includes("-") ? value : "+"+value}
        </span>
      </div>
      <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
    </div>
  )
}

function formatDate(instant: Temporal.Instant): string {
  return instant.toLocaleString("en-US", {
    dateStyle: "long", timeStyle: "short",
    timeZone: "America/Sao_Paulo",
    calendar: "iso8601"
  });
}