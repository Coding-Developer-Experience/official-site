"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal } from "lucide-react";
import GlossaryTerm from "./materi-glossary";

interface ContentRendererProps {
  content: string;
}

const GLOSSARY_DICTIONARY: Record<string, { term: string; definition: string; category?: string }> = {
  developer: {
    term: "Developer (Software Engineer)",
    definition: "Pengembang perangkat lunak yang bertugas merancang arsitektur kode, membuat fungsionalitas aplikasi, dan memperbaiki bug.",
    category: "Peran Tim",
  },
  "it operations": {
    term: "IT Operations (SysAdmin / Infra)",
    definition: "Tim operasional yang bertanggung jawab atas ketersediaan server, keamanan jaringan, performa infrastruktur, dan kestabilan sistem.",
    category: "Peran Tim",
  },
  production: {
    term: "Production Environment",
    definition: "Lingkungan server live sesungguhnya tempat aplikasi melayani pengguna akhir dan memproses data riil.",
    category: "Infrastruktur",
  },
  fitur: {
    term: "Fitur Aplikasi (Feature)",
    definition: "Kemampuan atau fungsionalitas baru yang disediakan pada aplikasi untuk kebutuhan pengguna atau bisnis.",
    category: "Pengembangan",
  },
  mlops: {
    term: "MLOps (Machine Learning Operations)",
    definition: "Praktik kolaboratif yang menggabungkan Machine Learning, DevOps, dan Data Engineering untuk mengotomatiskan lifecycle sistem ML secara andal.",
    category: "Metodologi",
  },
  docker: {
    term: "Docker / Containerization",
    definition: "Platform untuk mengemas aplikasi dan seluruh dependensinya ke dalam container yang terisolasi sehingga konsisten di semua lingkungan.",
    category: "Tools & Infra",
  },
  "ci/cd": {
    term: "CI/CD (Continuous Integration / Deployment)",
    definition: "Praktik otomatisasi pengujian kode dan deployment secara berkelanjutan tanpa intervensi manual yang rentan error.",
    category: "DevOps",
  },
};

// Inline parser for bold, italics, code, and glossary terms
function formatInlineText(text: string): React.ReactNode[] {
  // Regex splitting by bold (**...**), italic (*...*), code (`...`)
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const inner = part.slice(2, -2);
      const lower = inner.toLowerCase();
      if (GLOSSARY_DICTIONARY[lower]) {
        const item = GLOSSARY_DICTIONARY[lower];
        return (
          <GlossaryTerm
            key={index}
            term={item.term}
            definition={item.definition}
            category={item.category}
          >
            {inner}
          </GlossaryTerm>
        );
      }
      return <strong key={index} className="font-bold text-neutral-900">{inner}</strong>;
    }

    if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
      const inner = part.slice(1, -1);
      return <em key={index} className="italic text-neutral-800">{inner}</em>;
    }

    if (part.startsWith("`") && part.endsWith("`")) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={index}
          className="rounded-md border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 text-xs font-mono text-blue-700"
        >
          {inner}
        </code>
      );
    }

    // Check individual words for glossary matches
    const words = part.split(/(\b[a-zA-Z0-9/_-]+\b)/g);
    return (
      <React.Fragment key={index}>
        {words.map((w, wIdx) => {
          const lowerWord = w.toLowerCase();
          if (GLOSSARY_DICTIONARY[lowerWord]) {
            const item = GLOSSARY_DICTIONARY[lowerWord];
            return (
              <GlossaryTerm
                key={wIdx}
                term={item.term}
                definition={item.definition}
                category={item.category}
              >
                {w}
              </GlossaryTerm>
            );
          }
          return w;
        })}
      </React.Fragment>
    );
  });
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="my-4 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-900 text-neutral-100">
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-4 py-2 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-blue-400" />
          <span className="font-mono text-[11px] uppercase tracking-wide">
            {language || "code"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-2 py-0.5 text-[11px] hover:bg-neutral-800 hover:text-white transition-colors"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          <span>{copied ? "Disalin" : "Salin"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-neutral-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function MateriContentRenderer({ content }: ContentRendererProps) {
  const lines = content.trim().split("\n");
  const renderedElements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = "";
  let listBuffer: { type: "ol" | "ul"; items: string[] } | null = null;

  const flushList = (key: number) => {
    if (!listBuffer) return;
    if (listBuffer.type === "ol") {
      renderedElements.push(
        <ol key={`list-${key}`} className="my-3 ml-6 list-decimal space-y-1.5 text-sm sm:text-base leading-relaxed text-neutral-700">
          {listBuffer.items.map((it, idx) => (
            <li key={idx} className="pl-1">{formatInlineText(it)}</li>
          ))}
        </ol>
      );
    } else {
      renderedElements.push(
        <ul key={`list-${key}`} className="my-3 ml-6 list-disc space-y-1.5 text-sm sm:text-base leading-relaxed text-neutral-700">
          {listBuffer.items.map((it, idx) => (
            <li key={idx} className="pl-1">{formatInlineText(it)}</li>
          ))}
        </ul>
      );
    }
    listBuffer = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Code block toggle
    if (trimmed.startsWith("```")) {
      if (inCodeBlock) {
        renderedElements.push(
          <CodeBlock
            key={`code-${i}`}
            code={codeBuffer.join("\n")}
            language={codeLanguage}
          />
        );
        codeBuffer = [];
        codeLanguage = "";
        inCodeBlock = false;
      } else {
        flushList(i);
        inCodeBlock = true;
        codeLanguage = trimmed.slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine);
      continue;
    }

    // Numbered List (e.g. 1. Item)
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (!listBuffer || listBuffer.type !== "ol") {
        flushList(i);
        listBuffer = { type: "ol", items: [] };
      }
      listBuffer.items.push(olMatch[2]);
      continue;
    }

    // Bullet List (e.g. - Item or * Item)
    const ulMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (ulMatch) {
      if (!listBuffer || listBuffer.type !== "ul") {
        flushList(i);
        listBuffer = { type: "ul", items: [] };
      }
      listBuffer.items.push(ulMatch[1]);
      continue;
    }

    // If we were in a list and hit normal line, flush
    flushList(i);

    if (!trimmed) {
      continue;
    }

    // Headings
    if (trimmed.startsWith("#### ")) {
      renderedElements.push(
        <h4 key={`h4-${i}`} className="mt-6 mb-2 text-base font-bold text-neutral-900">
          {formatInlineText(trimmed.slice(5))}
        </h4>
      );
      continue;
    }

    if (trimmed.startsWith("### ")) {
      renderedElements.push(
        <h3 key={`h3-${i}`} className="mt-8 mb-3 text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2">
          {formatInlineText(trimmed.slice(4))}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith("## ")) {
      renderedElements.push(
        <h2 key={`h2-${i}`} className="mt-10 mb-4 text-xl font-extrabold tracking-tight text-neutral-900 border-b border-neutral-200 pb-2.5">
          {formatInlineText(trimmed.slice(3))}
        </h2>
      );
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      renderedElements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-4 rounded-xl border-l-4 border-blue-500 bg-blue-50/50 p-4 text-sm sm:text-base italic text-neutral-700"
        >
          {formatInlineText(trimmed.slice(2))}
        </blockquote>
      );
      continue;
    }

    // Standard Paragraph
    renderedElements.push(
      <p key={`p-${i}`} className="my-3 text-sm sm:text-base leading-relaxed text-neutral-700">
        {formatInlineText(trimmed)}
      </p>
    );
  }

  flushList(lines.length);

  return <div className="space-y-1">{renderedElements}</div>;
}
