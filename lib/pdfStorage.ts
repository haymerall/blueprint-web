export const storePdfBlob = async (id: string, file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("BlueprintPDFDB", 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("pdf_blobs")) {
        db.createObjectStore("pdf_blobs");
      }
    };
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("pdf_blobs", "readwrite");
      const store = tx.objectStore("pdf_blobs");
      store.put(file, id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    };
    request.onerror = () => reject(request.error);
  });
};

export const getPdfBlob = async (id: string): Promise<Blob | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open("BlueprintPDFDB", 1);
    request.onsuccess = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("pdf_blobs")) return resolve(null);
      const tx = db.transaction("pdf_blobs", "readonly");
      const store = tx.objectStore("pdf_blobs");
      const getReq = store.get(id);
      getReq.onsuccess = () => resolve(getReq.result || null);
      getReq.onerror = () => resolve(null);
    };
    request.onerror = () => resolve(null);
  });
};
