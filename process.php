<?php

require 'connector.php';

$projID = filter_var($_POST['projID'], FILTER_VALIDATE_INT);
$budget = filter_var($_POST['budget'], FILTER_VALIDATE_INT);

$stmt = $conn->prepare("INSERT INTO ourProjects (projID, budget) VALUES (?, ?)");
$stmt->bind_param('ii', $projID, $budget);


  if ($stmt->execute()) {
      header('Location: index.php');
      $stmt->close;
   } else {
      echo "</div class='subBanner error'>Error: " . $sql . "<br>" . $conn->error . "<span class='cancel'>X</span></div>";
  }

?>

