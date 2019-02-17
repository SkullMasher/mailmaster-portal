<?php
class MailUserService {

  private $logger;
  private $mail;

  function __construct($logger)
  {
    $this->logger = $logger;
    $this->virtualuser = new VirtualUser;
  }

  private function mt_rand_str ($l, $c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890') {
    for ($s = '', $cl = strlen($c)-1, $i = 0; $i < $l; $s .= $c[mt_rand(0, $cl)], ++$i);
      return $s;
  }

  private function strip_whitespace($str) {
      return preg_replace('/\s+/', ' ', $str);
  }

  private function sanitize($data) {
    $data_count = count($data);

    for ($i=0; $i < $data_count; $i++) {
      // Strip whitespace in and out
      $data[$i] = $this->strip_whitespace($data[$i]);
      // Convert new lines
      $data[$i] = str_replace("<br>", "\n", $data[$i]);
      $data[$i] = str_replace("</p>", "\n", $data[$i]);
      $data[$i] = str_replace("</div>", "\n", $data[$i]);
      // Avoid XSS
      $data[$i] = filter_var($data[$i], FILTER_SANITIZE_STRING);
      $this->logger->info($data[$i]);
    }

    return $data;
  }

  public function addMail($data) {
    $dataCount = count($data);
    $password = $data[1];
    $salt = substr(sha1(rand()), 0, 16);
    $hashedPassword = crypt($password, "$6$$salt");

    $this->virtualuser->domain_id = 1;
    $this->virtualuser->email = $data[0];
    $this->virtualuser->password = $hashedPassword;
    $this->virtualuser->save();
    $this->logger->info(crypt($password, "$6$$salt"));
    return true;
  }

  public function getMail($seed) {
    $wishExist = $this->mailUser->where('seed', '=', $seed)->exists();
    $wish = $this->mailUser->where('seed', '=', $seed)->first();

    if ($wishExist) {
      return $wish;
    } else {
      return null;
    }
  }

  public function getAllMail() {
    return $this->virtualuser->all();
  }
}
