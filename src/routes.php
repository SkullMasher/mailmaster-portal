<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes
$app->get('/', function (Request $request, Response $response, array $args) {
  $this->logger->info('GET /');

  return $this->renderer->render($response, 'index.phtml');
})->setName('index');

$app->post('/', function (Request $request, Response $response) {
  $indexURL = $this->router->pathFor('index');
  $this->logger->info('POST /');

  $data = $request->getParsedBody();
  // is it a portal authentification or a new user
  return $this->mailuser_service->addMail($data);
});

$app->get('/admin', function (Request $request, Response $response, array $args) {
  $this->logger->info('GET /admin');
  $mail_list = $this->mailuser_service->getAllMail();
  $this->logger->info($mail_list);

  return $this->renderer->render($response, 'admin.phtml', ['mail_list' => $mail_list]);
})->setName('admin');

$app->post('/admin', function (Request $request, Response $response) {
  $adminURL = $this->router->pathFor('admin');
  $this->logger->info('POST /');

  $data = $request->getParsedBody();
  // is it a portal authentification or a new user
  return $this->mailuser_service->deleteMail($data);
});
