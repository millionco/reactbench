import { useCallback, useState } from "react";
import { getFilesFromDataTransferItems } from "./get-files-from-data-transfer-items";
import { findDropFolderElement } from "./find-drop-folder-element";
import { resolveUploadPaths } from "./resolve-upload-paths";

export const DropWorkspace = ({
  defaultDestination,
  isOwner = true,
  onUpload,
}: DropWorkspaceProps) => {
  const [dragOverPath, setDragOverPath] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDragOver = useCallback((event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    const folderElement = findDropFolderElement(event.target);
    setDragOverPath(folderElement?.dataset.path ?? null);
  }, []);

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      if (!isOwner) return;

      const folderElement = findDropFolderElement(event.target);
      const destination = folderElement?.dataset.path ?? defaultDestination;
      if (destination === undefined) return;

      const files = await getFilesFromDataTransferItems(
        event.dataTransfer.items,
      );
      await onUpload({
        destination,
        files,
        paths: resolveUploadPaths(files, destination),
      });
      setErrorMessage("");
      setDragOverPath(null);
    },
    [defaultDestination, isOwner, onUpload],
  );

  return (
    <section
      aria-label="Project files"
      data-drag-over-path={dragOverPath ?? ""}
      onDragLeave={() => setDragOverPath(null)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <p>Drop files into the project root or a folder.</p>
      <output aria-label="Active drop target">
        Drop target: {dragOverPath ?? "none"}
      </output>
      <div data-is-folder="true" data-path="src">
        src
      </div>
      {errorMessage ? <p role="alert">{errorMessage}</p> : null}
    </section>
  );
};
