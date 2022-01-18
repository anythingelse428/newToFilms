<?php
// DataBase settings
$config['db'] = [
  'host' => 'localhost',
  'dbname' => 'cc38255_ae',
  'user' => 'cc38255_ae',
  'password' => 'zfM3fN1v'
];

// Host setings
$config['hostnameApi'] = 'anythingelse.iny.su';
$config['docsHostname'] = 'anythingelse.iny.su';
$config['protocol'] = 'https://';

// App base link
$config['mainAppUrl'] = $config['protocol'] . $config['hostnameApi'];

// Docs base link
$config['docs'] = $config['protocol'] . $config['docsHostname'] . '/api/docs';

// Responce body function in handlers/Responce.php
$config['responce'] = 'ResponceWithJSON';
