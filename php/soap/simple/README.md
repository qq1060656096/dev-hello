
```sh
# 启动服务
php -S localhost:12345

# 请求服务
php client.php
```

### curl请求
```sh
curl --location --request POST 'http://localhost:12345/server.php' \
--header 'Content-Type: text/xml' \
--data-raw '<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
                   xmlns:ns1="http://localhost:12345/server.php" xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/"
                   SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
    <SOAP-ENV:Body>
        <ns1:hello>
            <param0 xsi:type="xsd:string">hello word</param0>
        </ns1:hello>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
'
```

参考资料：
http://www.herongyang.com/Web-Services/PHP-SOAP-Server-Example-HelloServer.html
