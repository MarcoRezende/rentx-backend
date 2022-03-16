import fs from 'fs';

export const deleteFile = async (filePath: string) => {
  try {
    /**
     * checa se o arquivo existe, se não
     * dispara um erro.
     */
    await fs.promises.stat(filePath);
  } catch {
    return;
  }

  await fs.promises.unlink(filePath);
};
