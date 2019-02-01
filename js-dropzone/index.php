<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>JS Dropzone</title>
	<link rel="stylesheet" href="./assets/css/style.css">
	<script type="text/javascript" src="./assets/js/dropzone.js"></script>
</head>

<body>
	<div id="main">
		<form action="" method="POST" id="dropzone-form" enctype="multipart/form-data" autocomplete="off">
			<div id="dropzone" class="dropzone">

				<div id="dropzone__attached" class="dropzone__attached">
					<div class="form-input__label">
						Attached files
					</div>
					<ul class="dropzone__preview" id="dropzone__preview"></ul>

					<button id="dropzone__attached-clear" class="dropzone__attached-clear">
						<span>Remove all files</span>
					</button>

				</div>

				<div class="form-input">
					<span class="form-input__label">Add Attachments</span>
					<div class="form-input__input-wrap">

						<div class="dropzone__errors" id="dropzone__errors"></div>

						<label for="dropzone__fileup">
							<div id="dropzone__drop-area" class="dropzone__drop-area">
								<div class="dropzone-content">

									<div class="dropzone-content__svg">

									</div>

									<div class="dropzone-content__drop-files-here">
										Drop files here
									</div>

									<div class="dropzone-content__select-files">
										Select files
									</div>

									<label class="dropzone-content__or-select-files">
										or select files
									</label>

								</div>

								<div class="dropzone-content__file-details">
									<span>Accepted file types: .mp4, .mov, .jpg, .jpeg, .png, .doc, .ppt, .pptx, .xls, .xlsx, .pdf, .txt</span>
									<span>Accepted file size: 8MB</span>
								</div>

							</div>
							<input type="file" id="dropzone__fileup" class="dropzone__fileup" name="event_files[]" multiple>
						</label>
					</div>
				</div>

				<input type="hidden" id="dropzone__unique" class="dropzone__unique" value="<?php echo esc_attr( $unique_id ); ?>">

			</div>
		</form>
	</div>
</body>

</html>
