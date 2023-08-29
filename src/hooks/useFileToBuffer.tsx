import { useCallback, useState } from 'react';

function useFileToBuffer(): [(file: File) => Promise<ArrayBuffer | null>, Error | null] {
  const [error, setError] = useState<Error | null>(null);

  const fileToBuffer = useCallback(async (file: File): Promise<ArrayBuffer | null> => {
    try {
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          if (event.target?.result instanceof ArrayBuffer) {
            resolve(event.target.result);
          } else {
            reject(new Error('Failed to read file as ArrayBuffer'));
          }
        };

        reader.onerror = (event) => {
          reject(event.target?.error || new Error('Unknown error'));
        };

        reader.readAsArrayBuffer(file);
      });

      setError(null);
      return arrayBuffer;
    } catch (error: any) {
      setError(error);
      return null;
    }
  }, []);

  return [fileToBuffer, error];
}

export default useFileToBuffer;