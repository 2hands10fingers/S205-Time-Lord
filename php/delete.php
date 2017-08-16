<?php


// CALLL CONNECTOR FILE
// $root = $_SERVER['DOCUMENT_ROOT'];
// require $root . 'connector.php';

include( $_SERVER['DOCUMENT_ROOT'] . '/php/connector.php' );

$projID = filter_var($_POST['RprojID'], FILTER_VALIDATE_INT);


$stmt = $conn->prepare("DELETE FROM ourProjects WHERE projID = ?");
$stmt->bind_param('i', $projID);


  if ($stmt->execute()) {
      header('Location: /index.php');
      $stmt->close;
    } else {
        echo "Error deleting record: " . $conn->error;
        echo $stmt->error;
    }
$conn->close();
?>
