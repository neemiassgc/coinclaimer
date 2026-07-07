"use client";
/*
 * Documentation:
 * Button — https://app.subframe.com/69a6eea5bd3f/library?component=Button_3b777358-b86b-40af-9327-891efc6826fe
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../../utils";

export interface ButtonRootProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  size?: "large" | "medium" | "small";
  children?: React.ReactNode;
  icon?: SubframeCore.IconName;
  iconRight?: SubframeCore.IconName;
  loading?: boolean;
  variant?:
    | "brand-primary"
    | "brand-secondary"
    | "brand-tertiary"
    | "neutral-primary"
    | "neutral-secondary"
    | "neutral-tertiary"
    | "destructive-primary"
    | "destructive-secondary"
    | "destructive-tertiary"
    | "inverse"
    | "sucess";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const ButtonRoot = React.forwardRef<HTMLButtonElement, ButtonRootProps>(
  function ButtonRoot(
    {
      disabled = false,
      size = "medium",
      children,
      icon = null,
      iconRight = null,
      loading = false,
      variant = "brand-primary",
      className,
      type = "button",
      ...otherProps
    }: ButtonRootProps,
    ref
  ) {
    return (
      <button
        className={SubframeUtils.twClassNames(
          "group/3b777358 flex h-8 cursor-pointer items-center justify-center gap-2 rounded-md border-none bg-brand-primary px-3 text-left hover:bg-brand-500 active:bg-brand-600 disabled:cursor-default disabled:bg-neutral-200 hover:disabled:cursor-default hover:disabled:bg-neutral-200 active:disabled:cursor-default active:disabled:bg-neutral-200",
          {
            "bg-success-600 hover:bg-success-500 active:bg-success-600":
              variant === "sucess",
            "bg-transparent hover:bg-[#ffffff] active:bg-[#ffffff]":
              variant === "inverse",
            "bg-transparent hover:bg-error-50 active:bg-error-100":
              variant === "destructive-tertiary",
            "bg-error-50 hover:bg-error-100 active:bg-error-50":
              variant === "destructive-secondary",
            "bg-error-600 hover:bg-error-500 active:bg-error-600":
              variant === "destructive-primary",
            "bg-transparent hover:bg-neutral-100 active:bg-neutral-50":
              variant === "neutral-tertiary",
            "border border-solid border-neutral-border bg-white hover:bg-neutral-100 active:bg-white":
              variant === "neutral-secondary",
            "bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-100":
              variant === "neutral-primary",
            "bg-transparent hover:bg-brand-50 active:bg-brand-100":
              variant === "brand-tertiary",
            "bg-brand-50 hover:bg-brand-100 active:bg-brand-50":
              variant === "brand-secondary",
            "h-6 gap-1 px-2": size === "small",
            "h-10 px-4": size === "large",
          },
          className
        )}
        ref={ref}
        type={type}
        disabled={disabled}
        {...otherProps}
      >
        <SubframeCore.Icon
          className={SubframeUtils.twClassNames(
            "text-body font-body text-white group-disabled/3b777358:text-neutral-400",
            {
              "text-error-700":
                variant === "destructive-tertiary" ||
                variant === "destructive-secondary",
              "text-neutral-700":
                variant === "neutral-tertiary" ||
                variant === "neutral-secondary" ||
                variant === "neutral-primary",
              "text-brand-700":
                variant === "brand-tertiary" || variant === "brand-secondary",
              hidden: loading,
              "text-heading-3 font-heading-3": size === "large",
            }
          )}
          name={icon}
        />
        <div
          className={SubframeUtils.twClassNames(
            "hidden h-4 w-4 flex-none items-center justify-center gap-2",
            { flex: loading, "h-3 w-3": size === "small" }
          )}
        >
          <SubframeCore.Loader
            className={SubframeUtils.twClassNames(
              "text-caption font-caption text-white group-disabled/3b777358:text-neutral-400",
              { "font-['Inter'] leading-[20px]": loading }
            )}
          />
        </div>
        {children ? (
          <span
            className={SubframeUtils.twClassNames(
              "whitespace-nowrap text-body-bold font-body-bold text-white group-disabled/3b777358:text-neutral-400",
              {
                "text-error-700":
                  variant === "destructive-tertiary" ||
                  variant === "destructive-secondary",
                "text-neutral-700":
                  variant === "neutral-tertiary" ||
                  variant === "neutral-secondary" ||
                  variant === "neutral-primary",
                "text-brand-700":
                  variant === "brand-tertiary" || variant === "brand-secondary",
                hidden: loading,
                "text-caption-bold font-caption-bold": size === "small",
              }
            )}
          >
            {children}
          </span>
        ) : null}
        <SubframeCore.Icon
          className={SubframeUtils.twClassNames(
            "text-body font-body text-white group-disabled/3b777358:text-neutral-400",
            {
              "group-hover/3b777358:text-error-700":
                variant === "destructive-tertiary",
              "text-error-700": variant === "destructive-secondary",
              "text-neutral-700":
                variant === "neutral-tertiary" ||
                variant === "neutral-secondary" ||
                variant === "neutral-primary",
              "text-brand-700":
                variant === "brand-tertiary" || variant === "brand-secondary",
              "text-heading-3 font-heading-3": size === "large",
            }
          )}
          name={iconRight}
        />
      </button>
    );
  }
);

export const Button = ButtonRoot;
