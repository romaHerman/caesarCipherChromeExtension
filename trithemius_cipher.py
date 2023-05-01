import sys

def trithemius_cipher(input_file, key, output_file):
    # Extracting key values
    a = key[0][0]
    b = key[0][1]
    c = key[1][0]
    d = key[1][1]

    # Reading input file
    with open(input_file, 'r') as f:
        plaintext = f.read()

    # Converting plaintext to ASCII codes
    ascii_codes = [ord(c) for c in plaintext]

    # Encrypting ASCII codes
    ciphertext = ''
    for i in range(len(ascii_codes)):
        x = a*i + b
        y = c*i + d
        encrypted_code = (x * ascii_codes[i] + y) % 256
        ciphertext += chr(encrypted_code)

    # Writing ciphertext to output file
    with open(output_file, 'w') as f:
        f.write(ciphertext)

if __name__ == '__main__':
    # Parsing command line arguments
    input_file = sys.argv[1]
    key = [[int(sys.argv[2]), int(sys.argv[3])], [int(sys.argv[4]), int(sys.argv[5])]]
    output_file = sys.argv[6]

    # Calling trithemius_cipher function
    trithemius_cipher(input_file, key, output_file)
