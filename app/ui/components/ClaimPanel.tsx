"use client"

import { Button } from "./Button";
import { TextField } from "./TextField";

export default function ClaimPanel(props: { amountOfCoins: string}) {
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
            type="number"
            placeholder="Enter number of coins"
            value=""
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
          />
        </TextField>
        <span className="text-caption font-caption text-subtext-color">
          Enter up to {props.amountOfCoins} coins
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