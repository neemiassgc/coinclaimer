"use client";

import React from "react";
import { Badge } from "@/ui/components/Badge";
import { Button } from "@/ui/components/Button";
import { IconWithBackground } from "@/ui/components/IconWithBackground";
import { TextField } from "@/ui/components/TextField";
import * as SubframeCore from "@subframe/core";

function BalanceCardClaimButton() {
  return (
    <div className="container max-w-none flex h-full w-full flex-col items-center gap-8 bg-neutral-50 py-12 mobile:gap-6 mobile:py-6">
      <div className="flex w-full max-w-[448px] flex-col items-center gap-8">
        <div className="flex w-full flex-col items-center gap-8 rounded-md border border-solid border-neutral-border bg-default-background px-8 py-10 shadow-md mobile:px-6 mobile:py-8">
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex h-20 w-20 flex-none items-center justify-center gap-2 rounded-full bg-brand-100">
              <SubframeCore.Icon
                className="text-[40px] font-[400] leading-[40px] text-brand-700"
                name="FeatherCoins"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-end gap-2">
                <span className="text-heading-1 font-heading-1 text-default-font mobile:text-heading-2 mobile:font-heading-2">
                  1,250
                </span>
                <span className="text-heading-3 font-heading-3 text-subtext-color pb-1">
                  coins
                </span>
              </div>
              <span className="text-body font-body text-subtext-color text-center">
                Available to claim in your wallet
              </span>
            </div>
            <Badge variant="success" icon="FeatherTrendingUp">
              +85 this week
            </Badge>
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <span className="text-body-bold font-body-bold text-default-font">
              Amount to claim
            </span>
            <TextField
              className="h-auto w-full flex-none"
              variant="outline"
              label=""
              helpText=""
              icon="FeatherCoins"
            >
              <TextField.Input
                type="number"
                placeholder="Enter number of coins"
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField>
            <span className="text-caption font-caption text-subtext-color">
              Enter up to 1,250 coins
            </span>
          </div>
          <Button
            className="h-12 w-full flex-none"
            size="large"
            icon="FeatherGift"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Claim coins
          </Button>
        </div>
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
            <div className="flex w-full items-center gap-4">
              <IconWithBackground
                variant="brand"
                size="medium"
                icon="FeatherZap"
              />
              <div className="flex grow shrink-0 basis-0 flex-col items-start">
                <span className="text-body-bold font-body-bold text-default-font">
                  Streak bonus
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  Jul 6, 2026 · 8:47 AM
                </span>
              </div>
              <span className="text-body-bold font-body-bold text-success-700">
                +120
              </span>
            </div>
            <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
            <div className="flex w-full items-center gap-4">
              <IconWithBackground
                variant="warning"
                size="medium"
                icon="FeatherStar"
              />
              <div className="flex grow shrink-0 basis-0 flex-col items-start">
                <span className="text-body-bold font-body-bold text-default-font">
                  Achievement unlocked
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  Jul 4, 2026 · 6:15 PM
                </span>
              </div>
              <span className="text-body-bold font-body-bold text-success-700">
                +300
              </span>
            </div>
            <div className="flex h-px w-full flex-none flex-col items-center gap-2 bg-neutral-200" />
            <div className="flex w-full items-center gap-4">
              <IconWithBackground
                variant="neutral"
                size="medium"
                icon="FeatherUsers"
              />
              <div className="flex grow shrink-0 basis-0 flex-col items-start">
                <span className="text-body-bold font-body-bold text-default-font">
                  Referral reward
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  Jul 1, 2026 · 11:30 AM
                </span>
              </div>
              <span className="text-body-bold font-body-bold text-success-700">
                +200
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceCardClaimButton;