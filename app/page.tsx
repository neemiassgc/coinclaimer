"use client"

import * as SubframeCore from "@subframe/core";
import ClaimPanel from "./ui/components/ClaimPanel";
import ClaimHistory from "./ui/components/ClaimHistory";
import { useEffect, useState } from "react";
import { ClaimTracking, replaceCommaPoint } from "./misc";
import { Loader } from "./ui/components/Loader";

function BalanceCardClaimButton() {
  const [amountOfCoins, setAmountOfCoins] = useState<undefined | string>()
  const [claimHistory, setClaimHistory] = useState<ClaimTracking[]>([]);

  const initLoad = () => {
    fetch("/action/coins/get")
      .then(res => res.text())
      .then(coins => {
        const currentCoinsInStorage = localStorage.getItem("currentCoins") ?? "0,00";
        const currentCoinsInNumber = parseFloat(replaceCommaPoint(currentCoinsInStorage)) * 100;
        const updatedCoins = parseFloat(coins) * 100;

        const claimHistoryInStorage = localStorage.getItem("claimHistory") ?? "[]"
        const claimHistory: ClaimTracking[] = JSON.parse(claimHistoryInStorage);
        if (currentCoinsInNumber !== updatedCoins) {
          claimHistory.push({
            value: replaceCommaPoint(((updatedCoins - currentCoinsInNumber) / 100).toFixed(2)),
            instant: Temporal.Now.instant().toString()
          })
        }

        localStorage.setItem("claimHistory", JSON.stringify(claimHistory));
        localStorage.setItem("currentCoins", replaceCommaPoint(coins))

        setClaimHistory(claimHistory);
        setAmountOfCoins(coins);
      })
  }

  useEffect(initLoad, []);

  return (
    <div className="container max-w-none flex h-full w-full flex-col items-center gap-8 bg-neutral-50 py-12 mobile:gap-6 mobile:py-6">
      <div className="flex w-full max-w-[448px] flex-col items-center gap-8">
        <div className="flex w-full flex-col items-center gap-8 rounded-md border border-solid border-neutral-border bg-default-background px-8 py-10 shadow-md mobile:px-6 mobile:py-8">
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex h-20 w-20 flex-none items-center justify-center gap-2 rounded-full bg-brand-100">
              <SubframeCore.Icon
                className="text-[40px] font-normal leading-10 text-brand-700"
                name="FeatherCoins"
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-end gap-2">
                <span className="text-heading-1 font-heading-1 text-default-font mobile:text-heading-2 mobile:font-heading-2">
                  {
                    amountOfCoins ? replaceCommaPoint(amountOfCoins) : <Loader size="large"/>
                  }
                </span>
                <span className="text-heading-3 font-heading-3 text-subtext-color pb-1">
                  coins
                </span>
              </div>
              <span className="text-body font-body text-subtext-color text-center">
                Available to claim in your wallet
              </span>
            </div>
          </div>
          <ClaimPanel reload={initLoad} coins={amountOfCoins}/>
        </div>
        <ClaimHistory claimTracking={claimHistory}/>
      </div>
    </div>
  );
}

export default BalanceCardClaimButton;