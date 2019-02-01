document.addEventListener("DOMContentLoaded",function(){
	// Dropzone js.
// ----------------------------------------------------------------------------
function dropzone() {
	if ( document.querySelector( '.dropzone' ) ) {
		const dropzone		= document.querySelector('.dropzone');
		const dropArea      = dropzone.querySelector( '#dropzone__drop-area' );
		const fileFallback  = dropzone.querySelector( '#dropzone__fileup' );
		const resetFiles    = dropzone.querySelector( '#dropzone__attached-clear' );
		const errorZone     = dropzone.querySelector( '#dropzone__errors' );
		const uniqueId      = dropzone.querySelector( '#dropzone__unique' ) ? document.querySelector( '#dropzone__unique' ).value : '';
		const attached      = dropzone.querySelector( '#dropzone__attached');
		let previewFiles    = dropzone.querySelector( '#dropzone__preview' );
		let encodedFiles    = [];

		let fileData        = {};
		let errorMessages   = '';
		const allowedExt    = [
			'image/jpeg',
			'image/jpg',
			'image/png',
			'application/pdf',
			'video/quicktime',
			'video/mp4',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'application/vnd.openxmlformats-officedocument.presentationml.presentation',
			'application/vnd.ms-powerpoint',
			'application/vnd.ms-excel',
			'application/msword',
			'text/plain'
		];

		function attachedCheck() {
			// Only show attached files if there are files in the list
			let previewFiles  = dropzone.querySelector( '#dropzone__preview' );

			if (previewFiles.children.length > 0) {
				attached.classList.add('dropzone__attached--show');
			} else {
				attached.classList.remove('dropzone__attached--show');
			}
		}

		// Function to encode our files to base64.
		function getBase64(file, onLoadCallback) {
			return new Promise(function(resolve, reject) {
				var reader = new FileReader();
				reader.onload = function() { resolve(reader.result); };
				reader.onerror = reject;
				reader.readAsDataURL(file);
			});
		}

		// Clear our files array and remove any previewed files.
		function clearFiles() {
			previewFiles.innerHTML = '';
			encodedFiles = [];
			errorZone.innerHTML = '';
			attachedCheck();
		}

		// Function to show uploaded file in dropzone.
		function previewFile(file) {
			// create div to house previewed file.
			let output = document.createElement('li');

			// Place file name inside the created div.
			output.innerHTML = `
				<svg x="0px" y="0px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 18h12V6h-4V2H4v16zm-2 1V0h12l4 4v16H2v-1z"></path></svg>
				<span class="dropzone__preview-file">${ file.name.replace(/\s+/g, '-').toLowerCase() }</span>
			`;

			// give div a class.
			output.classList.add( 'dropzone__preview-item' );

			// add our output to the parent div.
			previewFiles.appendChild(output);

			errorZone.innerHTML = '';
			attachedCheck();
		}

		function handleDrop(e) {
			// cache relevant data.
			let data = e.dataTransfer;
			let files = data.files;

			// fire our function to store those files.
			handleFiles(files);
		}

		function handleFiles(files) {

			errorMessages = '';

			files = [...files];

			// for every file...
			files.forEach( ( file ) => {

				// if the file has an extension that we allow & is under 8MB in size.
				if ( allowedExt.includes( file.type ) != false && file.size <= 8000000 ) {
					previewFile( file );
					// convert each file to base64.
					var promise = getBase64(file);

					// once the base64 conversion is finished, store the data in an object.
					promise.then(function(result) {
						fileData = {
							name: file.name.replace(/\s+/g, '-').toLowerCase(),
							type: file.type,
							size: file.size,
							data: result,
						}

						// add our data to the final array.
						encodedFiles.push( fileData );
					});
				} else {
					if ( allowedExt.includes( file.type ) === false ) {
						errorMessages += `
						<div class="alert-small alert-small--error">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z"/></svg>
							<span>${file.name} cannot be uploaded as the file type is not allowed.</span>
							<button class="alert-small__close c-alert__close | close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg></button>
						</div>
						`;
					}

					if ( file.size > 8000000 ) {
						errorMessages += `
						<div class="alert-small alert-small--error">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 5h2v6H9V5zm0 8h2v2H9v-2z"/></svg>
							<span>${file.name} cannot be uploaded as it is larger than 8MB.</span>
							<button class="alert-small__close c-alert__close | close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/></svg></button>
						</div>
						`;
					}
				}

			});

			if ( errorMessages ) {
				errorZone.innerHTML = errorMessages;

				// alert-small close buttons
				closeButtons();
			}

			attachedCheck();

			console.log(encodedFiles);

			return encodedFiles;
		}

		// Only run following functions if we actually have a dropzone.
		if ( dropArea ) {
			// Prevent default drag behaviors.
			['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
				dropArea.addEventListener(eventName, (e) => {
					e.preventDefault();
					e.stopPropagation();
				});

				document.body.addEventListener(eventName, (e) => {
					e.preventDefault();
					e.stopPropagation();
				});
			});

			// Highlight drop area when item is dragged over it.
			['dragenter', 'dragover'].forEach(eventName => {
				dropArea.addEventListener(eventName, (e) => {
					dropArea.classList.add('dropzone__drop-area--highlight');
				});
			});

			// Remove highlight class when you've finished dropping.
			['dragleave', 'drop'].forEach(eventName => {
				dropArea.addEventListener(eventName, (e) => {
					dropArea.classList.remove('dropzone__drop-area--highlight');
				});
			});

			// Handle dropped files
			dropArea.addEventListener( 'drop', handleDrop, false );

			// Cater for someone adding to the attachments via the manual upload process.
			fileFallback.addEventListener( 'change', (e) => {
				var files = fileFallback.files;
				handleFiles(files);
			});

			// Clear files when clear button is clicked.
			resetFiles.addEventListener( 'click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				clearFiles();
			});
		}

		return( encodedFiles );

	}
}

dropzone();
});
