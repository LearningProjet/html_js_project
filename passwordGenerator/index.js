function generatePassword() {
    var length = document.getElementById("length").value;
    var uppercase = document.getElementById("uppercase").checked;
    var lowercase = document.getElementById("lowercase").checked;
    var symbol = document.getElementById("symbol").checked;
    var chiffre = document.getElementById("chiffre").checked;


    var charset = "";
    var password = "";

    if (uppercase) {
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (lowercase) {
        charset += "abcdefghijklmnopqrstuvwxyz";
    }

    if (symbol) {
        charset += "!@#$%^&*()_+-=[]{};:,.<>? ";
    }
console.log(symbol);
    if (chiffre) {
        charset += "0123456789";
    }

    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }

    document.getElementById("password").value = password;

    console.log(password.length);
}