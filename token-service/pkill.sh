#!/bin/bash
kill `ps | grep "java" | grep -o "^[0-9]*"`
