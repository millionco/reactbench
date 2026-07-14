const UPLOADS_DIRECTORY = "uploads";

export const resolveUploadPaths = (
  files: Array<File>,
  directory: string = UPLOADS_DIRECTORY,
): Array<string> => {
  const normalizedDirectory = directory || UPLOADS_DIRECTORY;
  const filesWithRelativePaths = files.filter(
    (file) => file.webkitRelativePath !== "",
  );
  const isFullFolderUpload = filesWithRelativePaths.length === files.length;
  const rootFolderName = isFullFolderUpload
    ? filesWithRelativePaths[0]?.webkitRelativePath.split("/")[0] ?? ""
    : "";

  return files.map((file) => {
    const relativePath = file.webkitRelativePath;
    if (!relativePath) {
      return `${normalizedDirectory}/${file.name.replace(/\s+/g, "_")}`;
    }

    if (normalizedDirectory === UPLOADS_DIRECTORY) {
      return `${UPLOADS_DIRECTORY}/${relativePath}`;
    }

    if (isFullFolderUpload) {
      const pathWithoutRoot = relativePath.replace(
        new RegExp(`^${rootFolderName}/`),
        "",
      );
      return pathWithoutRoot
        ? `${normalizedDirectory}/${pathWithoutRoot}`
        : normalizedDirectory;
    }

    return `${normalizedDirectory}/${relativePath}`;
  });
};
