<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes
$app->get('/', function (Request $request, Response $response, array $args) {
  $this->logger->info('GET /');
  $indexURL = $this->router->pathFor('index');

  return $this->renderer->render($response, 'index.phtml');
})->setName('index');

$app->post('/', function (Request $request, Response $response) {
  $indexURL = $this->router->pathFor('index');
  $this->logger->info('POST /');

  $data = $request->getParsedBody();
  // is it a portal authentification or a new user
  if (isset($data['newUserMail']) && isset($data['newUserPassword'])) {
    // return $this->mailuser_service->addMail($data);
  }
});

