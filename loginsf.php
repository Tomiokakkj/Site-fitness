<?php
session_start();

if(isset($_POST['submit']))
{
    include_once('conexao.php');

    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM usuarios WHERE email = '$email' AND senha = '$password'";
    $result = mysqli_query($conexao, $sql);

    if(mysqli_num_rows($result) === 1) {
        $usuario = mysqli_fetch_assoc($result);

        $nome_usuario = '';
        if (isset($usuario['nome'])) {
            $nome_usuario = $usuario['nome'];
        } elseif (isset($usuario['Nome'])) {
            $nome_usuario = $usuario['Nome'];
        } else {
            $nome_usuario = explode('@', $email)[0]; 
        }

        $_SESSION['usuario_nome'] = $nome_usuario;
        $_SESSION['usuario_email'] = $email;
        $_SESSION['logado'] = true;

        header("Location: inicialsf.php");
        exit();
    } else {
        echo "<script>alert('E-mail ou senha incorretos!');</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Login</title>

    <link rel="stylesheet" href="loginsf.css">
    <link rel="shortcut icon" href="pngtree-excercise-icon-in-trendy-style-isolated-background-png-image_1718575.jpg">
</head>

<body>

    <div class="container">

        <h2>Login</h2>

        <form action="" method="POST">

            <input type="email" name="email" placeholder="E-mail" required>

            <input type="password" name="password" placeholder="Senha" required>

            <button type="submit" name="submit">Entrar</button>

        </form>

        <p class="link">
            Não tem conta?
            <a href="cadastrosf.php">Cadastrar</a>
        </p>

        <a class="bb" href="inicialsf.php">Voltar</a>

    </div>

</body>

</html>
