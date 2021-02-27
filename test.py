
import sys

# print (f'Number of arguments:', len(sys.argv), 'arguments.')
# print (f'Argument List:', str(sys.argv))

if __name__ == '__main__':
    print("Executing __main__")
    if (len(sys.argv) < 2):
        print("No arguments provided. Exiting ...")
        exit()
    else:
        try:
            val = int((sys.argv)[1])
        except ValueError:
            print("Argument is not numeric")
            exit()

    count = (sys.argv)[1]
    print("The script will execue ", str(count), " loops")

    print('Populating Complete')