#!/bin/bash
exittext="Ctrl + C to exit auto-build"
build() {
    cd $1;
    if [ -f mvnw ] ; then
        ./mvnw package || exit 1;
        cp target/*.jar app.jar;
    elif [ -f gradlew ] ; then
        ./gradlew build || exit 1;
        cp build/libs/*.jar app.jar;
    else
        echo "No executable found";
    fi
    cd ..;
}

if [ $# -ne 0 ]; then
    if [ $1 = auto ]; then
        if [ $# -ne 2 ]; then
            echo Missing argument
            echo usage: $0 $1 service-folder
            exit
        fi
        arg=${2%%/}
        docker compose up $arg -d
        echo $exittext
        while true; do
            for file in $(ls -d */); do
                file=${file%%/}
                if [ -n "$(find ${file}/src/main/java -newer ${file}/app.jar -print -quit 2> /dev/null)" ]; then
                    docker compose down
                    build $file
                    docker compose build $file
                    docker compose up $arg -d
                    echo $exittext;
                fi
            done;
            sleep 1;
        done;
    fi
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
