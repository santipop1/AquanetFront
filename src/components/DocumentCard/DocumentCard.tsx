import { CheckCircle, XCircle, Loader2, Upload, MessageSquare } from 'lucide-react';
import { cn } from "@/lib/utils";

type DocumentStatus = 'accepted' | 'pending' | 'error' | 'none';

type DocumentRow = {
  icon: React.ReactNode;
  title: string;
  format: string;
  description: string;
  status: DocumentStatus;
  message?: string;
};

type DocumentCardProps = {
  title: string;
  documents: DocumentRow[];
};

export function DocumentCard({ title, documents }: DocumentCardProps) {
  const getStatusUI = (status: DocumentStatus, message?: string) => {
    switch (status) {
      case 'accepted':
        return <span className="text-green-600 font-medium border border-green-600 px-2 py-1 rounded">Documento aceptado</span>;
      case 'pending':
        return <span className="text-yellow-600 font-medium border border-yellow-600 px-2 py-1 rounded">Documento en revisión</span>;
      case 'error':
        return (
          <div className="flex items-center gap-2 text-red-600">
            <MessageSquare className="w-4 h-4" />
            <XCircle className="w-5 h-5" />
            <span className="font-medium">Error</span>
            {message && (
              <div className="ml-2 text-sm text-gray-700 bg-white border rounded p-2 shadow max-w-sm">{message}</div>
            )}
          </div>
        );
      default:
        return (
          <button className="flex items-center gap-2 text-gray-700 font-medium border px-2 py-1 rounded hover:bg-gray-100 transition">
            <Upload className="w-4 h-4" /> Subir documento
          </button>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow border space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div key={index} className="flex justify-between items-start border-t pt-4">
            <div className="flex items-start gap-4">
              <div className="mt-1">{doc.icon}</div>
              <div>
                <p className="font-medium text-sm">{doc.title}</p>
                <p className="text-xs text-gray-500">{doc.format}</p>
                <p className="text-xs mt-1 text-gray-700">{doc.description}</p>
              </div>
            </div>
            <div>{getStatusUI(doc.status, doc.message)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
