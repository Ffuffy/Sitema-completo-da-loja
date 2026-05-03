import React from 'react';
import { Trash2, ShoppingBag } from 'lucide-react';
import './SalesTable.css';

const SalesTable = ({ dados, onDelete }) => {
  
  return (
    <div className="table-container">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Pagamento</th>
            <th className="text-center">Qtd</th>
            <th>Total</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {dados.length > 0 ? (
            dados.map((item) => (
              <tr key={item.id}>
                <td className="font-medium">{item.produto}</td>
                <td>
                  <span className={`badge-category ${item.categoria.toLowerCase()}`}>
                    {item.categoria}
                  </span>
                </td>
                <td className="text-muted">{item.pagamento}</td>
                <td className="text-center text-muted">{item.quantidade}</td>
                <td className="text-total">
                  R$ {item.total.toFixed(2)}
                </td>
                <td className="text-center">
                  <button
                    onClick={() => onDelete(item.id)}
                    className="btn-delete"
                    title="Excluir item"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="empty-state">
                <ShoppingBag size={40} strokeWidth={1} />
                <p>Nenhum registro encontrado.</p>
              </td>
            </tr>
          )}
        </tbody>
        {dados.length > 0 && <Tfoot dados={dados} />}
      </table>
    </div>
  );
};

const Tfoot = ({ dados }) => {
  const totalGeral = dados.reduce((acc, curr) => acc + curr.total, 0);
  return (
    <tfoot className="table-footer">
      <tr>
        <td colSpan="4" className="footer-label">Valor Total Acumulado:</td>
        <td className="footer-value">R$ {totalGeral.toFixed(2)}</td>
        <td></td>
      </tr>
    </tfoot>
  );
};

export default SalesTable;