import { remote, ipcRenderer } from "electron";
import * as marked from "marked";

const mainProcess = remote.require('./main.js');

const markdownView: HTMLTextAreaElement = document.querySelector('#markdown');
const htmlView: HTMLElement = document.querySelector('#html');
const newFileButton: HTMLButtonElement = document.querySelector('#new-file');
const openFileButton: HTMLButtonElement = document.querySelector('#open-file');
const saveMarkdownButton: HTMLButtonElement = document.querySelector('#save-markdown');
const revertButton: HTMLButtonElement = document.querySelector('#revert');
const saveHtmlButton: HTMLButtonElement = document.querySelector('#save-html');
const showFileButton: HTMLButtonElement = document.querySelector('#show-file');
const openInDefaultButton: HTMLButtonElement = document.querySelector('#open-in-default');

const renderMarkdownToHtml = (markdown) => {
    htmlView.innerHTML = marked(markdown, { sanitize: true });
};

markdownView.addEventListener('keyup', (event) => {
    const currentContent = markdownView.value;
    renderMarkdownToHtml(currentContent);
});

openFileButton.addEventListener('click', () => {
    mainProcess.getFileFromUser();
});

ipcRenderer.on('file-opened', (event, file, content: string) => {
    markdownView.value = content;
    renderMarkdownToHtml(content);
});