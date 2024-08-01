// Function to create the copy button with SVG
function createCopyButton() {
    const button = document.createElement('button');
    button.id = 'copy-to-clipboard-button';
    button.style.marginLeft = '5px'; // Smaller margin
    button.style.backgroundColor = 'transparent';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.padding = '0px 5px 0px 0px'; // Remove padding
    button.style.display = 'inline-flex'; // Ensure it aligns properly

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" class="icon-md-heavy">
            <path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path>
        </svg>`;
    button.innerHTML = svg;

    button.addEventListener('click', copyToClipboard);
    return button;
}

// Function to copy the inner text of the selected element to the clipboard
function copyToClipboard(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const parent = button.parentElement;

    if (parent) {
        const textToCopy = parent.innerText;
        navigator.clipboard.writeText(textToCopy).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
}

// Function to insert the button into the correct location
function insertCopyButton() {
    const reviewThreads = document.querySelectorAll('[id^="review-thread-or-comment-id-"] > details > summary > div');

    reviewThreads.forEach(thread => {
        if (!thread.querySelector('#copy-to-clipboard-button')) {
            const button = createCopyButton();
            const textSpan = thread.querySelector('span');
            if (textSpan) {
                textSpan.insertAdjacentElement('afterend', button);
            } else {
                thread.appendChild(button);
            }
        }
    });
}

// Observe the DOM for changes to insert the button dynamically
const observer = new MutationObserver(insertCopyButton);
observer.observe(document.body, { childList: true, subtree: true });

// Initial insertion of the button
insertCopyButton();
