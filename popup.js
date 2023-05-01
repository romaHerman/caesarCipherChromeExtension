document.addEventListener('DOMContentLoaded', function() {
  //var fileInput = document.getElementById('file-input');
  //var fileContent = document.getElementById('file-content');
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
  
  var twoDBtn = document.getElementById('tretius2d');
  twoDBtn.addEventListener('click', function(){
    var inputText = fileContent.value;
    var vectorString = document.getElementById('2d-input').value;

    var encryptedText = trithemiusCipher(inputText, vectorString);
    fileContent.value = encryptedText;
  });
  
  var decipher2d = document.getElementById('tretius2dDecipher');
  decipher2d.addEventListener('click', function(){
    var inputText = fileContent.value;
    var vectorString = document.getElementById('2d-input').value;

    var encryptedText = trithemiusDeceipher(inputText, vectorString);
    fileContent.value = encryptedText;
  });
  
  var threeDBtn = document.getElementById('tretius3d');
  threeDBtn.addEventListener('click', function(){
    var inputText = fileContent.value;
    var vectorString = document.getElementById('2d-input').value;

    var encryptedText = trithemiusCipher3D(inputText, vectorString);
    fileContent.value = encryptedText;
  });
  
  var decipher3d = document.getElementById('tretius3dDecipher');
  decipher3d.addEventListener('click', function(){
    var inputText = fileContent.value;
    var vectorString = document.getElementById('2d-input').value;

    var encryptedText = trithemiusDeceipher3D(inputText, vectorString);
    fileContent.value = encryptedText;
  });
  
  var tretPassBtn = document.getElementById('tretiusPass');
  tretPassBtn.addEventListener('click', function(){
    var inputText = fileContent.value;
    var vectorString = document.getElementById('2d-input').value;

    var encryptedText = trithemiusPass(inputText, vectorString);
    fileContent.value = encryptedText;
  });
  var decipherPass = document.getElementById('tretiusPassDecipher');
  decipherPass.addEventListener('click', function(){
    var inputText = fileContent.value;
    var vectorString = document.getElementById('2d-input').value;

    var encryptedText = trithemiusPassDecipher(inputText, vectorString);
    fileContent.value = encryptedText;
  });
  
  var xorBtn = document.getElementById('xorCipher');
  xorBtn.addEventListener('click', function(){
    var inputText = fileContent.value;
    var vectorString = document.getElementById('2d-input').value;

    var encryptedText = xorCipher(inputText);
    fileContent.value = encryptedText;
  });
  var xorDecipherBtn = document.getElementById('xorDeCipher');
  xorDecipherBtn.addEventListener('click', function(){
    var inputText = fileContent.value;
    var vectorString = document.getElementById('2d-input').value;

    var encryptedText = xorCipher(inputText);
    fileContent.value = encryptedText;
  });

  // Define event listener for the "About" button
  var aboutBtn = document.getElementById('aboutBtn');
  aboutBtn.addEventListener('click', function() {
    // Add code to display information about the extension here
    alert('Developer: Roman Herman 125M-22-1');
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

function trithemiusCipher(input, keyString) {
  var latinSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  var cyrillicSymbols = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя1234567890";
  
  const keyParts = keyString.split(',');
  const key = [    [parseInt(keyParts[0]), parseInt(keyParts[1])],
    [parseInt(keyParts[2]), parseInt(keyParts[3])]
  ];
  
  //коефіцієнти
  const a = key[1][0] - key[0][0];
  const b = key[1][1] - key[0][1];
 
  var results = '';
 
  for (let i = 0; i < input.length; i++) {
     var output = '';
  	 var encryptedCode;
  	 var index = latinSymbols.indexOf(input[i]);
      if (index === -1) {
        index = cyrillicSymbols.indexOf(input[i]);
        if (index === -1) {
          output += input[i];
          continue;
        }
        const k = a * i + b
        index = (index + k) % cyrillicSymbols.length;
        output += cyrillicSymbols[index];
      } else {
        const k = a * i + b
        index = (index + k) % latinSymbols.length;
        if (index < 0) {
          index += latinSymbols.length;
        }
        output += latinSymbols[index];
        
      }
      results += output;
  }

  // з'єднання зашифрованих символів в одну строку
  return results;
}

function trithemiusDeceipher(input, keyString) {
  var latinSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  var cyrillicSymbols = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя1234567890";
  
  const keyParts = keyString.split(',');
  const key = [    [parseInt(keyParts[0]), parseInt(keyParts[1])],
    [parseInt(keyParts[2]), parseInt(keyParts[3])]
  ];
  
  //коефіцієнти
  const a = key[1][0] - key[0][0];
  const b = key[1][1] - key[0][1];
  
  var results = '';
 
  for (let i = 0; i < input.length; i++) {
     var output = '';
  	 var encryptedCode;
  	 var index = latinSymbols.indexOf(input[i]);
      if (index === -1) {
        index = cyrillicSymbols.indexOf(input[i]);
        console.log(index)
        if (index === -1) {
          output += input[i];
          continue;
        }
        const k = a * i + b
        index = ((index + cyrillicSymbols.length) - (k % cyrillicSymbols.length)) % cyrillicSymbols.length;
        output +=  cyrillicSymbols[index];
      } else {
        const k = a * i + b
        index = ((index + latinSymbols.length) - (k % latinSymbols.length)) % latinSymbols.length;
        if (index < 0) {
          index += latinSymbols.length;
        }
        output +=  latinSymbols[index];
        
      }
     results += output;
  }

    // з'єднання зашифрованих символів в одну строку
    return results;
}

function trithemiusCipher3D(input, keyString) {
  var latinSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  var cyrillicSymbols = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя1234567890";
  
  const keyParts = keyString.split(',');
  const key = [    [parseInt(keyParts[0]), parseInt(keyParts[1]),  parseInt(keyParts[2])],
    [parseInt(keyParts[3]), parseInt(keyParts[4]),  parseInt(keyParts[5])],
  ];
  
  //коефіцієнти
  const a = key[1][0] - key[0][0];
  const b = key[1][1] - key[0][1];
  const c = key[1][2] - key[0][2];
  
  var results = '';
 
  for (let i = 0; i < input.length; i++) {
     var output = '';
  	 var encryptedCode;
  	 var index = latinSymbols.indexOf(input[i]);
      if (index === -1) {
        index = cyrillicSymbols.indexOf(input[i]);
        if (index === -1) {
          output += input[i];
          continue;
        }
        const k = (a * a) + (b * i) + c;
        index = (index + k) % cyrillicSymbols.length;
        output += cyrillicSymbols[index];
      } else {
        const k = (a * a) + (b * i) + c;
        index = (index + k) % latinSymbols.length;
        if (index < 0) {
          index += latinSymbols.length;
        }
        output += latinSymbols[index];
        
      }
      results += output;
  }

  // з'єднання зашифрованих символів в одну строку
  return results;
}

function trithemiusDeceipher3D(input, keyString) {
  var latinSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  var cyrillicSymbols = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя1234567890";
  
  const keyParts = keyString.split(',');
  const key = [    [parseInt(keyParts[0]), parseInt(keyParts[1]),  parseInt(keyParts[2])],
    [parseInt(keyParts[3]), parseInt(keyParts[4]),  parseInt(keyParts[5])],
  ];
  
  //коефіцієнти
  const a = key[1][0] - key[0][0];
  const b = key[1][1] - key[0][1];
  const c = key[1][2] - key[0][2];
  
  var results = '';
 
  for (let i = 0; i < input.length; i++) {
     var output = '';
  	 var encryptedCode;
  	 var index = latinSymbols.indexOf(input[i]);
      if (index === -1) {
        index = cyrillicSymbols.indexOf(input[i]);
        if (index === -1) {
          output += input[i];
          continue;
        }
        const k = (a * a) + (b * i) + c;
        index = ((index + cyrillicSymbols.length) - (k % cyrillicSymbols.length)) % cyrillicSymbols.length;
        output +=  cyrillicSymbols[index];
      } else {
        const k = (a * a) + (b * i) + c;
        index = ((index + latinSymbols.length) - (k % latinSymbols.length)) % latinSymbols.length;
        if (index < 0) {
          index += latinSymbols.length;
        }
        output +=  latinSymbols[index];
        
      }
     results += output;
  }

    // з'єднання зашифрованих символів в одну строку
    return results;
}

function trithemiusPass(input, keyString) {
  var latinSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  var cyrillicSymbols = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя1234567890";
  
  //Generate Key 
  var key = keyString.split("");
  if (input.length != keyString.length) {
     let temp = key.length;
     for (let i = 0; i < (input.length-temp); i++) {
     	key.push(key[i % ((key).length)])
     }
  }
  key = key.join("");

  //cipher text 
  var cipher_text = "";
  for (let i = 0; i < input.length; i++) {
      var index = latinSymbols.indexOf(input[i]);
      if (index === -1) {
      	 index = cyrillicSymbols.indexOf(input[i]);
      	 if (index === -1) {
          cipher_text += input[i];
          continue;
        }
        let x = (index + cyrillicSymbols.indexOf(key[i])) % cyrillicSymbols.length;
        cipher_text += cyrillicSymbols[x];
      } else {
      	let x = (index + latinSymbols.indexOf(key[i])) % latinSymbols.length;
        cipher_text += latinSymbols[x];
      }
  }
  return cipher_text;
}

function trithemiusPassDecipher(input, keyString) {
  var latinSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  var cyrillicSymbols = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя1234567890";
  
  //Generate Key 
  var key = keyString.split("");
  if (input.length != keyString.length) {
     let temp = key.length;
     for (let i = 0; i < (input.length-temp); i++) {
     	key.push(key[i % ((key).length)])
     }
  }
  key = key.join("");
  
  //cipher text 
  var cipher_text = "";
  for (let i = 0; i < input.length; i++) {
      var index = latinSymbols.indexOf(input[i]);
      if (index === -1) {
      	 index = cyrillicSymbols.indexOf(input[i]);
      	 if (index === -1) {
          cipher_text += input[i];
          continue;
        }
        let x = (index - cyrillicSymbols.indexOf(key[i]) + cyrillicSymbols.length) % cyrillicSymbols.length;
        cipher_text += cyrillicSymbols[x];
      } else {
      	let x = (index - latinSymbols.indexOf(key[i]) + latinSymbols.length) % latinSymbols.length;
        cipher_text += latinSymbols[x];
      }
  }
  return cipher_text;
}

var xorKey = ""

function xorCipher(input) {
	if (xorKey.length != input.length) {
		var latinSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 !?.";
		for (let i = 0; i < input.length; i++) {
			xorKey += latinSymbols.charAt(Math.floor(Math.random() * latinSymbols.length))
		}
	} 
	var inputString = input.split("");
	let len = inputString.length;
	for (let i = 0; i < len; i++) {
		inputString[i] = (String.fromCharCode((inputString[i].charCodeAt(0)) ^ xorKey.charCodeAt(0)));
	}
	return inputString.join("");
}