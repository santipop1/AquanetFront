import React from 'react';

interface ModalProps {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, onConfirm, children }) => {
    if(title === "Comentarios del Documento") {
          return (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-xl font-bold mb-4">{title}</h2>
                    <div className="mb-4">{children}</div>
                    <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                    >
                        Cerrar
                    </button>
                    </div>
                </div>
                </div>
            );
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="mb-4">{children}</div>
            <div className="flex justify-end gap-4">
            <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
                Cancelar
            </button>
            <button
                onClick={onConfirm}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
                Confirmar
            </button>
            </div>
        </div>
        </div>
    );
};

export default Modal;
