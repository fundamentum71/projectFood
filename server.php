<?php
$_POST = json_decode(file_get_contents('php://input'), true); //даст нам JSON данные 
echo var_dump($_POST); //позволит увидеть те данные которые приходят с клиента
