#!/bin/bash
kill `ps | grep "java" | grep -Eo "^\s*[0-9]*"`
