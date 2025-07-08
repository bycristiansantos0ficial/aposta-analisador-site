import React, { useState } from "react";
import Mascote3D from "./components/Mascote3D";

export default function App() {
  const [tempo, setTempo] = useState("75");
  const [placarCasa, setPlacarCasa] = useState("3");
  const [placarFora, setPlacarFora] = useState("0");
  const [escanteiosCasa, setEscanteiosCasa] = useState("5");
  const [escanteiosFora, setEscanteiosFora] = useState("2");
  const [ataquesCasa, setAtaquesCasa] = useState("48");
  const [ataquesFora, setAtaquesFora] = useState("23");
  const [posseCasa, setPosseCasa] = useState("62");
  const [posseFora, setPosseFora] = useState("38");

  const calcularProbabilidades = () => {
    const tempoInt = parseInt(tempo);
    const golsDiferenca = parseInt(placarCasa) - parseInt(placarFora);
    const vantagemPrimeiroTempo = tempoInt <= 45 && golsDiferenca !== 0;
    const vitoriaFinalProvavel =
      golsDiferenca !== 0 &&
      tempoInt >= 70 &&
      (parseInt(posseCasa) > 55 || parseInt(posseFora) > 55);
    const totalEscanteios =
      parseInt(escanteiosCasa) + parseInt(escanteiosFora);
    const poucosEscanteiosProvavel =
      totalEscanteios <= 7 && tempoInt >= 70;
    const semMaisGolsProvavel =
      tempoInt >= 80 &&
      Math.abs(parseInt(ataquesCasa) - parseInt(ataquesFora)) < 10;

    let melhorMomento = "Espere";
    if (
      (tempoInt >= 35 &&
        tempoInt <= 44 &&
        vantagemPrimeiroTempo) ||
      (tempoInt >= 70 &&
        tempoInt <= 80 &&
        vitoriaFinalProvavel &&
        poucosEscanteiosProvavel)
    ) {
      melhorMomento = "Agora";
    } else if (tempoInt > 85) {
      melhorMomento = "Tarde demais";
    }

    const resultadoPrimeiroTempo = vantagemPrimeiroTempo
      ? "Pode apostar"
      : "Não aposte";
    const resultadoFinal = vitoriaFinalProvavel
      ? "Pode apostar"
      : "Não aposte";
    const resultadoEscanteios = poucosEscanteiosProvavel
      ? "Pode apostar"
      : "Não aposte";
    const resultadoSemGols = semMaisGolsProvavel
      ? "Pode apostar"
      : "Não aposte";

    return {
      vitoriaPrimeiroTempo: vantagemPrimeiroTempo
        ? "Alta chance"
        : "Risco alto",
      vitoriaFinal: vitoriaFinalProvavel
        ? "95% provável"
        : "Inseguro",
      escanteiosBaixos: poucosEscanteiosProvavel
        ? "95% provável"
        : "Risco alto",
      semMaisGols: semMaisGolsProvavel
        ? "Alta chance"
        : "Baixa chance",
      resultadoPrimeiroTempo,
      resultadoFinal,
      resultadoEscanteios,
      resultadoSemGols,
      melhorMomento,
    };
  };

  const prob = calcularProbabilidades();

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
      <Mascote3D />

      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-5xl w-full">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Analisador de Apostas
        </h1>

        <input
          className="border p-2 w-full mb-4 rounded-md"
          placeholder="Tempo (min)"
          value={tempo}
          onChange={(e) => setTempo(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              Time da Casa 🏠
            </h2>
            <input
              className="border p-2 w-full mb-2 rounded-md"
              placeholder="Placar Casa"
              value={placarCasa}
              onChange={(e) => setPlacarCasa(e.target.value)}
            />
            <input
              className="border p-2 w-full mb-2 rounded-md"
              placeholder="Escanteios Casa"
              value={escanteiosCasa}
              onChange={(e) => setEscanteiosCasa(e.target.value)}
            />
            <input
              className="border p-2 w-full mb-2 rounded-md"
              placeholder="Ataques Perigosos Casa"
              value={ataquesCasa}
              onChange={(e) => setAtaquesCasa(e.target.value)}
            />
            <input
              className="border p-2 w-full mb-2 rounded-md"
              placeholder="Posse Casa (%)"
              value={posseCasa}
              onChange={(e) => setPosseCasa(e.target.value)}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-red-700 mb-2">
              Time Visitante 🚩
            </h2>
            <input
              className="border p-2 w-full mb-2 rounded-md"
              placeholder="Placar Fora"
              value={placarFora}
              onChange={(e) => setPlacarFora(e.target.value)}
            />
            <input
              className="border p-2 w-full mb-2 rounded-md"
              placeholder="Escanteios Fora"
              value={escanteiosFora}
              onChange={(e) => setEscanteiosFora(e.target.value)}
            />
            <input
              className="border p-2 w-full mb-2 rounded-md"
              placeholder="Ataques Perigosos Fora"
              value={ataquesFora}
              onChange={(e) => setAtaquesFora(e.target.value)}
            />
            <input
              className="border p-2 w-full mb-2 rounded-md"
              placeholder="Posse Fora (%)"
              value={posseFora}
              onChange={(e) => setPosseFora(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl shadow-inner text-blue-900">
          <p>
            <strong>⏱ Tempo:</strong> {tempo} min
          </p>
          <p>
            <strong>📊 Placar:</strong> {placarCasa} x {placarFora}
          </p>
          <p>
            <strong>🚩 Escanteios:</strong> {escanteiosCasa} x{" "}
            {escanteiosFora}
          </p>
          <p>
            <strong>⚔️ Ataques Perigosos:</strong> {ataquesCasa} x{" "}
            {ataquesFora}
          </p>
          <p>
            <strong>📎 Posse de Bola:</strong> {posseCasa}% x {posseFora}%
          </p>
          <hr className="my-2 border-blue-300" />
          <p>
            <strong>🏆 Vitória no 1º tempo:</strong>{" "}
            {prob.vitoriaPrimeiroTempo} -{" "}
            <strong>{prob.resultadoPrimeiroTempo}</strong>
          </p>
          <p>
            <strong>🏁 Vitória final:</strong> {prob.vitoriaFinal} -{" "}
            <strong>{prob.resultadoFinal}</strong>
          </p>
          <p>
            <strong>📉 Escanteios baixos:</strong> {prob.escanteiosBaixos} -{" "}
            <strong>{prob.resultadoEscanteios}</strong>
          </p>
          <p>
            <strong>🚫 Sem mais gols:</strong> {prob.semMaisGols} -{" "}
            <strong>{prob.resultadoSemGols}</strong>
          </p>
          <hr className="my-2 border-blue-300" />
          <p className="text-xl font-semibold text-center mt-2">
            <strong>🔔 Melhor momento para apostar:</strong>{" "}
            <span className="text-blue-600">{prob.melhorMomento}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
