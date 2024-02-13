document.addEventListener('DOMContentLoaded', () => {
  const inputText = document.getElementById('inputText');
  const outputText = document.getElementById('outputText');
const actualBtn = document.getElementById('actual-btn');
const fileChosen = document.getElementById('file-chosen');
const cancelBtn = document.getElementById('cancelBtn');
  const encodeBtn = document.getElementById('encodeBtn');
  const decodeBtn = document.getElementById('decodeBtn');
  const encodingOptions = document.getElementById('encodingOptions');

  // Add event listeners to the buttons
  const downloadBtn = document.getElementById("downloadButton");
  const copyBtn = document.getElementById("copyButton");



  downloadBtn.addEventListener('click', () => {
  
  const text = document.getElementById("outputText").value;
  const originalFilename = "encoded.txt";
  const timestamp = new Date().getTime();
  const filename = originalFilename.replace(/(\.[\w\d_-]+)$/i, `_${timestamp}$1`);
  const element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
});



// Function to copy the text to the clipboard
copyBtn.addEventListener('click', () => {
  const text = document.getElementById("outputText").value;
  navigator.clipboard.writeText(text)
  .then(() => {
    // Show a small popup notification
    const notification = document.createElement("div");
    notification.innerText = "Copied!";
    notification.classList.add("popup");
    document.body.appendChild(notification);

    // Remove the notification after a certain time
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  })
  .catch((error) => {
    console.error("Error copying text: ", error);
  });
});




  // Update outputText when inputText changes
  inputText.addEventListener('input', () => {
    const input = inputText.value;
    const encoding = encodingOptions.value;

    if (encoding === 'hex') {
      const encodedText = encodeToHex(input);
      outputText.value = encodedText;
    } else if (encoding === 'url') {
      const encodedText = encodeURIComponent(input);
      outputText.value = encodedText;
    } else if (encoding === 'base64') {
      const encodedText = btoa(input);
      outputText.value = encodedText;
    }
  });




actualBtn.addEventListener('change', function(){
  fileChosen.textContent = this.files[0].name;

 const file = actualBtn.files[0];
  const reader = new FileReader();

  reader.onload = function() {
    inputText.value = reader.result;
  };

  reader.readAsText(file);


});

cancelBtn.addEventListener('click', function(){
  actualBtn.value = '';
  fileChosen.textContent = 'No file chosen';
  inputText.value = '';
  outputText.value = '';
});


  // Encode text
  encodeBtn.addEventListener('click', () => {
    const input = inputText.value;
    const encoding = encodingOptions.value;

    if (encoding === 'hex') {
      const encodedText = encodeToHex(input);
      outputText.value = encodedText;
    } else if (encoding === 'url') {
      const encodedText = encodeURIComponent(input);
      outputText.value = encodedText;
    } else if (encoding === 'base64') {
      const encodedText = btoa(input);
      outputText.value = encodedText;
    }
  });

  // Decode text
  decodeBtn.addEventListener('click', () => {
    const input = inputText.value;
    const encoding = encodingOptions.value;

    if (encoding === 'hex') {
      const decodedText = decodeFromHex(input);
      outputText.value = decodedText;
    } else if (encoding === 'url') {
      const decodedText = decodeURIComponent(input);
      outputText.value = decodedText;
    } else if (encoding === 'base64') {
      const decodedText = atob(input);
      outputText.value = decodedText;
    }
  });

  // Helper function to encode text to hexadecimal
  function encodeToHex(text) {
    return text.split('').map(char => char.charCodeAt(0).toString(16)).join('');
  }

  // Helper function to decode text from hexadecimal
  function decodeFromHex(hex) {
    const chunks = hex.match(/.{1,2}/g);
    return chunks.map(chunk => String.fromCharCode(parseInt(chunk, 16))).join('');
  }
});