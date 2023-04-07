document.addEventListener('DOMContentLoaded', function() {
  //var fileInput = document.getElementById('file-input');
  //var fileContent = document.getElementById('file-content');

  // Define event listener for the "Cypher" button
  var cypherBtn = document.getElementById('cypherBtn');
  cypherBtn.addEventListener('click', function() {
    // Add code to perform cypher operation here
    var inputText = fileContent.value;
    var shiftInput = document.getElementById('shift-input');
    var key = parseInt(shiftInput.value);// change this to the desired key (shift value)

    var encryptedText = caesarCipher(inputText, key);
    fileContent.value = encryptedText;
  });

  // Define event listener for the "De-Cypher" button
  var decypherBtn = document.getElementById('decypherBtn');
  decypherBtn.addEventListener('click', function() {
    // Add code to perform de-cypher operation here
    var inputText = fileContent.value;
    var shiftInput = document.getElementById('shift-input');
    var key = parseInt(shiftInput.value); // change this to the desired key (shift value)

    var decryptedText = caesarDecipher(inputText, key);
    fileContent.value = decryptedText;
  });
  
  // Define event listener for the "Brut Force" button
  var decypherBtn = document.getElementById('brutforceBtn');
  decypherBtn.addEventListener('click', function() {
    // Add code to perform de-cypher operation here
    var inputText = fileContent.value;
    var output = brutForceCaesarCipher(inputText);
    fileContent.value = output;
  });

  // Define event listener for the "About" button
  var aboutBtn = document.getElementById('aboutBtn');
  aboutBtn.addEventListener('click', function() {
    // Add code to display information about the extension here
    alert('Developer: Roman Herman 125M-22-1');
  });
  
  var fileInput = document.getElementById('file-input');
  var fileContent = document.getElementById('file-content');

  fileInput.addEventListener('change', function() {
    var file = fileInput.files[0];
    var reader = new FileReader();

    reader.onload = function() {
      fileContent.value = reader.result;
    };

    reader.readAsText(file);
  });
});

function caesarCipher(input, key) {
  var latinSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 !?.";
  var cyrillicSymbols = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя1234567890";
  var output = '';

  for (var i = 0; i < input.length; i++) {
    var index = latinSymbols.indexOf(input[i]);
    if (index === -1) {
      index = cyrillicSymbols.indexOf(input[i]);
      if (index === -1) {
        output += input[i];
        continue;
      }
      index = (index + key) % cyrillicSymbols.length;
      output += cyrillicSymbols[index];
    } else {
      index = (index + key) % latinSymbols.length;
      output += latinSymbols[index];
    }
  }

  return output;
}

function caesarDecipher(input, key) {
  return caesarCipher(input, -key);
}


function brutForceCaesarCipher(cipheredInput) {
  var latinSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 !?.";
  var cyrillicSymbols = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя1234567890";
  var results = '';
  for (var key = 1; key < latinSymbols.length + cyrillicSymbols.length; key++) {
    var output = '';
    for (var i = 0; i < cipheredInput.length; i++) {
      var index = latinSymbols.indexOf(cipheredInput[i]);
      if (index === -1) {
        index = cyrillicSymbols.indexOf(cipheredInput[i]);
        if (index === -1) {
          output += cipheredInput[i];
          continue;
        }
        index = (index + key) % cyrillicSymbols.length;
        output += cyrillicSymbols[index];
      } else {
        index = (index - key) % latinSymbols.length;
        if (index < 0) {
          index += latinSymbols.length;
        }
        output += latinSymbols[index];
      }
    }
    results += "key = " + key + " output = " + output + "-----------\n"
  }
  return results;
}