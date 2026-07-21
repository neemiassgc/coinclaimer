"use client"

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { TextField } from "./TextField";

export default function ClaimPanel(props: { amountOfCoins: string}) {
  const [coins, setCoins] = useState("0,00");
  const [loading, setLoading] = useState(false);
  const [helpText, setHelpText] = useState("");
  const [feedbackState, setFeedbackState] = useState<"SUCCESS" | "FAILED" | "NEUTRAL">("NEUTRAL")

  useEffect(() => {
    localStorage.setItem("currentCoins", props.amountOfCoins)
  }, [props.amountOfCoins])

  const subtractCoins = (gp: string) => () => {
    setLoading(true);

    const goldToSubtract = parseFloat(replaceCommaPoint(gp)) * 100;
    const currentGold = parseFloat(replaceCommaPoint(localStorage.getItem("currentCoins") as string)) * 100;
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
    .then(() => {
      setFeedbackState("SUCCESS")
    })
    .catch(() => setFeedbackState("FAILED"))
    .finally(() => setLoading(false));
  }

  return (
    <>
      <div className="flex w-full flex-col items-start gap-2">
        <span className="text-body-bold font-body-bold text-default-font">
          Amount to claim
        </span>
        <TextField
          disabled={loading || feedbackState !== "NEUTRAL"}
          className="h-auto w-full flex-none"
          variant="outline"
          label=""
          error={!!helpText}
          helpText={helpText}
          icon="FeatherCoins"
        >
          <TextField.Input
            disabled={loading || feedbackState !== "NEUTRAL"}
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
          Enter up to {replaceCommaPoint(props.amountOfCoins)} coins
        </span>
      </div>
      <Button
        variant={
          feedbackState === "FAILED" ? "destructive-primary"
            : feedbackState === "SUCCESS" ? "sucess"
            : "brand-primary"
        }
        loading={loading}
        className="h-12 w-full flex-none"
        size="large"
        icon={
          feedbackState === "FAILED" ? "FeatherAlertOctagon"
            : feedbackState === "SUCCESS" ? "FeatherCheckCircle"
            : "FeatherGift"
        }
        onClick={feedbackState !== "NEUTRAL" ? undefined : subtractCoins(coins)}
      >
      {
        feedbackState === "FAILED" ? "Failed"
          : feedbackState === "SUCCESS" ? "Sent"
          : "Claim Coins"
      }
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

function replaceCommaPoint(value: string): string {
  if (value.includes(",")) return value.replace(",", ".");
  return value.replace(".", ",");
}