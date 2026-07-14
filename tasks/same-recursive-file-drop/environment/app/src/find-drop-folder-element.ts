export const findDropFolderElement = (target: EventTarget) =>
  target instanceof HTMLElement
    ? target.closest<HTMLElement>("[data-path][data-is-folder='true']")
    : null;
