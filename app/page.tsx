"use client";

import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMsg("");
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur");
      setStatus("ok");
      setMsg("Enregistré. Merci˖⋆˚࿔࣪⊹");
      setName("");
      setContact("");
    } catch (err: any) {
      setStatus("err");
      setMsg(err.message);
    }
  }

  return (
    <main className="min-h-screen px-6 md:px-10 py-14 md:py-20 max-w-3xl mx-auto">
      {/* En-tête */}
      <header className="border-b hairline pb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
          Carte de visite numérique
        </p>
        <h1 className="mt-6 text-3xl md:text-5xl font-medium leading-tight">
          Fabiola Sainvry
        </h1>
        <p className="mt-3 text-sm md:text-base text-[color:var(--text-muted)] max-w-xl">
          Étudiante AEC en Developement logiciel, Collège de Maisonneuve. Montréal.
        </p>
      </header>

      {/* 3 boutons 3D */}
      <section className="mt-14 md:mt-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--text-muted)]">
            01 / Liens
          </span>
          <span className="flex-1 h-px bg-[color:var(--line)]" />
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8">
          <LinkCard
            href="https://github.com/favry0001"
            label="GitHub"
            src="/github.png"
            alt="Icône GitHub en 3D"
          />
          <LinkCard
            href="https://www.linkedin.com/in/fabiola-sainvry-34759a2a3/"
            label="LinkedIn"
            src="/linkedin.png"
            alt="Icône LinkedIn en 3D"
          />
          <LinkCard
            href="/mon-cv.pdf"
            label="CV / PDF"
            src="/cv.png"
            alt="Icône CV en 3D"
            download
          />
        </div>
      </section>

      {/* Formulaire */}
      <section className="mt-20 md:mt-28">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--text-muted)]">
            02 / Restons en contact
          </span>
          <span className="flex-1 h-px bg-[color:var(--line)]" />
        </div>

        <form
          onSubmit={onSubmit}
          className="border hairline-strong p-6 md:p-10 bg-[color:var(--bg-soft)]"
        >
          <p className="text-sm text-[color:var(--text-muted)] mb-8 leading-relaxed">
            Laissez votre nom et un moyen de vous recontacter. Vos coordonnées
            sont stockées de façon privée pour un suivi personnalisé.
          </p>

          <Field
            label="Nom / Entreprise"
            value={name}
            onChange={setName}
            placeholder="Ex. Marie Tremblay — Hydro-Québec"
            maxLength={120}
          />

          <Field
            label="Courriel ou profil LinkedIn"
            value={contact}
            onChange={setContact}
            placeholder="marie@exemple.com  ·  linkedin.com/in/…"
            maxLength={200}
            className="mt-6"
          />

          <div className="mt-10 flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4">
            <p
              className={`text-xs ${
                status === "ok"
                  ? "text-emerald-300/80"
                  : status === "err"
                  ? "text-red-300/80"
                  : "text-[color:var(--text-muted)]"
              }`}
            >
              {msg || "Je vous répondrai dans les plus brefs délais."}
            </p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="border hairline-strong px-6 py-3 text-xs uppercase tracking-[0.25em] hover:bg-white/5 transition-colors disabled:opacity-40"
            >
              {status === "sending" ? "Envoi…" : "Envoyer →"}
            </button>
          </div>
        </form>
      </section>

      {/* Pied */}
      <footer className="mt-24 pt-8 border-t hairline text-xs text-[color:var(--text-muted)] flex justify-between">
        <span>FS .☘︎˖۫ ׅ ⋆° — Montréal, QC</span>
        <span>v1.0 · build {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}

function LinkCard({
  href,
  label,
  src,
  alt,
  download,
}: {
  href: string;
  label: string;
  src: string;
  alt: string;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      target={download ? "_self" : "_blank"}
      rel="noopener noreferrer"
      download={download}
      className="group border hairline p-4 md:p-6 flex flex-col items-center gap-4 hover:border-[color:var(--line-strong)] transition-colors"
    >
      <div className="relative w-16 h-16 md:w-24 md:h-24">
        <Image src={src} alt={alt} fill className="object-contain" priority />
      </div>
      <span className="text-[11px] md:text-xs uppercase tracking-[0.3em] text-[color:var(--text-muted)] group-hover:text-[color:var(--text)] transition-colors">
        {label}
      </span>
    </a>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[10px] uppercase tracking-[0.3em] text-[color:var(--text-muted)] mb-3">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        required
        className="w-full bg-transparent border-b hairline-strong pb-2 outline-none focus:border-[color:var(--accent)] transition-colors placeholder:text-[color:var(--text-muted)]/50"
      />
    </label>
  );
}