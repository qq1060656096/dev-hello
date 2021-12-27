<?php
function hello($message) {
    return "say: " . $message;
}
$options = [
    "uri" => "http://localhost:12345/server.php",// 只是一个唯一的标识，用作响应消息的名称空间
];
$server = new SoapServer(null, $options);
$server->addFunction("hello");
$server->handle();