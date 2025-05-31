export const getAudioDuration = async (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.onloadedmetadata = () => resolve(audio.duration);
    audio.onerror = reject;
    audio.src = URL.createObjectURL(file);
  });
};

export const getImageDimensions = async (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

export const formatFileSize = (bytes: number): string => {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

export const createChunkedFile = (chunk: Blob, originalFile: File): File => {
  return new File([chunk], originalFile.name, {
    type: originalFile.type,
    lastModified: originalFile.lastModified
  });
};
