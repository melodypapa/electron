const linkSection: HTMLElement = document.querySelector(".links");
const errorMessage: HTMLElement = document.querySelector(".error-message");
const newLinkForm = document.querySelector(".new-link-form");
const newLinkUrl: HTMLInputElement = document.querySelector(".new-link-url");
const newLinkSubmit: HTMLButtonElement = document.querySelector(".new-link-submit");
const clearStorageButton = document.querySelector(".clear-storage");

newLinkUrl.addEventListener('keyup', () => {
    newLinkSubmit.disabled = !newLinkUrl.validity.valid;
});

const clearForm = () => {
    newLinkUrl.value = null;
}

const parseResponse = (text) => {
    const parser = new DOMParser();
    return parser.parseFromString(text, 'text/html');
}

const findTitle = (nodes: Document) => {
    return nodes.querySelector('title').innerText;
}

newLinkForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const url = newLinkUrl.value;
    fetch(url)
        .then(response => response.text())
        .then(parseResponse)
        .then(findTitle);
})