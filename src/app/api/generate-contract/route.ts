import { NextResponse } from "next/server";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs from "fs";
import path from "path";

import { User } from "@/types/User";
import { WaterPlant } from "@/types/WaterPlant";
import { Quotation } from "@/types/Quotation";

export async function POST(req: Request) {
  try {
    const {
      user,
      waterPlant,
      quotation,
    }: {
      user: User;
      waterPlant: WaterPlant;
      quotation: Quotation;
    } = await req.json();

    const comprador = `${user.firstName} ${user.middleName ?? ""} ${user.firstLastName} ${user.secondLastName ?? ""}`.trim();
    const aval = `${quotation.avalFirstName} ${quotation.avalMiddleName ?? ""}${quotation.avalFirstLastName} ${quotation.avalSecondLastName}`.trim();
    const nombreFranquicia = waterPlant.plantType.name;
    const empresaFranquiciante = waterPlant.plantType.company.firstName;
    const cantidadNumeros = waterPlant.plantType.price;

    const fecha = new Date();
    const dia = fecha.getDate().toString();
    const mes = fecha.toLocaleString("es-MX", { month: "long" });
    const anio = fecha.getFullYear().toString();

    const templatePath = path.resolve(process.cwd(), "public/Contrato_Frquicia_Purificadora.docx");
    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // 👇 Aquí usamos variables CORTAS en la plantilla
    doc.setData({
      c: comprador,
      a: aval,
      nf: nombreFranquicia,
      cf: empresaFranquiciante,
      p: cantidadNumeros,
      d: dia,
      m: mes,
      y: anio,
    });

    doc.render();

    const buffer = doc.getZip().generate({ type: "nodebuffer" });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="ContratoSkeleton_${waterPlant.id}.docx"`,
      },
    });
  } catch (e) {
    console.error("❌ Error generando contrato:", e);
    return NextResponse.json({ error: "Error generando contrato" }, { status: 500 });
  }
}