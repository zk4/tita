from pynput import keyboard
import os
applescript = """
reattach-to-user-namespace osascript -e 'display notification "{}" with title "{}"'
"""


def notification(title="", content=""):
    os.system(applescript.format(content, title))


def on_press(key):
    try:
        print(key)
    except AttributeError:
        # print('special key {0} pressed'.format(
        #     key))
        pass


def on_release(key):

    if key == keyboard.Key.esc:
        # Stop listener
        # return False
        return True


# Collect events until released
with keyboard.Listener(
        on_press=on_press,
        on_release=on_release) as listener:
    listener.join()
