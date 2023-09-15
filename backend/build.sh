#!/bin/bash
if [ -d backend ]; then cd backend; fi
for file in $(ls -d */); do
    echo Currently in $file
    ( cd $file;
    if [ -f mvnw ]; then
        ./mvnw -B package -Dmaven.test.skip;
        cp target/*.jar app.jar;
    else
        ./gradlew bootJar;
        cp build/libs/*.jar app.jar;
    fi )
    echo
done
