"use client";

import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Erreur");
      setStatus("ok");
      setMsg("Enregistré. Merci.");
      setName("");
      setContact("");
    } catch (err: any) {
      setStatus("err");
      setMsg(err.message);
    }
  }

  return (
    <main className="container">
      <header className="header">
        <h1>Fabiola Sainvry</h1>
        <p>
          Étudiante en développement logiciel  au Collège de Maisonneuve. Bientôt diplômée, je cherche un stage où mettre à profit mes compétences en développement web, bases de données et automatisation.</p>
        <p> Polyglotte FR · EN · ES · HT · PT </p>

 
          <br />
          ⁀જ➣   Montréal · Toronto
        
      </header>

      <nav className="links">
        <a
          className="link"
          href="https://github.com/favry0001"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/github.png" alt="GitHub" />
          <span>GitHub</span>
        </a>

        <a
          className="link"
          href="https://www.linkedin.com/in/fabiola-sainvry-34759a2a3/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/linkedin.png" alt="LinkedIn" />
          <span>Let's connect</span>
        </a>

        <a className="link" href="/mon-cv.pdf" download>
          <img src="/cv.png" alt="CV" />
          <span>CV</span>
        </a>
      </nav>

      <form className="form" onSubmit={onSubmit}>
        <h2>Restons en contact</h2>

        <div className="field">
          <label>Nom / Entreprise</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Marie smith — Deloitte "
            maxLength={120}
            required
          />
        </div>

        <div className="field">
          <label>Courriel ou LinkedIn</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="marie@exemple.com"
            maxLength={200}
            required
          />
        </div>

        <button type="submit" className="button" disabled={status === "sending"}>
          {status === "sending" ? "Envoi..." : "Envoyer"}
        </button>

        {msg && (
          <p className={`status ${status === "ok" ? "ok" : status === "err" ? "err" : ""}`}>
            {msg}
          </p>
        )}
          
        
      </form> 
      <footer className="footer">
        <span>© *.◊ 2026 ✦ Fabiola Sainvry</span>
        <a href="mailto:fsainvry@gmail.com">Email-me ✎· . · ➤</a>
      </footer>  
    </main>
  );
}