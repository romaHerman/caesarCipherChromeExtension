import sys

def trithemius_decipher(input_file, key, output_file):
    # Extracting key values
    a = key[0][0]
    b = key[0][1]
    c = key[1][0]
    d = key[1][1]

    # Reading input file
    with open(input_file, 'r') as f:
        ciphertext = f.read()

    # Decrypting ASCII codes
    plaintext = ''
    for i in range(len(ciphertext)):
        x = a*i + b
        y = c*i + d
        decrypted_code = ((ord(ciphertext[i]) - y) * pow(x, -1, 256)) % 256
        plaintext += chr(decrypted_code)

    # Writing plaintext to output file
    with open(output_file, 'w') as f:
        f.write(plaintext)

if __name__ == '__main__':
    # Parsing command line arguments
    input_file = sys.argv[1]
    key = [[int(sys.argv[2]), int(sys.argv[3])], [int(sys.argv[4]), int(sys.argv[5])]]
    output_file = sys.argv[6]

    # Calling trithemius_decipher function
    trithemius_decipher(input_file, key, output_file)
