#!/bin/bash
if [ -d backend ]; then cd backend; fi
for file in *; do
    if [ -d $file ]; then
        echo Currently in $file
        ( cd $file;
        if [ -f mvnw ]; then
            ./mvnw -B package;
        else
            ./gradlew bootJar --no-daemon;
        fi )
        echo
    fi
done
