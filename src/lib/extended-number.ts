export function extendedNumber(n: number): string {
  if (n < 0 || n > 100 || !Number.isInteger(n)) {
    throw new Error("Apenas números inteiros entre 0 e 100 são suportados.")
  }

  const unidades = [
    "nenhuma", "uma", "duas", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"
  ];

  const especiais = [
    "dez", "onze", "doze", "treze", "catorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"
  ];

  const dezenas = [
    "", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"
  ];

  if (n < 10) return unidades[n];
  if (n >= 10 && n < 20) return especiais[n - 10];
  if (n === 100) return "cem";

  const dezena = Math.floor(n / 10);
  const unidade = n % 10;

  return unidade === 0
    ? dezenas[dezena]
    : `${dezenas[dezena]} e ${unidades[unidade]}`;
}

export function extendedOrderNumber(n: number): string {
  if (n < 0 || n > 100 || !Number.isInteger(n)) {
    throw new Error("Apenas números inteiros entre 0 e 100 são suportados.");
  }

  const ordinaisUnidades = [
    "zero", "primeira", "segunda", "terceira", "quarta", "quinta", "sexta", "sétima", "oitava", "nona"
  ];

  const ordinaisEspeciais = [
    "décima", "décima primeiro", "décima segundo", "décima terceiro", "décima quarto",
    "décima quinto", "décima sexto", "décima sétimo", "décima oitavo", "décima nono"
  ];

  const ordinaisDezenas = [
    "", "", "vigésima", "trigésima", "quadragésima",
    "quinquagésima", "sexagésima", "septuagésima", "octogésima", "nonagésima"
  ];

  if (n < 10) return ordinaisUnidades[n];
  if (n >= 10 && n < 20) return ordinaisEspeciais[n - 10];
  if (n === 100) return "centésima";

  const dezena = Math.floor(n / 10);
  const unidade = n % 10;

  return unidade === 0
    ? ordinaisDezenas[dezena]
    : `${ordinaisDezenas[dezena]} ${ordinaisUnidades[unidade]}`;
}