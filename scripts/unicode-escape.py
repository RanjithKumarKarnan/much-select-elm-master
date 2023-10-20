#!/usr/bin/env python3

import sys

text = sys.stdin.read()

new_text = text.encode('unicode-escape').decode()

sys.stdout.write(new_text)
