<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './phpmailer/src/Exception.php';
require './phpmailer/src/PHPMailer.php';
require './phpmailer/src/SMTP.php';

if (!error_get_last()) {

$mail = new PHPMailer(true);

// Имя введенной пользователем а форме
$amount = $_POST['user_amount'];
// Телефон, введенный пользователем в форме
$phone = $_POST['user_phone'];
// Email, введенный пользователем в форме
$email = $_POST['user_email'];

    //Server settings
    $mail->isSMTP();                                            //Send using SMTP
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication

    // $mail->SMTPDebug = 2;                      //Enable verbose debug output
    $mail->Debugoutput = function($str, $level) {$GLOBALS['data']['debug'][] = $str;};    

    $mail->Host       = 'p728575.mail.ihc.ru';                       //Set the SMTP server to send through    
    $mail->Username   = 'info@valik-mini.ru';                     //SMTP username
    $mail->Password   = 'qazplm1';                     //SMTP password
    $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
    $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    // С какого почтового адреса отправляется собщение
    $mail->setFrom('info@p728575.ihc.xyz');
    // На какой почтовый адрес отправляется сообщение
    $mail->addAddress('pavelyutin@yandex.ru');

    // Content
    $mail->isHTML(true);
    // Тема письма
    $mail->Subject = 'ВАЛИКИ-МИНИ';
    // Тело пьсьма
    $mail->Body = '<p><b>ВАМ ОТПРАВЛЕНА ЗАЯВКА:</b></p>' . 
                  '<p><b>Количество наборов:</b>' . ' ' . $amount  . '</p>' .
                  '<p><b>Номер телефона:</b>'. $phone . '</p>' .
                  '<p><b>Е-mail:</b>' . ' ' . $email . '</p>';

    // Проверяем отправленность сообщения
    if ($mail->send()) {
        $data['result'] = "success";
        $data['info'] = "Сообщение успешно отправлено!";
    } else {
        $data['result'] = "error";
        $data['info'] = "Сообщение не было отправлено. Ошибка при отправке письма";
        $data['desc'] = "Причина ошибки: {$mail->ErrorInfo}";
    }
    
} else {
    $data['result'] = "error";
    $data['info'] = "В коде присутствует ошибка";
    $data['desc'] = error_get_last();
}

// Отправка результата
header('Content-Type: application/json');

echo json_encode($data);

?>