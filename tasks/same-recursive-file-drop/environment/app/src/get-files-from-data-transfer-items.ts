export const getFilesFromDataTransferItems = async (
  items: ArrayLike<DataTransferItemLike>,
): Promise<Array<File>> => {
  const files: Array<File> = [];

  const processEntry = async (entry: FileSystemEntryLike): Promise<void> => {
    if (!entry.isFile) return;

    await new Promise<void>((resolve, reject) => {
      const fileEntry = entry as FileSystemFileEntryLike;
      fileEntry.file((file) => {
        const relativePath = entry.fullPath.replace(/^\//, "");
        if (relativePath && relativePath !== file.name) {
          const fileWithPath = new File([file], relativePath, { type: file.type });
          files.push(fileWithPath);
        } else {
          files.push(file);
        }
        resolve();
      }, reject);
    });
  };

  const entries = Array.from(items)
    .map((item) => item.webkitGetAsEntry())
    .filter(Boolean) as Array<FileSystemEntryLike>;

  await Promise.all(entries.map(processEntry));
  return files;
};
