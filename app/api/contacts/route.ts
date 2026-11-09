import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const contact = String(body?.contact ?? "").trim();

    if (!name || !contact) {
      return NextResponse.json(
        { error: "Nom et contact requis." },
        { status: 400 }
      );
    }
    if (name.length > 120 || contact.length > 200) {
      return NextResponse.json({ error: "Champ trop long." }, { status: 400 });
    }

    await prisma.contact.create({ data: { name, contact } });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}