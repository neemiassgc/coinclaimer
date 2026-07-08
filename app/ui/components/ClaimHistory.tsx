import { IconWithBackground } from "./IconWithBackground";

export default function ClaimHistory() {
  return (
    <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
      <span className="text-heading-3 font-heading-3 text-default-font">
        Recent claims
      </span>
      <div className="flex w-full flex-col items-start gap-4">
        <div className="flex w-full items-center gap-4">
          <IconWithBackground
            variant="success"
            size="medium"
            icon="FeatherGift"
          />
          <div className="flex grow shrink-0 basis-0 flex-col items-start">
            <span className="text-body-bold font-body-bold text-default-font">
              Daily reward
            </span>
            <span className="text-caption font-caption text-subtext-color">
              Jul 7, 2026 · 9:02 AM
            </span>
          </div>
          <span className="text-body-bold font-body-bold text-success-700">
            +50
          </span>
        </div>
        <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
      </div>
    </div>
  )
}