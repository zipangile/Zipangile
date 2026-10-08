"use client";

import React from "react";

export type CampaignLine = {
  /** Plain white text for the line (may be empty when the line is only a box). */
  text: string;
  /** Accent word rendered in a white box, in the given brand hue. */
  accent?: string;
  accentColor?: string;
};

type CampaignHeadlineProps = {
  lines: CampaignLine[];
  as?: "h1" | "h2";
  align?: "center" | "left" | "responsive";
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Campaign headline treatment from the "THE POWER TO ..." series:
 * heavy condensed all-caps type (Anton), stacked tight, with an optional
 * white-box accent word in a bold brand hue.
 */
export default function CampaignHeadline({
  lines,
  as = "h2",
  align = "center",
  className = "",
  style,
}: CampaignHeadlineProps) {
  const Tag = as;
  const alignClass =
    align === "responsive"
      ? "text-center lg:text-left"
      : align === "left"
        ? "text-left"
        : "text-center";
  return (
    <Tag
      className={`font-campaign text-white ${alignClass} ${className}`}
      style={style}
    >
      {lines.map((line, i) => (
        <span key={i} className="block">
          {line.text}
          {line.accent && (
            <>
              {line.text ? " " : null}
              <span
                className="campaign-box"
                style={{ ["--box-color" as string]: line.accentColor ?? "#7C3AED" } as React.CSSProperties}
              >
                {line.accent}
              </span>
            </>
          )}
        </span>
      ))}
    </Tag>
  );
}
