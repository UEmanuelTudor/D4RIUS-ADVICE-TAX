<?php
// Preluam datele din formular
$nume = $_POST['nume'] ?? '';
$prenume = $_POST['prenume'] ?? '';
$email_client = $_POST['email'] ?? '';
$telefon = $_POST['tel'] ?? '';
$data = $_POST['data'] ?? '';
$ora = $_POST['ora'] ?? '';
$serviciu = $_POST['serviciu'] ?? '';
$mesaj = $_POST['mesaj'] ?? '';

// Generam un numar de rezervare unic
$reservation_number = "D4TAX-" . str_pad(rand(0, 9999), 4, "0", STR_PAD_LEFT);

// Email catre client
$subject_client = "Rezervarea ta a fost confirmata";
$message_client = "Buna $nume $prenume!\n\n";
$message_client .= "Rezervarea cu nr. $reservation_number a fost confirmata.\n";
$message_client .= "Te asteptam pe $data la ora $ora pentru serviciul: $serviciu.\n\n";
if(!empty($mesaj)) {
    $message_client .= "Mesaj optional: $mesaj\n\n";
}
$message_client .= "Echipa D4TAX";

// Setam header-ele emailului
$headers = "From: noreply@siteultau.ro\r\n";
$headers .= "Cc: admin@siteultau.ro\r\n"; // tu primesti copia
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Trimitere email catre client
mail($email_client, $subject_client, $message_client, $headers);

// Raspuns catre frontend
echo json_encode([
    "success" => true,
    "reservation_number" => $reservation_number
]);
?>