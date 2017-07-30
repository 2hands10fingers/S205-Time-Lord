<?php

require 'connector.php';

$projID = $_POST['projID'];
$budget = $_POST['budget'];

$sql = "INSERT INTO ourProjectz (projID, budget) VALUES ('$projID', '$budget')";

  if ($conn->query($sql) === TRUE) {
      header('Location: index.php');
      die();
   } else {
      echo "</div class='subBanner error'>Error: " . $sql . "<br>" . $conn->error . "<span class='cancel'>X</span></div>";
  }

  $conn->close();
 ?>
