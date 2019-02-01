# JS Dropzone Upload

I created this JS dropzone functionality when I realised I needed a media upload zone for a form I was working on. I'd done some research and did find a few out-of-the-box plugins that would work but they were overkill for what I needed.

The code in this repo contains the following;
- Basic form
- Basic form & dropzone styling
- JS relating to the dropzone along with file preparation to handle them as you please

You can upload multiple files at one time either via drag/drop or simply clicking in the dropzone. When I was working on this mid-project, I was intercepting the files at the other end and storing them inside `wp-content/dropzone-files` via AJAX & some PHP. Here is an example snippet for that functionality;

```
if ( isset( $_POST['files'] ) && ! empty( $_POST['files'] ) ) {
  // @codingStandardsIgnoreStart
  $files      = $_POST['files'];
  $meta_array = array();

  foreach ( $files as $file ) {

    $recieved_type = $file['type'];
    $file_name     = $file['name'];
    $file_data     = $file['data'];
    $file_size     = $file['size'];

    define( 'UPLOAD_DIR', $_SERVER['DOCUMENT_ROOT'] . '/dropzone-files/' );
    $file_data   = str_replace( 'data:' . $recieved_type . ';base64,', '', $file_data );
    $file_data   = str_replace( ' ', '+', $file_data );
    $file        = base64_decode( $file_data );
    $final_file  = UPLOAD_DIR . $file_name;
    file_put_contents( $final_file, $file );

    $meta_array[] = array(
      "_attach_path" => $final_file,
      "_attach_name" => $file_name,
      "_attach_type" => $recieved_type,
      "_attach_size" => $file_size,
    );

  }
  // @codingStandardsIgnoreEnd

  if ( ! empty( $meta_array ) ) {
    update_post_meta( $result, '_attachments_group', $meta_array );
  }
}
```

If you'd like to ask any questions or find any bugs, feel free to raise an issue and i'll do my best to get back to you :)
