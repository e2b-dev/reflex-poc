import requests
import time
import sys

def check_server(url: str):
    max_attempts = 20
    sleep_time = 1 # in seconds

    for attempt in range(max_attempts):
        try:
            response = requests.get(url)
            if response.status_code == 200:
                print(f"Server is up after {attempt + 1} attempts.")
                return True
        except requests.RequestException:
            pass

        print(f"Attempt {attempt + 1} failed. Retrying in {sleep_time} seconds...")
        time.sleep(sleep_time)

    print(f"Server did not respond with 200 status code after {max_attempts} attempts.")
    return False

if __name__ == "__main__":
    url = sys.argv[1]

    print(f"Checking server at {url}")
    check_server(url)
