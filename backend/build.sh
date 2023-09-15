#!/bin/bash
build() {
    cd $1;
    if [ -f mvnw ] ; then
        ./mvnw -B package -Dmaven.test.skip;
        cp target/*.jar app.jar;
    elif [ -f gradlew ] ; then
        ./gradlew bootJar;
        cp build/libs/*.jar app.jar;
    else
        echo "No executable found";
    fi
}

if [ $# -ne 0 ]; then
    for file in $@; do
        build $file;
    done
    exit;
fi

if [ -d backend ]; then cd backend; fi
for file in $(ls -d */); do
    echo "Currently in $file"
    build $file
    echo
done
