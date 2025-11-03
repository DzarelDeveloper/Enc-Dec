document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const errorMessage = document.getElementById('error-message');
    const urlSafeCheckbox = document.getElementById('url-safe');
    const copyBtn = document.getElementById('copy-btn');
    
    // URL Encode
    document.getElementById('url-encode').addEventListener('click', function() {
        try {
            const input = inputText.value;
            const encoded = encodeURIComponent(input);
            outputText.value = encoded;
            clearError();
        } catch (error) {
            showError('Error encoding URL: ' + error.message);
        }
    });
    
    // URL Decode
    document.getElementById('url-decode').addEventListener('click', function() {
        try {
            const input = inputText.value;
            const decoded = decodeURIComponent(input);
            outputText.value = decoded;
            clearError();
        } catch (error) {
            showError('Error decoding URL: ' + error.message);
        }
    });
    
    // Base64 Encode
    document.getElementById('base64-encode').addEventListener('click', function() {
        try {
            const input = inputText.value;
            let encoded;
            
            // Use TextEncoder for proper UTF-8 handling
            const encoder = new TextEncoder();
            const bytes = encoder.encode(input);
            
            // Convert bytes to base64
            encoded = btoa(Array.from(bytes).map(byte => String.fromCharCode(byte)).join(''));
            
            // Apply URL-safe transformation if checked
            if (urlSafeCheckbox.checked) {
                encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
            }
            
            outputText.value = encoded;
            clearError();
        } catch (error) {
            showError('Error encoding to Base64: ' + error.message);
        }
    });
    
    // Base64 Decode
    document.getElementById('base64-decode').addEventListener('click', function() {
        try {
            let input = inputText.value;
            
            // Reverse URL-safe transformation if checked
            if (urlSafeCheckbox.checked) {
                input = input.replace(/-/g, '+').replace(/_/g, '/');
                // Add padding if needed
                while (input.length % 4) {
                    input += '=';
                }
            }
            
            // Decode base64 to bytes
            const binaryString = atob(input);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            
            // Convert bytes to text
            const decoder = new TextDecoder('utf-8');
            const decoded = decoder.decode(bytes);
            
            outputText.value = decoded;
            clearError();
        } catch (error) {
            showError('Error decoding from Base64: ' + error.message);
        }
    });
    
    // Copy output to clipboard
    copyBtn.addEventListener('click', function() {
        if (outputText.value) {
            outputText.select();
            document.execCommand('copy');
            
            // Visual feedback
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Copied!
            `;
            
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        }
    });
    
    // Helper functions
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }
    
    function clearError() {
        errorMessage.textContent = '';
        errorMessage.classList.remove('show');
    }
    
    // Add animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.add('opacity-80');
            setTimeout(() => {
                this.classList.remove('opacity-80');
            }, 200);
        });
    });
});