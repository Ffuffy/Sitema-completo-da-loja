import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import './SalesForm.css';
const SalesForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    produto: '',
    categoria: 'Bebidas',
    pagamento: 'Dinheiro',
    quantidade: '',
    valor: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Converte valores para números antes de enviar
    const registroFormatado = {
      ...formData,
      quantidade: parseInt(formData.quantidade),
      valor: parseFloat(formData.valor)
    };

    onAdd(registroFormatado);

    // Limpa o formulário mantendo as categorias padrão
    setFormData({
      produto: '',
      categoria: 'Bebidas',
      pagamento: 'Dinheiro',
      quantidade: '',
      valor: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Produto */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Nome do Produto</label>
        <input
          type="text"
          name="produto"
          value={formData.produto}
          onChange={handleChange}
          placeholder="Ex: Coca-Cola 2L"
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          required
        />
      </div>

      {/* Categoria */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Categoria</label>
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white transition"
        >
          <option value="Bebidas">Bebidas</option>
          <option value="Comidas">Comidas</option>
          <option value="Fumos">Fumos</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      {/* Pagamento */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Forma de Pagamento</label>
        <select
          name="pagamento"
          value={formData.pagamento}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white transition"
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão">Cartão</option>
          <option value="Pix">Pix</option>
        </select>
      </div>

      {/* Quantidade */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Quantidade</label>
        <input
          type="number"
          name="quantidade"
          value={formData.quantidade}
          onChange={handleChange}
          min="1"
          placeholder="0"
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          required
        />
      </div>

      {/* Valor Unitário */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-600">Valor Unitário (R$)</label>
        <input
          type="number"
          name="valor"
          value={formData.valor}
          onChange={handleChange}
          step="0.01"
          min="0"
          placeholder="0,00"
          className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          required
        />
      </div>

      {/* Botão de Ação */}
      <div className="flex items-end">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-md active:bg-blue-800"
        >
          <PlusCircle size={20} />
          Adicionar
        </button>
      </div>
    </form>
  );
};

export default SalesForm;