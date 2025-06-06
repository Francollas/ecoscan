import React from "react";

export default function Navbar({ startDate, endDate, setStartDate, setEndDate }) {
  return (
    <div className="bg-green-700 text-white p-4 flex flex-col md:flex-row justify-between items-center shadow-md">
      <div className="text-center md:text-left">
        <h1 className="text-xl font-bold">EcoScan</h1>
        <p className="text-sm text-white">Desenvolvido por Franco em Coordenação com o grupo C2, responsável pelo tema “Uso de Tecnologias Digitais na Gestão do Desmatamento Florestal em Moçambique: Iniciativas de Monitoramento e Resiliência às Mudanças Climáticas”, projeto este supervisionado pelo Instituto Politécnico de Portalegre</p>
      </div>
      <div className="flex gap-4 mt-2 md:mt-0">
        <div>
          <label className="block text-sm">Data de Início</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="text-black p-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Data de Fim</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="text-black p-1 rounded"
          />
        </div>
      </div>
    </div>
  );
}
