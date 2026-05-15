"use client";

import React from "react";

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} className="font-semibold text-zinc-900">{part.slice(2, -2)}</strong>
      : part
  );
}

export default function CvRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (key: number) => {
    if (listItems.length === 0) return;
    elements.push(
      <ul key={`ul-${key}`} className="mt-2 space-y-1">
        {listItems.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-zinc-600 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    );
    listItems = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("- ") || line.startsWith("• ")) {
      listItems.push(line.slice(2).trim());
      continue;
    }

    flushList(i);

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-2xl font-bold text-zinc-900 tracking-tight">{line.slice(2)}</h1>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <div key={i} className="mt-7 mb-3">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400 pb-1.5 border-b border-zinc-200">
            {line.slice(3)}
          </h2>
        </div>
      );
    } else if (line === "---" || line.trim() === "") {
      elements.push(<div key={i} className="h-1" />);
    } else if (line.includes(" | ") && i < 4) {
      // Contact line right after the name
      elements.push(
        <p key={i} className="mt-1 text-sm text-zinc-500">
          {line.split(" | ").map((part, j, arr) => (
            <React.Fragment key={j}>
              {part.trim()}
              {j < arr.length - 1 && <span className="mx-2 text-zinc-300">·</span>}
            </React.Fragment>
          ))}
        </p>
      );
    } else {
      elements.push(
        <p key={i} className="text-sm text-zinc-700 leading-relaxed mt-1">
          {renderInline(line)}
        </p>
      );
    }
  }

  flushList(lines.length);

  return <div className="select-text">{elements}</div>;
}
