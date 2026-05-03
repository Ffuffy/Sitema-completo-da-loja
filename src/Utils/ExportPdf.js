import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'; // Importe o plugin dessa forma

export const exportarPDF = (registros) => {
  try {
    const doc = new jsPDF();

    // Verificação de segurança: se não houver dados, nem tenta gerar
    if (!registros || registros.length === 0) {
      alert("Adicione ao menos um produto na tabela!");
      return;
    }

    const dataEmissao = new Date().toLocaleDateString('pt-BR');
    const horaEmissao = new Date().toLocaleTimeString('pt-BR');
    
    // Título
    doc.setFontSize(18);
    doc.text("Relatório de Vendas e Compras", 14, 20);
    
    doc.setFontSize(10);
    doc.text(`Gerado em: ${dataEmissao} às ${horaEmissao}`, 14, 28);

    // Preparação dos dados
    const tableColumn = ["Produto", "Categoria", "Pagamento", "Qtd", "Total"];
    const tableRows = registros.map(item => [
      item.produto,
      item.categoria,
      item.pagamento,
      item.quantidade,
      `R$ ${Number(item.total).toFixed(2)}`
    ]);

    // Cálculo do total
    const valorTotalGeral = registros.reduce((acc, curr) => acc + Number(curr.total), 0);

    // CHAMADA DO PLUGIN (Forma explícita para o Vite)
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: 'striped',
      headStyles: { fillColor: [44, 62, 80] },
    });

    // Posição final da tabela para o rodapé
    const finalY = doc.lastAutoTable.finalY;
    doc.setFontSize(12);
    doc.text(
      `Valor Total: R$ ${valorTotalGeral.toFixed(2)}`,
      14, 
      finalY + 15
    );

    doc.save(`vendas_${dataEmissao.split('/').join('-')}.pdf`);

  } catch (err) {
    // Isso vai nos dizer exatamente o que deu errado no F12
    console.error("ERRO NO PDF:", err);
    alert("Erro interno: " + err.message);
  }
};