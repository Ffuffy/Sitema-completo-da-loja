import { useState, useEffect } from 'react';

export const useSales = () => {
  // Estado inicial tentando carregar dados do LocalStorage
  const [registros, setRegistros] = useState(() => {
    const dadosSalvos = localStorage.getItem('@painel-vendas:registros');
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  // Salva no LocalStorage sempre que a lista mudar
  useEffect(() => {
    localStorage.setItem('@painel-vendas:registros', JSON.stringify(registros));
  }, [registros]);

  // Função para adicionar novo item
  const adicionarRegistro = (dadosForm) => {
    const novoItem = {
      ...dadosForm,
      id: crypto.randomUUID(), // Gera um ID único e seguro
      data: new Date().toISOString(),
      total: dadosForm.quantidade * dadosForm.valor
    };
    
    setRegistros((prev) => [novoItem, ...prev]);
  };

  // Função para remover item
  const removerRegistro = (id) => {
    setRegistros((prev) => prev.filter(item => item.id !== id));
  };

  // Cálculo do Total Geral (Memoizado implicitamente na renderização)
  const valorTotalGeral = registros.reduce((acc, curr) => acc + curr.total, 0);

  return {
    registros,
    adicionarRegistro,
    removerRegistro,
    valorTotalGeral
  };
};