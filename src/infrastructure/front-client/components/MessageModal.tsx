import { JSX } from 'react';
import useError from '@/hooks/useError';

interface MessageModalProps {
  name: string;
  isError: boolean;
  onClose: () => void;
}

export default function MessageModal({
  name,
  isError,
  onClose,
}: MessageModalProps): JSX.Element {
  let message = isError ? useError(name) : name;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2
          className={`text-xl font-bold ${
            isError ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {isError ? 'Erreur' : 'Succès'}
        </h2>
        <p className="mt-2 text-black">{message}</p>
        <button
          className={`mt-4 px-4 py-2 ${
            isError ? 'bg-red-500' : 'bg-green-500'
          } text-white rounded`}
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
