<?php
  header('Content-Type: application/json');
  require 'connector.php';

    $sql_get = "SELECT * FROM ourProjectz";
    $result = mysqli_query($conn,$sql_get);
    $json_array = array();

    while( $row = mysqli_fetch_assoc($result)) {
      $json_array[] = $row;
    }

    print_r((json_encode($json_array, JSON_NUMERIC_CHECK)));

    $conn->close();

?>
