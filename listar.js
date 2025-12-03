// listar.js
import fs from "fs";
import path from "path";

function listar(dir, nivel = 0) {
  const prefijo = " ".repeat(nivel * 2);
  const elementos = fs.readdirSync(dir);

  for (const elemento of elementos) {
    const ruta = path.join(dir, elemento);
    const info = fs.statSync(ruta);

    if (info.isDirectory()) {
      console.log(`${prefijo}📁 ${elemento}/`);
      listar(ruta, nivel + 1);
    } else {
      console.log(`${prefijo}📄 ${elemento}`);
    }
  }
}

console.log("=== ESTRUCTURA DE SRC ===");
listar("./src");
