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
    button.style.position = 'relative'; // For positioning the indicator

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" class="icon-md-heavy">
            <path fill="currentColor" fill-rule="evenodd" d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z" clip-rule="evenodd"></path>
        </svg>`;
    button.innerHTML = svg;

    button.addEventListener('click', copyToClipboard);
    return button;
}

// Function to show the green checkmark and a floating "Copied!" indicator
function showIndicator(button: HTMLElement) {
    const originalSVG = button.innerHTML;
    const checkmarkSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" class="icon-md-heavy">
            <path fill="green" d="M20.285 6.708a1 1 0 0 0-1.49-1.342l-9.052 10.048L5.227 12.08a1 1 0 1 0-1.454 1.372l5.263 5.57a1 1 0 0 0 1.453-.002l9.796-10.312z"/>
        </svg>`;

    // Change the button SVG to checkmark
    button.innerHTML = checkmarkSVG;

    // Revert back to original SVG after 1 second
    setTimeout(() => {
        button.innerHTML = originalSVG;
    }, 1000);

    // Create and show the floating "Copied!" indicator
    const indicator = document.createElement('div');
    indicator.innerText = 'Copied!';
    indicator.style.position = 'absolute';
    indicator.style.top = '-20px';
    indicator.style.right = '0';
    indicator.style.backgroundColor = '#4caf50'; // Green background
    indicator.style.color = 'white';
    indicator.style.padding = '2px 5px';
    indicator.style.borderRadius = '3px';
    indicator.style.fontSize = '12px';
    indicator.style.opacity = '0';
    indicator.style.transition = 'opacity 0.5s';

    button.appendChild(indicator);

    // Fade in
    requestAnimationFrame(() => {
        indicator.style.opacity = '1';
    });

    // Fade out after 1 second
    setTimeout(() => {
        indicator.style.opacity = '0';
        // Remove the indicator after transition
        setTimeout(() => {
            button.removeChild(indicator);
        }, 500);
    }, 1000);
}

// Function to copy the inner text of the selected element to the clipboard
function copyToClipboard(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const parent = button.parentElement;

    if (parent) {
        const textToCopy = parent.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showIndicator(button);
        }).catch(err => {
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
