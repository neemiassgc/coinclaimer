"use client"

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { TextField } from "./TextField";

export default function ClaimPanel(props: { amountOfCoins: string}) {
  const [coins, setCoins] = useState("0,00");
  const [loading, setLoading] = useState(false);
  const [helpText, setHelpText] = useState("");

  useEffect(() => {
    localStorage.setItem("currentCoins", props.amountOfCoins)
  }, [props.amountOfCoins])

  const subtractCoins = (gp: string) => {
    setLoading(true);

    const goldToSubtract = parseFloat(replaceComma(gp)) * 100;
    const currentGold = parseFloat(replaceComma(localStorage.getItem("currentCoins") as string)) * 100;
    if (goldToSubtract > currentGold) {
      setHelpText("Amount not allowed");
      setLoading(false);
      return;
    }

    const newGold = (currentGold - goldToSubtract) / 100;

    fetch("/action/setCoins", {
      method: "POST",
      body: JSON.stringify({ gp: newGold+"" })
    })
    .finally(() => setLoading(false));
  }

  return (
    <>
      <div className="flex w-full flex-col items-start gap-2">
        <span className="text-body-bold font-body-bold text-default-font">
          Amount to claim
        </span>
        <TextField
          className="h-auto w-full flex-none"
          variant="outline"
          label=""
          error={!!helpText}
          helpText={helpText}
          icon="FeatherCoins"
        >
          <TextField.Input
            type="text"
            placeholder={coins}
            value={coins}
            onChange={event => {
              setCoins(inputFormat(event.target.value))
              setHelpText("");
            }}
          />
        </TextField>
        <span className="text-caption font-caption text-subtext-color">
          Enter up to {props.amountOfCoins.replace(".", ",")} coins
        </span>
      </div>
      <Button
        loading={loading}
        className="h-12 w-full flex-none"
        size="large"
        icon="FeatherGift"
        onClick={() => subtractCoins(coins)}
      >
        Claim coins
      </Button>
    </>
  )
}

function inputFormat(value: string): string {
  if (/[^\d,]/.test(value[value.length -1]))
    return value.substring(0, value.length - 1)

  let thatValue = value.replace(",", "");
  if (value[0] === "0") thatValue = thatValue.substring(1);
  const numChars = thatValue.split("");
  numChars.splice(-2, 0, ",");
  return numChars.join("").padStart(4, "0");
}

function replaceComma(value: string): string {
  return value.replace(",", ".");
}