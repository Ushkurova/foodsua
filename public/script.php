<?php
// Подключение к базе данных

try {
    // Подключение к базе данных SQLite
    $pdo = new PDO('sqlite:database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // SQL-запрос для создания таблицы пользователей
/*$sql = "DROP TABLE  category"; 
    $pdo->exec($sql); */
 $sql = "CREATE TABLE IF NOT EXISTS category (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
            )";
    $pdo->exec($sql);

    echo "Таблица успешно создана!";
} catch (PDOException $e) {
    echo "Ошибка при создании таблицы: " . $e->getMessage();
}

 try{


// Получение данных формы
 $login = $_POST['login'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Хеширование пароля
    $email = $_POST['email'];

    // Проверка на существование логина или email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE login = ? OR email = ?");
    $stmt->execute([$login, $email]);
    $user = $stmt->fetch();

    if ($user) {
        echo "Пользователь с таким логином или почтой уже существует!";
    } else {
        // Вставка данных в таблицу
        $stmt = $pdo->prepare("INSERT INTO users (login, password, email) VALUES (?, ?, ?)");
        $stmt->execute([$login, $password, $email]);
        echo "Регистрация успешна!";
    }
}
 catch (PDOException $e) {
    echo "Ошибка: " . $e->getMessage();
}
?>
