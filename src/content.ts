// Function to create the copy button
function createCopyButton() {
    const button = document.createElement('button');
    button.innerText = 'Copy to Clipboard';
    button.id = 'copy-to-clipboard-button';
    button.style.position = 'fixed';
    button.style.bottom = '10px';
    button.style.right = '10px';
    button.style.zIndex = '1000';
    button.addEventListener('click', copyToClipboard);
    document.body.appendChild(button);
  }

  // Function to copy the current PR URL to the clipboard
  function copyToClipboard() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  }

  // Run the function to create the button
  createCopyButton();
