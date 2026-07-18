"use client"

import { useState } from "react";
import { Button } from "./Button";
import { TextField } from "./TextField";

export default function ClaimPanel(props: { amountOfCoins: string}) {
  const [coins, setCoins] = useState("0,00");

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
          helpText=""
          icon="FeatherCoins"
        >
          <TextField.Input
            type="text"
            placeholder={coins}
            value={coins}
            onChange={event => { setCoins(inputFormat(event.target.value))}}
          />
        </TextField>
        <span className="text-caption font-caption text-subtext-color">
          Enter up to {props.amountOfCoins.replace(".", ",")} coins
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