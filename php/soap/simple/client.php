<?php
$options = [
    'location' => "http://localhost:12345/server.php",
    'uri' => "http://localhost:12345/server.php",
    'trace' => 1
];
$callArgs = [
    "hello word"
];
$client = new SoapClient(null, $options);
$return = $client->__soapCall("hello",  $callArgs);
var_dump($return);
echo("\nReturning value of __soapCall() call: " . $return);

echo("\nDumping request headers:\n"
    . $client->__getLastRequestHeaders());

echo("\nDumping request:\n" . $client->__getLastRequest());

echo("\nDumping response headers:\n"
    . $client->__getLastResponseHeaders());

echo("\nDumping response:\n" . $client->__getLastResponse());