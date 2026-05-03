import React from 'react';
import Header from './Componentes/Header/Header';
import SalesForm from './Componentes/SalesForm/SalesForm';
import SalesTable from './Componentes/SalesTable/SalesTable';
import { useSales } from './hooks/useSales'; 
import { exportarPDF } from './Utils/ExportPdf'; // Atenção: Corrigi para 'Utils' com U maiúsculo se for o caso
import './App.css';

function App() {
  // Pegamos os registros e funções do nosso Hook
  const { registros, adicionarRegistro, removerRegistro } = useSales();

  // Função disparada pelo botão no Header
  const handleExportar = () => {
    // Verificação de segurança
    if (!registros || registros.length === 0) {
      alert("Adicione pelo menos um item para exportar o relatório.");
      return;
    }
    
    try {
      console.log("Iniciando exportação...", registros);
      exportarPDF(registros);
    } catch (error) {
      console.error("Falha na chamada da exportação:", error);
      alert("Erro ao tentar gerar o PDF. Verifique o console.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 antialiased text-gray-900">
      {/* Passamos a função de exportar para o Header */}
      <Header onExport={handleExportar} />

      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Formulário */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Novo Registro</h2>
          <SalesForm onAdd={adicionarRegistro} />
        </section>

        {/* Tabela */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Fluxo de Itens</h2>
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              {registros.length} itens
            </span>
          </div>
          <SalesTable 
            dados={registros} 
            onDelete={removerRegistro} 
          />
        </section>

      </main>

      <footer className="text-center py-8 text-gray-400 text-sm">
        Painel de Vendas & Compras &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App; // Adicionado o ";" e verificado o export