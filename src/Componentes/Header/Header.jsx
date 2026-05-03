import React from 'react';
import { FileDown, Store } from 'lucide-react';
import './Header.css';

const Header = ({ onExport }) => {
    return (
        <header className="app-header">
            <div className="header-container">
                {/* Logo Area */}
                <div className="logo-section">
                    <div className="icon-wrapper">
                        <Store size={24} />
                    </div>
                    <h1 className="header-title">Vendas</h1>
                </div>

                {/* Botão de Exportar */}
                <button
                    onClick={onExport}
                    className="btn-export"
                    title="Exportar para PDF"
                >
                    <FileDown size={20} />
                    <span>Exportar PDF</span>
                </button>
            </div>
        </header>
    );
};

export default Header;